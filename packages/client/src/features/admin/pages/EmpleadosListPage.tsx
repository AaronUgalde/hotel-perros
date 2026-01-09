// Página de lista de empleados - Admin
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { empleadosApi } from '../api';
import type { Empleado } from '../types';

export default function EmpleadosListPage() {
  const navigate = useNavigate();
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadEmpleados();
  }, []);

  const loadEmpleados = async () => {
    try {
      setLoading(true);
      const data = await empleadosApi.getAll();
      setEmpleados(data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al cargar empleados');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number, nombre: string) => {
    if (!confirm(`¿Eliminar al empleado "${nombre}"?`)) return;
    
    try {
      await empleadosApi.delete(id);
      loadEmpleados();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Error al eliminar empleado');
    }
  };

  const filteredEmpleados = empleados.filter(emp =>
    emp.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.especialidad?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <div className="text-gray-500">Cargando empleados...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Empleados</h1>
          <button
            onClick={() => navigate('/admin/empleados/new')}
            className="px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors"
          >
            + Nuevo Empleado
          </button>
        </div>

        {/* Search bar */}
        <input
          type="text"
          placeholder="Buscar por nombre o especialidad..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
        />
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700">
          {error}
        </div>
      )}

      {/* Empty state */}
      {filteredEmpleados.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">
            {searchTerm ? 'No se encontraron empleados' : 'No hay empleados registrados'}
          </p>
          {!searchTerm && (
            <button
              onClick={() => navigate('/admin/empleados/new')}
              className="px-6 py-3 bg-black text-white hover:bg-gray-800"
            >
              Crear Primer Empleado
            </button>
          )}
        </div>
      )}

      {/* Lista de empleados */}
      {filteredEmpleados.length > 0 && (
        <div className="grid gap-4">
          {filteredEmpleados.map((empleado) => (
            <div
              key={empleado.empleado_id}
              className="border border-gray-300 p-6 hover:border-black transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{empleado.nombre}</h3>
                  {empleado.especialidad && (
                    <p className="text-gray-600 mb-4">{empleado.especialidad}</p>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/admin/empleados/${empleado.empleado_id}/agenda`)}
                    className="px-4 py-2 border border-gray-300 hover:border-black transition-colors"
                  >
                    Ver Agenda
                  </button>
                  <button
                    onClick={() => navigate(`/admin/empleados/${empleado.empleado_id}`)}
                    className="px-4 py-2 border border-gray-300 hover:border-black transition-colors"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(empleado.empleado_id, empleado.nombre)}
                    className="px-4 py-2 border border-red-300 text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
