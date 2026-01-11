// features/reservations/pages/ReservationCalendarPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { reservationsApi } from '../api';
import type { Reservation } from '../types';
import { ReservationCalendar } from '../../../components/calendar';
import { Button } from '../../../components/ui/Button';
import { ArrowLeft, Calendar, List } from 'lucide-react';
import { useAuth } from '../../auth/hooks/useAuth';

export const ReservationCalendarPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user?.rol_id === 2;
  
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = async () => {
    try {
      setLoading(true);
      const data = await reservationsApi.getAll();
      setReservations(data);
    } catch (err: any) {
      setError('Error al cargar las reservaciones');
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
          <p className="text-gray-600">Cargando calendario...</p>
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
              onClick={() => navigate('/reservations')}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Volver
            </button>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Calendar className="h-8 w-8" />
              Calendario de Reservaciones
            </h1>
            <p className="text-gray-600 mt-2">
              Vista mensual de todas tus reservaciones
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/reservations')}>
              <List className="h-5 w-5 mr-2" />
              Vista de Lista
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
      <ReservationCalendar 
        reservations={reservations}
        isAdmin={isAdmin}
      />

      {/* Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Total Reservaciones</p>
          <p className="text-2xl font-bold text-gray-900">{reservations.length}</p>
        </div>
        <div className="bg-green-50 rounded-lg shadow p-4">
          <p className="text-sm text-green-600">Confirmadas</p>
          <p className="text-2xl font-bold text-green-900">
            {reservations.filter(r => r.estado_nombre?.toLowerCase() === 'confirmada').length}
          </p>
        </div>
        <div className="bg-yellow-50 rounded-lg shadow p-4">
          <p className="text-sm text-yellow-600">Pendientes</p>
          <p className="text-2xl font-bold text-yellow-900">
            {reservations.filter(r => r.estado_nombre?.toLowerCase() === 'pendiente').length}
          </p>
        </div>
        <div className="bg-blue-50 rounded-lg shadow p-4">
          <p className="text-sm text-blue-600">Completadas</p>
          <p className="text-2xl font-bold text-blue-900">
            {reservations.filter(r => r.estado_nombre?.toLowerCase() === 'completada').length}
          </p>
        </div>
      </div>
    </div>
  );
};
