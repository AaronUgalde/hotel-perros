// Página de formulario de empleado - Crear/Editar
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { empleadosApi } from '../api';
import type { EmpleadoFormData } from '../types';

export default function EmpleadoFormPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;

  const [formData, setFormData] = useState<EmpleadoFormData>({
    nombre: '',
    especialidad: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEditing) {
      loadEmpleado();
    }
  }, [id]);

  const loadEmpleado = async () => {
    try {
      setLoading(true);
      const data = await empleadosApi.getById(Number(id));
      setFormData({
        nombre: data.nombre,
        especialidad: data.especialidad || '',
      });
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al cargar empleado');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);
      if (isEditing) {
        await empleadosApi.update(Number(id), formData);
      } else {
        await empleadosApi.create(formData);
      }
      navigate('/admin/empleados');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al guardar empleado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/admin/empleados')}
          className="mb-4 text-gray-600 hover:text-black transition-colors"
        >
          ← Volver a empleados
        </button>
        <h1 className="text-3xl font-bold">
          {isEditing ? 'Editar Empleado' : 'Nuevo Empleado'}
        </h1>
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Nombre <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            required
            maxLength={100}
            className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
            placeholder="Ej: Dr. Carlos Méndez"
          />
        </div>

        {/* Especialidad */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Especialidad
          </label>
          <input
            type="text"
            value={formData.especialidad}
            onChange={(e) => setFormData({ ...formData, especialidad: e.target.value })}
            maxLength={50}
            className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
            placeholder="Ej: Veterinario, Peluquería Canina, Entrenador"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-6 py-3 bg-black text-white hover:bg-gray-800 disabled:bg-gray-400 transition-colors"
          >
            {loading ? 'Guardando...' : isEditing ? 'Actualizar' : 'Crear Empleado'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/empleados')}
            className="px-6 py-3 border border-gray-300 hover:border-black transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
