// features/pets/pages/AddAlergiaPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { petsApi } from '../api';
import { Button } from '../../../components/ui/Button';
import { ArrowLeft, Save } from 'lucide-react';

export const AddAlergiaPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pet, setPet] = useState<any>(null);
  const [alergiasCatalogo, setAlergiasCatalogo] = useState<any[]>([]);
  const [alergiasAgrupadas, setAlergiasAgrupadas] = useState<any>({});
  
  const [formData, setFormData] = useState({
    alergia_id: '',
    severidad: 'Moderada',
  });

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      const petData = await petsApi.getById(Number(id));
      setPet(petData);
      
      // Cargar catálogo de alergias
      const alergiasData = await petsApi.getAlergiasOptions();
      const alergias = alergiasData.alergias || [];
      setAlergiasCatalogo(alergias);
      
      // Agrupar por tipo
      const agrupadas = alergias.reduce((acc: any, alergia: any) => {
        if (!acc[alergia.tipo]) {
          acc[alergia.tipo] = [];
        }
        acc[alergia.tipo].push(alergia);
        return acc;
      }, {});
      setAlergiasAgrupadas(agrupadas);
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

    if (!formData.alergia_id) {
      setError('Por favor selecciona una alergia');
      return;
    }

    try {
      setLoading(true);
      
      const cleanData: any = {
        alergia_id: Number(formData.alergia_id)
      };
      if (formData.severidad) cleanData.severidad = formData.severidad;

      await petsApi.addAlergia(Number(id), cleanData);
      navigate(`/pets/${id}/details`);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al agregar la alergia');
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
        <h1 className="text-3xl font-bold text-gray-900">Agregar Alergia</h1>
        <p className="text-gray-600">Registra una nueva alergia para {pet.nombre}</p>
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
            Alergia <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.alergia_id}
            onChange={(e) => handleChange('alergia_id', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            required
          >
            <option value="">Selecciona una alergia</option>
            {Object.keys(alergiasAgrupadas).map((tipo) => (
              <optgroup key={tipo} label={tipo}>
                {alergiasAgrupadas[tipo].map((alergia: any) => (
                  <option key={alergia.alergia_id} value={alergia.alergia_id}>
                    {alergia.nombre}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Severidad
          </label>
          <select
            value={formData.severidad}
            onChange={(e) => handleChange('severidad', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="Leve">Leve</option>
            <option value="Moderada">Moderada</option>
            <option value="Alta">Alta</option>
            <option value="Severa">Severa</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            {formData.severidad === 'Leve' && 'Síntomas menores, sin riesgo grave'}
            {formData.severidad === 'Moderada' && 'Síntomas notables pero controlables'}
            {formData.severidad === 'Alta' && 'Requiere atención y manejo cuidadoso'}
            {formData.severidad === 'Severa' && 'Riesgo grave, puede ser mortal'}
          </p>
        </div>

        {/* Información adicional */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Importante:</strong> Las alergias son importantes para el cuidado de tu mascota. 
            Asegúrate de informar sobre ellas al personal veterinario y cuidadores.
          </p>
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
            disabled={loading || !formData.alergia_id}
          >
            {loading ? 'Guardando...' : (
              <>
                <Save className="h-5 w-5 mr-2" />
                Guardar Alergia
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};