// features/reservations/pages/ReservationsListPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { reservationsApi } from '../api';
import type { Reservation } from '../types';
import { Button } from '../../../components/ui/Button';
import { Calendar, Home, Plus, Eye, Trash2, Search, Filter, X, User } from 'lucide-react';
import { useAuth } from '../../auth/hooks/useAuth';

export const ReservationsListPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user?.rol_id === 2;
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filteredReservations, setFilteredReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  
  // Filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadReservations();
  }, []);

  useEffect(() => {
    filterReservations();
  }, [reservations, searchTerm, statusFilter]);

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

  const filterReservations = () => {
    let filtered = [...reservations];

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(r => 
        r.mascota_nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.habitacion_nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.propietario_nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.propietario_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.reservacion_id.toString().includes(searchTerm)
      );
    }

    // Filtrar por estado
    if (statusFilter !== 'all') {
      filtered = filtered.filter(r => r.estado_nombre?.toLowerCase() === statusFilter);
    }

    setFilteredReservations(filtered);
  };

  const handleDelete = async (id: number) => {
    try {
      setDeleteId(id);
      await reservationsApi.delete(id);
      setReservations(prev => prev.filter(r => r.reservacion_id !== id));
    } catch (err: any) {
      setError('Error al eliminar la reservación');
      console.error(err);
    } finally {
      setDeleteId(null);
    }
  };

  const getStatusColor = (estadoNombre: string | undefined) => {
    switch (estadoNombre?.toLowerCase()) {
      case 'confirmada':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'cancelada':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'completada':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (estadoNombre: string | undefined) => {
    switch (estadoNombre?.toLowerCase()) {
      case 'confirmada':
        return '✓';
      case 'pendiente':
        return '○';
      case 'cancelada':
        return '✕';
      case 'completada':
        return '★';
      default:
        return '•';
    }
  };

  const calculateNights = (fechaInicio: string, fechaFin: string) => {
    const start = new Date(fechaInicio);
    const end = new Date(fechaFin);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-MX', {
      month: 'short',
      day: 'numeric'
    });
  };

  const isUpcoming = (fechaInicio: string) => {
    return new Date(fechaInicio) > new Date();
  };

  // Skeleton loading component
  const ReservationSkeleton = () => (
    <div className="bg-white rounded-lg shadow overflow-hidden animate-pulse">
      <div className="bg-gray-300 h-24"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="h-10 bg-gray-300 rounded w-64 mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-96 animate-pulse"></div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <ReservationSkeleton key={i} />
          ))}
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
            <h1 className="text-3xl font-bold text-gray-900">
              {isAdmin ? 'Todas las Reservaciones' : 'Mis Reservaciones'}
            </h1>
            <p className="text-gray-600 mt-2">
              {filteredReservations.length} {filteredReservations.length === 1 ? 'reservación' : 'reservaciones'}
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className={showFilters ? 'bg-gray-100' : ''}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
            {!isAdmin && (
              <Button onClick={() => navigate('/reservations/new')}>
                <Plus className="h-5 w-5 mr-2" />
                Nueva
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Filtros */}
      {showFilters && (
        <div className="mb-6 bg-white rounded-lg shadow p-4 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Búsqueda */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Buscar
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={isAdmin ? "Mascota, propietario, habitación..." : "Mascota, habitación o ID..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  </button>
                )}
              </div>
            </div>

            {/* Estado */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
              >
                <option value="all">Todos los estados</option>
                <option value="pendiente">Pendiente</option>
                <option value="confirmada">Confirmada</option>
                <option value="completada">Completada</option>
                <option value="cancelada">Cancelada</option>
              </select>
            </div>
          </div>

          {/* Limpiar filtros */}
          {(searchTerm || statusFilter !== 'all') && (
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                }}
                className="text-sm text-gray-600 hover:text-gray-900 flex items-center"
              >
                <X className="h-4 w-4 mr-1" />
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-lg p-4 flex items-center justify-between">
          <p className="text-red-700">{error}</p>
          <button onClick={() => setError(null)}>
            <X className="h-5 w-5 text-red-600 hover:text-red-800" />
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredReservations.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm || statusFilter !== 'all' 
              ? 'No se encontraron reservaciones' 
              : 'No tienes reservaciones'}
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || statusFilter !== 'all'
              ? 'Intenta ajustar los filtros de búsqueda'
              : 'Crea tu primera reservación para tu mascota'}
          </p>
          {!(searchTerm || statusFilter !== 'all') && (
            <Button onClick={() => navigate('/reservations/new')}>
              <Plus className="h-5 w-5 mr-2" />
              Crear Primera Reservación
            </Button>
          )}
        </div>
      ) : (
        /* Reservations List */
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredReservations.map((reservation) => {
            const detailPath = isAdmin 
              ? `/admin/reservaciones/${reservation.reservacion_id}`
              : `/reservations/${reservation.reservacion_id}`;
            
            return (
              <div
              key={reservation.reservacion_id}
              className="bg-white rounded-lg shadow hover:shadow-xl transition-all duration-200 overflow-hidden group cursor-pointer"
              onClick={() => navigate(detailPath)}
            >
              {/* Header Card */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-700 text-white p-4 relative">
                {isUpcoming(reservation.fecha_inicio) && (
                  <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    Próxima
                  </div>
                )}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg mb-1">{reservation.mascota_nombre}</h3>
                    <p className="text-sm text-gray-300">
                      Reservación #{reservation.reservacion_id}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border-2 ${getStatusColor(reservation.estado_nombre)}`}>
                    {getStatusIcon(reservation.estado_nombre)} {reservation.estado_nombre}
                  </span>
                </div>
              </div>

              {/* Body Card */}
              <div className="p-4 space-y-3">
                {/* Room */}
                <div className="flex items-center text-gray-700">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                    <Home className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{reservation.habitacion_nombre}</p>
                    <p className="text-xs text-gray-500">Habitación</p>
                  </div>
                </div>

                {/* Dates */}
                <div className="flex items-center text-gray-700">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                    <Calendar className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {formatDate(reservation.fecha_inicio)} - {formatDate(reservation.fecha_fin)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {calculateNights(reservation.fecha_inicio, reservation.fecha_fin)} noches
                    </p>
                  </div>
                </div>

                {/* Owner (solo para admin) */}
                {isAdmin && reservation.propietario_nombre && (
                  <div className="flex items-center text-gray-700">
                    <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center mr-3">
                      <User className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{reservation.propietario_nombre}</p>
                      <p className="text-xs text-gray-500">{reservation.propietario_email}</p>
                    </div>
                  </div>
                )}

                {/* Total */}
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Hospedaje:</span>
                    <span className="text-xl font-bold text-gray-900">
                      ${Number(reservation.monto_total_hospedaje || 0).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Notes Preview */}
                {reservation.notas_especiales && (
                  <div className="text-xs text-gray-500 bg-gray-50 rounded p-2">
                    <p className="font-medium mb-1">📝 Notas:</p>
                    <p className="line-clamp-2">{reservation.notas_especiales}</p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="p-4 bg-gray-50 border-t flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(detailPath);
                  }}
                  className="flex-1 group-hover:bg-black group-hover:text-white transition-colors"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Ver Detalles
                </Button>
                {!isAdmin && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm(`¿Eliminar reservación #${reservation.reservacion_id} de ${reservation.mascota_nombre}?`)) {
                        handleDelete(reservation.reservacion_id);
                      }
                    }}
                    disabled={deleteId === reservation.reservacion_id}
                    className="text-red-600 hover:bg-red-50 hover:border-red-300"
                  >
                    {deleteId === reservation.reservacion_id ? (
                      <div className="animate-spin h-4 w-4 border-2 border-red-600 border-t-transparent rounded-full"></div>
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                )}
              </div>
            </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
