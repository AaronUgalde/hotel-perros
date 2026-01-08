// features/pets/pages/AddEnfermedadPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { petsApi } from '../api';
import { Button } from '../../../components/ui/Button';
import { ArrowLeft, Save } from 'lucide-react';

export const AddEnfermedadPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pet, setPet] = useState<any>(null);
  const [enfermedadesCatalogo, setEnfermedadesCatalogo] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    enfermedad_id: '',
    fecha_diagnostico: '',
    observaciones: '',
    tratamiento: '',
  });

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      const petData = await petsApi.getById(Number(id));
      setPet(petData);
      
      // Cargar catálogo de enfermedades según la especie
      if (petData.especie_id) {
        const enfermedadesData: any = await petsApi.getEnfermedadesByEspecie(petData.especie_id);
        setEnfermedadesCatalogo(enfermedadesData.enfermedades || []);
      }
    } catch (err) {
      console.error('Error loading data:', err);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.enfermedad_id) {
      setError('Por favor selecciona una enfermedad');
      return;
    }

    try {
      setLoading(true);
      
      // Limpiar datos: eliminar campos vacíos
      const cleanData: any = {
        enfermedad_id: Number(formData.enfermedad_id)
      };
      if (formData.fecha_diagnostico) cleanData.fecha_diagnostico = formData.fecha_diagnostico;
      if (formData.observaciones) cleanData.observaciones = formData.observaciones;
      if (formData.tratamiento) cleanData.tratamiento = formData.tratamiento;

      await petsApi.addEnfermedad(Number(id), cleanData);
      navigate(`/pets/${id}/details`);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al agregar el diagnóstico');
    } finally {
      setLoading(false);
    }
  };

  if (!pet) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate(`/pets/${id}/details`)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Volver a {pet.nombre}
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Agregar Diagnóstico</h1>
        <p className="text-gray-600">Registra un nuevo diagnóstico médico para {pet.nombre}</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-lg p-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enfermedad/Condición <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.enfermedad_id}
            onChange={(e) => handleChange('enfermedad_id', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            required
          >
            <option value="">Selecciona una enfermedad</option>
            {enfermedadesCatalogo.map((enfermedad) => (
              <option key={enfermedad.enfermedad_id} value={enfermedad.enfermedad_id}>
                {enfermedad.nombre}
              </option>
            ))}
          </select>
          {formData.enfermedad_id && (
            <p className="text-xs text-gray-500 mt-1">
              {enfermedadesCatalogo.find(e => e.enfermedad_id === Number(formData.enfermedad_id))?.descripcion}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fecha de Diagnóstico
          </label>
          <input
            type="date"
            value={formData.fecha_diagnostico}
            onChange={(e) => handleChange('fecha_diagnostico', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Observaciones
          </label>
          <textarea
            value={formData.observaciones}
            onChange={(e) => handleChange('observaciones', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Síntomas, detalles del diagnóstico, etc."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tratamiento
          </label>
          <textarea
            value={formData.tratamiento}
            onChange={(e) => handleChange('tratamiento', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Medicamentos, dosis, duración del tratamiento, instrucciones especiales, etc."
          />
        </div>

        {/* Botones */}
        <div className="flex gap-4 pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => navigate(`/pets/${id}/details`)}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            type='submit'
            variant="primary"
            disabled={loading || !formData.enfermedad_id}
          >
            {loading ? 'Guardando...' : (
              <>
                <Save className="h-5 w-5 mr-2" />
                Guardar Diagnóstico
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};