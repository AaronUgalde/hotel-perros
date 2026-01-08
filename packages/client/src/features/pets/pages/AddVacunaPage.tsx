// features/pets/pages/AddVacunaPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { petsApi } from '../api';
import { Button } from '../../../components/ui/Button';
import { ArrowLeft, Save } from 'lucide-react';

export const AddVacunaPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pet, setPet] = useState<any>(null);
  const [vacunasCatalogo, setVacunasCatalogo] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    vacuna_id: '',
    nombre_vacuna: '',
    fecha_aplicacion: '',
    vigencia_hasta: '',
    veterinario: '',
    notas: '',
  });

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      const petData = await petsApi.getById(Number(id));
      setPet(petData);
      
      // Cargar catálogo de vacunas según la especie
      if (petData.especie_id) {
        const vacunasData: any = await petsApi.getVacunasByEspecie(petData.especie_id);
        setVacunasCatalogo(vacunasData.vacunas || []);
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

    try {
      setLoading(true);
      
      // Limpiar datos: eliminar campos vacíos
      const cleanData: any = {};
      if (formData.vacuna_id) cleanData.vacuna_id = Number(formData.vacuna_id);
      if (formData.nombre_vacuna) cleanData.nombre_vacuna = formData.nombre_vacuna;
      if (formData.fecha_aplicacion) cleanData.fecha_aplicacion = formData.fecha_aplicacion;
      if (formData.vigencia_hasta) cleanData.vigencia_hasta = formData.vigencia_hasta;
      if (formData.veterinario) cleanData.veterinario = formData.veterinario;
      if (formData.notas) cleanData.notas = formData.notas;

      await petsApi.addVacuna(Number(id), cleanData);
      navigate(`/pets/${id}/details`);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al agregar la vacuna');
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
        <h1 className="text-3xl font-bold text-gray-900">Agregar Vacuna</h1>
        <p className="text-gray-600">Registra una nueva vacuna para {pet.nombre}</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-lg p-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
        {/* Seleccionar del catálogo o nombre personalizado */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Seleccionar Vacuna del Catálogo
          </label>
          <select
            value={formData.vacuna_id}
            onChange={(e) => {
              handleChange('vacuna_id', e.target.value);
              // Si selecciona del catálogo, limpiar nombre personalizado
              if (e.target.value) {
                const vacuna = vacunasCatalogo.find(v => v.vacuna_id === Number(e.target.value));
                handleChange('nombre_vacuna', vacuna?.nombre || '');
              }
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">Selecciona una vacuna o escribe abajo</option>
            {vacunasCatalogo.map((vacuna) => (
              <option key={vacuna.vacuna_id} value={vacuna.vacuna_id}>
                {vacuna.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="text-center text-sm text-gray-500">- O -</div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre de Vacuna Personalizado
          </label>
          <input
            type="text"
            value={formData.nombre_vacuna}
            onChange={(e) => {
              handleChange('nombre_vacuna', e.target.value);
              // Si escribe nombre personalizado, limpiar selección del catálogo
              if (e.target.value) {
                handleChange('vacuna_id', '');
              }
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Ej: Vacuna múltiple, Vacuna especial, etc."
          />
          <p className="text-xs text-gray-500 mt-1">
            Usa esto si la vacuna no está en el catálogo
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha de Aplicación
            </label>
            <input
              type="date"
              value={formData.fecha_aplicacion}
              onChange={(e) => handleChange('fecha_aplicacion', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vigente Hasta
            </label>
            <input
              type="date"
              value={formData.vigencia_hasta}
              onChange={(e) => handleChange('vigencia_hasta', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Veterinario
          </label>
          <input
            type="text"
            value={formData.veterinario}
            onChange={(e) => handleChange('veterinario', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Nombre del veterinario o clínica"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notas
          </label>
          <textarea
            value={formData.notas}
            onChange={(e) => handleChange('notas', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Observaciones, reacciones, próxima dosis, etc."
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
            variant="primary"
            disabled={loading || (!formData.vacuna_id && !formData.nombre_vacuna)}
          >
            {loading ? 'Guardando...' : (
              <>
                <Save className="h-5 w-5 mr-2" />
                Guardar Vacuna
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};