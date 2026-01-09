// Página de agenda de un empleado - Ver sus citas asignadas
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { empleadosApi } from '../api';
// import { citasApi } from '../api';
import type { Empleado, CitaServicio } from '../types';

export default function EmpleadoAgendaPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [empleado, setEmpleado] = useState<Empleado | null>(null);
  const [citas, setCitas] = useState<CitaServicio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [empleadoData, citasData] = await Promise.all([
        empleadosApi.getById(Number(id)),
        empleadosApi.getCitas(Number(id)),
      ]);
      setEmpleado(empleadoData);
      setCitas(citasData);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al cargar datos');
    } finally {
      setLoading(false);
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

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <div className="text-gray-500">Cargando agenda...</div>
      </div>
    );
  }

  if (!empleado) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <div className="text-red-500">Empleado no encontrado</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/admin/empleados')}
          className="mb-4 text-gray-600 hover:text-black transition-colors"
        >
          ← Volver a empleados
        </button>
        <h1 className="text-3xl font-bold mb-2">Agenda: {empleado.nombre}</h1>
        {empleado.especialidad && (
          <p className="text-gray-600">{empleado.especialidad}</p>
        )}
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700">
          {error}
        </div>
      )}

      {/* Empty state */}
      {citas.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No hay citas asignadas a este empleado</p>
        </div>
      )}

      {/* Lista de citas */}
      {citas.length > 0 && (
        <div className="grid gap-4">
          {citas.map((cita) => (
            <div
              key={cita.cita_id}
              className="border border-gray-300 p-6 hover:border-black transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">
                    {cita.servicio_nombre}
                  </h3>
                  <div className="space-y-1 text-gray-600">
                    <p>Mascota: {cita.mascota_nombre}</p>
                    <p>Inicio: {formatDateTime(cita.fecha_hora_inicio)}</p>
                    <p>Fin: {formatDateTime(cita.fecha_hora_fin)}</p>
                    {cita.notas && <p className="mt-2">Notas: {cita.notas}</p>}
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/admin/citas/${cita.cita_id}`)}
                  className="px-4 py-2 border border-gray-300 hover:border-black transition-colors"
                >
                  Ver Detalle
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
