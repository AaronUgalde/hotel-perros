// Página de formulario de cita - Crear/Editar
import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { citasApi, empleadosApi } from '../api';
import { reservationsApi } from '../../reservations/api';
import type { CitaServicioFormData, Empleado } from '../types';
import type { Reservation, Service } from '../../reservations/types';

export default function CitaFormPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const isEditing = !!id;
  
  // Obtener parámetros de la URL para pre-selección
  const preSelectedReservacionId = searchParams.get('reservacion');
  const preSelectedServicioId = searchParams.get('servicio');

  const [reservaciones, setReservaciones] = useState<Reservation[]>([]);
  const [servicios, setServicios] = useState<Service[]>([]);
  const [serviciosDisponibles, setServiciosDisponibles] = useState<Service[]>([]);
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  
  const [formData, setFormData] = useState<CitaServicioFormData>({
    reservacion_id: 0,
    servicio_id: 0,
    empleado_id: undefined,
    fecha_hora_inicio: '',
    fecha_hora_fin: '',
    notas: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCatalogs();
    if (isEditing) {
      loadCita();
    }
  }, [id]);

  // Filtrar servicios disponibles cuando cambia la reservación seleccionada
  useEffect(() => {
    if (formData.reservacion_id > 0) {
      const reservacionSeleccionada = reservaciones.find(
        (res) => res.reservacion_id === formData.reservacion_id
      );
      
      if (reservacionSeleccionada?.servicios && reservacionSeleccionada.servicios.length > 0) {
        // Obtener los IDs de los servicios de la reservación
        const serviciosIds = reservacionSeleccionada.servicios.map(rs => rs.servicio_id);
        
        // Filtrar solo los servicios que están en la reservación
        const serviciosFiltrados = servicios.filter(s => 
          serviciosIds.includes(s.servicio_id)
        );
        
        setServiciosDisponibles(serviciosFiltrados);
        
        // Si el servicio seleccionado no está en la lista filtrada, resetear
        if (formData.servicio_id > 0 && !serviciosIds.includes(formData.servicio_id)) {
          setFormData(prev => ({ ...prev, servicio_id: 0 }));
        }
      } else {
        // Si no hay servicios en la reservación, mostrar mensaje
        setServiciosDisponibles([]);
        setFormData(prev => ({ ...prev, servicio_id: 0 }));
      }
    } else {
      setServiciosDisponibles([]);
    }
  }, [formData.reservacion_id, reservaciones, servicios]);

  const loadCatalogs = async () => {
    try {
      const [reservacionesData, serviciosData, empleadosData] = await Promise.all([
        reservationsApi.getAll(),
        reservationsApi.getServices(),
        empleadosApi.getAll(),
      ]);
      setReservaciones(reservacionesData);
      setServicios(serviciosData);
      setEmpleados(empleadosData);
      
      // Pre-seleccionar reservación y servicio si vienen en la URL
      if (preSelectedReservacionId && preSelectedServicioId && !isEditing) {
        // Cargar la reservación completa con sus servicios
        const reservacionCompleta = await reservationsApi.getById(Number(preSelectedReservacionId));
        
        // Actualizar la lista de reservaciones con la completa
        setReservaciones(prev => {
          const existe = prev.find(r => r.reservacion_id === reservacionCompleta.reservacion_id);
          if (existe) {
            // Reemplazar con la versión completa
            return prev.map(r => 
              r.reservacion_id === reservacionCompleta.reservacion_id ? reservacionCompleta : r
            );
          } else {
            // Agregar si no existe
            return [...prev, reservacionCompleta];
          }
        });
        
        setFormData(prev => ({
          ...prev,
          reservacion_id: Number(preSelectedReservacionId),
          servicio_id: Number(preSelectedServicioId)
        }));
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al cargar catálogos');
    }
  };

  const loadCita = async () => {
    try {
      setLoading(true);
      const data = await citasApi.getById(Number(id));
      
      // Cargar la reservación completa con sus servicios para poder validar
      const reservacion = await reservationsApi.getById(data.reservacion_id);
      
      setFormData({
        reservacion_id: data.reservacion_id,
        servicio_id: data.servicio_id,
        empleado_id: data.empleado_id,
        fecha_hora_inicio: data.fecha_hora_inicio.slice(0, 16), // formato para datetime-local
        fecha_hora_fin: data.fecha_hora_fin.slice(0, 16),
        notas: data.notas || '',
      });
      
      // Si la reservación no está en la lista, agregarla
      setReservaciones(prev => {
        const existe = prev.find(r => r.reservacion_id === reservacion.reservacion_id);
        if (!existe) {
          return [...prev, reservacion];
        }
        return prev;
      });
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al cargar cita');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validar que la fecha fin sea posterior a la fecha inicio
    if (new Date(formData.fecha_hora_fin) <= new Date(formData.fecha_hora_inicio)) {
      setError('La fecha de fin debe ser posterior a la fecha de inicio');
      return;
    }

    try {
      setLoading(true);
      
      // Convertir a formato ISO8601 para el servidor
      const dataToSend = {
        ...formData,
        fecha_hora_inicio: new Date(formData.fecha_hora_inicio).toISOString(),
        fecha_hora_fin: new Date(formData.fecha_hora_fin).toISOString(),
        empleado_id: formData.empleado_id || undefined,
      };

      if (isEditing) {
        await citasApi.update(Number(id), dataToSend);
      } else {
        await citasApi.create(dataToSend);
      }
      navigate('/admin/citas');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al guardar cita');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/admin/citas')}
          className="mb-4 text-gray-600 hover:text-black transition-colors"
        >
          ← Volver a citas
        </button>
        <h1 className="text-3xl font-bold">
          {isEditing ? 'Editar Cita' : 'Nueva Cita'}
        </h1>
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700">
          {error}
        </div>
      )}

      {/* Info banner cuando viene desde una reservación */}
      {preSelectedReservacionId && preSelectedServicioId && !isEditing && (
        <div className="mb-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700 font-medium">
              📋 Creando cita desde reservación
            </p>
            <p className="text-sm text-blue-600 mt-1">
              La reservación y el servicio han sido pre-seleccionados. Completa los demás campos para crear la cita.
            </p>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Reservación */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Reservación <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.reservacion_id}
            onChange={(e) => setFormData({ ...formData, reservacion_id: Number(e.target.value) })}
            required
            disabled={isEditing}
            className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black disabled:bg-gray-100"
          >
            <option value={0}>Selecciona una reservación</option>
            {reservaciones.map((res) => (
              <option key={res.reservacion_id} value={res.reservacion_id}>
                {res.mascota_nombre} - {res.fecha_inicio} al {res.fecha_fin}
              </option>
            ))}
          </select>
          {isEditing && (
            <p className="mt-1 text-sm text-gray-500">No se puede cambiar la reservación</p>
          )}
        </div>

        {/* Servicio */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Servicio <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.servicio_id}
            onChange={(e) => setFormData({ ...formData, servicio_id: Number(e.target.value) })}
            required
            disabled={isEditing || formData.reservacion_id === 0 || serviciosDisponibles.length === 0}
            className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black disabled:bg-gray-100"
          >
            <option value={0}>
              {formData.reservacion_id === 0 
                ? 'Primero selecciona una reservación' 
                : serviciosDisponibles.length === 0
                  ? 'Esta reservación no tiene servicios contratados'
                  : 'Selecciona un servicio'
              }
            </option>
            {serviciosDisponibles.map((serv) => (
              <option key={serv.servicio_id} value={serv.servicio_id}>
                {serv.nombre} - ${serv.precio_unitario}
              </option>
            ))}
          </select>
          {isEditing ? (
            <p className="mt-1 text-sm text-gray-500">No se puede cambiar el servicio</p>
          ) : formData.reservacion_id > 0 && serviciosDisponibles.length === 0 ? (
            <p className="mt-1 text-sm text-amber-600">
              ⚠️ Esta reservación no tiene servicios contratados. Agrega servicios a la reservación primero.
            </p>
          ) : formData.reservacion_id > 0 && serviciosDisponibles.length > 0 ? (
            <p className="mt-1 text-sm text-green-600">
              ✓ Mostrando solo los {serviciosDisponibles.length} servicio(s) de esta reservación
            </p>
          ) : null}
        </div>

        {/* Empleado */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Empleado (Opcional)
          </label>
          <select
            value={formData.empleado_id || ''}
            onChange={(e) => setFormData({ 
              ...formData, 
              empleado_id: e.target.value ? Number(e.target.value) : undefined 
            })}
            className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
          >
            <option value="">Sin asignar</option>
            {empleados.map((emp) => (
              <option key={emp.empleado_id} value={emp.empleado_id}>
                {emp.nombre}{emp.especialidad ? ` - ${emp.especialidad}` : ''}
              </option>
            ))}
          </select>
        </div>

        {/* Fecha y hora de inicio */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Fecha y Hora de Inicio <span className="text-red-500">*</span>
          </label>
          <input
            type="datetime-local"
            value={formData.fecha_hora_inicio}
            onChange={(e) => setFormData({ ...formData, fecha_hora_inicio: e.target.value })}
            required
            className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
          />
        </div>

        {/* Fecha y hora de fin */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Fecha y Hora de Fin <span className="text-red-500">*</span>
          </label>
          <input
            type="datetime-local"
            value={formData.fecha_hora_fin}
            onChange={(e) => setFormData({ ...formData, fecha_hora_fin: e.target.value })}
            required
            className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
          />
        </div>

        {/* Notas */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Notas
          </label>
          <textarea
            value={formData.notas}
            onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
            maxLength={500}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black resize-none"
            placeholder="Observaciones adicionales sobre la cita..."
          />
          <p className="mt-1 text-sm text-gray-500">
            {formData.notas?.length || 0}/500 caracteres
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-6 py-3 bg-black text-white hover:bg-gray-800 disabled:bg-gray-400 transition-colors"
          >
            {loading ? 'Guardando...' : isEditing ? 'Actualizar' : 'Crear Cita'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/citas')}
            className="px-6 py-3 border border-gray-300 hover:border-black transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
