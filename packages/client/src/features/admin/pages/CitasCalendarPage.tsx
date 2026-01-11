// features/admin/pages/CitasCalendarPage.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { citasApi } from '../api';
import type { CitaServicio } from '../types';
import { AppointmentCalendar } from '../../../components/calendar';
import { Button } from '../../../components/ui/Button';
import { ArrowLeft, Calendar, List, Plus } from 'lucide-react';

export default function CitasCalendarPage() {
  const navigate = useNavigate();
  
  const [citas, setCitas] = useState<CitaServicio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCitas();
  }, []);

  const loadCitas = async () => {
    try {
      setLoading(true);
      const data = await citasApi.getAll();
      setCitas(data);
    } catch (err: any) {
      setError('Error al cargar las citas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="animate-spin h-12 w-12 border-4 border-gray-300 border-t-black rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando calendario de citas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <button
              onClick={() => navigate('/admin/citas')}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Volver
            </button>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Calendar className="h-8 w-8" />
              Calendario de Citas
            </h1>
            <p className="text-gray-600 mt-2">
              Vista semanal de todas las citas programadas
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/admin/citas')}>
              <List className="h-5 w-5 mr-2" />
              Vista de Lista
            </Button>
            <Button onClick={() => navigate('/admin/citas/new')}>
              <Plus className="h-5 w-5 mr-2" />
              Nueva Cita
            </Button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-lg p-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Calendar */}
      <AppointmentCalendar appointments={citas} />

      {/* Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Total Citas</p>
          <p className="text-2xl font-bold text-gray-900">{citas.length}</p>
        </div>
        <div className="bg-blue-50 rounded-lg shadow p-4">
          <p className="text-sm text-blue-600">Esta Semana</p>
          <p className="text-2xl font-bold text-blue-900">
            {citas.filter(c => {
              const citaDate = new Date(c.fecha_hora_inicio);
              const today = new Date();
              const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
              return citaDate >= today && citaDate <= weekFromNow;
            }).length}
          </p>
        </div>
        <div className="bg-purple-50 rounded-lg shadow p-4">
          <p className="text-sm text-purple-600">Hoy</p>
          <p className="text-2xl font-bold text-purple-900">
            {citas.filter(c => {
              const citaDate = new Date(c.fecha_hora_inicio);
              const today = new Date();
              return citaDate.toDateString() === today.toDateString();
            }).length}
          </p>
        </div>
      </div>
    </div>
  );
}
