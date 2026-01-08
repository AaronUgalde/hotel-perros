// features/pets/pages/AddDesparasitacionPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { petsApi } from '../api';
import { Button } from '../../../components/ui/Button';
import { ArrowLeft, Save } from 'lucide-react';

export const AddDesparasitacionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pet, setPet] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    tipo: '',
    producto: '',
    fecha: '',
    proxima_fecha: '',
  });

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      const petData = await petsApi.getById(Number(id));
      setPet(petData);
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
      if (formData.tipo) cleanData.tipo = formData.tipo;
      if (formData.producto) cleanData.producto = formData.producto;
      if (formData.fecha) cleanData.fecha = formData.fecha;
      if (formData.proxima_fecha) cleanData.proxima_fecha = formData.proxima_fecha;

      await petsApi.addDesparasitacion(Number(id), cleanData);
      navigate(`/pets/${id}/details`);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al agregar la desparasitación');
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
        <h1 className="text-3xl font-bold text-gray-900">Agregar Desparasitación</h1>
        <p className="text-gray-600">Registra una nueva desparasitación para {pet.nombre}</p>
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
            Tipo de Desparasitación
          </label>
          <select
            value={formData.tipo}
            onChange={(e) => handleChange('tipo', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">Selecciona el tipo</option>
            <option value="Interna">Interna</option>
            <option value="Externa">Externa</option>
            <option value="Mixta">Mixta (Interna y Externa)</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Interna: parásitos intestinales | Externa: pulgas, garrapatas
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Producto Utilizado
          </label>
          <input
            type="text"
            value={formData.producto}
            onChange={(e) => handleChange('producto', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Ej: Drontal Plus - 2 tabletas, Bravecto 500mg, etc."
          />
          <p className="text-xs text-gray-500 mt-1">
            Incluye el nombre comercial y la dosis aplicada
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha de Aplicación
            </label>
            <input
              type="date"
              value={formData.fecha}
              onChange={(e) => handleChange('fecha', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Próxima Aplicación
            </label>
            <input
              type="date"
              value={formData.proxima_fecha}
              onChange={(e) => handleChange('proxima_fecha', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        {/* Información adicional */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800 mb-2">
            <strong>Recomendaciones:</strong>
          </p>
          <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
            <li>Desparasitación interna: cada 3-6 meses</li>
            <li>Desparasitación externa: según producto (mensual o cada 3 meses)</li>
            <li>Consulta con tu veterinario el esquema adecuado</li>
          </ul>
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
          <Button type='submit'
            variant="primary"
            disabled={loading}
          >
            {loading ? 'Guardando...' : (
              <>
                <Save className="h-5 w-5 mr-2" />
                Guardar Desparasitación
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};