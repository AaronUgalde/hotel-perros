// Página de lista de citas de servicios - Admin
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { citasApi } from '../api';
// import { reservationsApi } from '../../reservations/api';
import type { CitaServicio } from '../types';
// import type { Service } from '../../reservations/types';

export default function CitasListPage() {
  const navigate = useNavigate();
  const [citas, setCitas] = useState<CitaServicio[]>([]);
  // const [servicios, setServicios] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterServicio, setFilterServicio] = useState('');
  const [filterEmpleado, setFilterEmpleado] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const citasData = await citasApi.getAll();
      // const serviciosData = await reservationsApi.getServices();
      setCitas(citasData);
      // setServicios(serviciosData);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al cargar citas');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar esta cita?')) return;
    
    try {
      await citasApi.delete(id);
      loadData();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Error al eliminar cita');
    }
  };

  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filteredCitas = citas.filter(cita => {
    const matchServicio = !filterServicio || cita.servicio_nombre?.toLowerCase().includes(filterServicio.toLowerCase());
    const matchEmpleado = !filterEmpleado || cita.empleado_nombre?.toLowerCase().includes(filterEmpleado.toLowerCase());
    return matchServicio && matchEmpleado;
  });

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <div className="text-gray-500">Cargando citas...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Gestión de Citas</h1>
          <button
            onClick={() => navigate('/admin/citas/new')}
            className="px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors"
          >
            + Nueva Cita
          </button>
        </div>

        {/* Filtros */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Filtrar por servicio..."
            value={filterServicio}
            onChange={(e) => setFilterServicio(e.target.value)}
            className="px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
          />
          <input
            type="text"
            placeholder="Filtrar por empleado..."
            value={filterEmpleado}
            onChange={(e) => setFilterEmpleado(e.target.value)}
            className="px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
          />
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700">
          {error}
        </div>
      )}

      {/* Empty state */}
      {filteredCitas.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">
            {filterServicio || filterEmpleado ? 'No se encontraron citas' : 'No hay citas programadas'}
          </p>
          {!filterServicio && !filterEmpleado && (
            <button
              onClick={() => navigate('/admin/citas/new')}
              className="px-6 py-3 bg-black text-white hover:bg-gray-800"
            >
              Crear Primera Cita
            </button>
          )}
        </div>
      )}

      {/* Lista de citas */}
      {filteredCitas.length > 0 && (
        <div className="grid gap-4">
          {filteredCitas.map((cita) => (
            <div
              key={cita.cita_id}
              className="border border-gray-300 p-6 hover:border-black transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{cita.servicio_nombre}</h3>
                  <div className="space-y-1 text-gray-600">
                    <p>Mascota: {cita.mascota_nombre}</p>
                    <p>Empleado: {cita.empleado_nombre || 'Sin asignar'}</p>
                    <p>Inicio: {formatDateTime(cita.fecha_hora_inicio)}</p>
                    <p>Fin: {formatDateTime(cita.fecha_hora_fin)}</p>
                    {cita.notas && (
                      <p className="mt-2 text-sm border-l-2 border-gray-300 pl-3">
                        {cita.notas}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/admin/citas/${cita.cita_id}`)}
                    className="px-4 py-2 border border-gray-300 hover:border-black transition-colors"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(cita.cita_id)}
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
