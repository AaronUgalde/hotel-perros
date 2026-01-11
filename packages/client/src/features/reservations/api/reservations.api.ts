// features/reservations/api/reservations.api.ts
import api from '../../../lib/api';
import type {
  Reservation,
  CreateReservationData,
  UpdateReservationData,
  ReservationService,
  AddServiceToReservation,
  ReservationStatus,
  Room,
  Service
} from '../types';

const ENDPOINT = '/reservaciones';

export const reservationsApi = {
  // ============= CRUD DE RESERVACIONES =============

  /**
   * Obtener todas las reservaciones del usuario autenticado
   */
  getAll: async (): Promise<Reservation[]> => {
    const { data } = await api.get(ENDPOINT);
    return data.data;
  },

  /**
   * Obtener reservación por ID
   */
  getById: async (id: number): Promise<Reservation> => {
    const { data } = await api.get(`${ENDPOINT}/${id}`);
    return data.data;
  },

  /**
   * Crear nueva reservación
   */
  create: async (reservationData: CreateReservationData): Promise<Reservation> => {
    const { data } = await api.post(ENDPOINT, reservationData);
    return data.data;
  },

  /**
   * Actualizar reservación
   */
  update: async (id: number, reservationData: UpdateReservationData): Promise<Reservation> => {
    const { data } = await api.put(`${ENDPOINT}/${id}`, reservationData);
    return data.data;
  },

  /**
   * Eliminar reservación
   */
  delete: async (id: number): Promise<void> => {
    await api.delete(`${ENDPOINT}/${id}`);
  },

  // ============= GESTIÓN DE SERVICIOS =============

  /**
   * Agregar servicio a reservación
   */
  addService: async (reservationId: number, serviceData: AddServiceToReservation): Promise<ReservationService> => {
    const { data } = await api.post(`${ENDPOINT}/${reservationId}/servicios`, serviceData);
    return data.data;
  },

  /**
   * Eliminar servicio de reservación
   */
  deleteService: async (reservationId: number, serviceId: number): Promise<void> => {
    await api.delete(`${ENDPOINT}/${reservationId}/servicios/${serviceId}`);
  },

  // ============= CATÁLOGOS =============

  /**
   * Obtener estados de reservación
   */
  getStatuses: async (): Promise<ReservationStatus[]> => {
    const { data } = await api.get(`${ENDPOINT}/catalogs/estados`);
    return data.data.estados;
  },

  /**
   * Obtener habitaciones disponibles
   */
  getRooms: async (): Promise<Room[]> => {
    const { data } = await api.get(`${ENDPOINT}/catalogs/habitaciones`);
    return data.data.habitaciones;
  },

  /**
   * Obtener servicios disponibles
   */
  getServices: async (): Promise<Service[]> => {
    const { data } = await api.get(`${ENDPOINT}/catalogs/servicios`);
    return data.data.servicios;
  },

  /**
   * Obtener reservaciones de una habitación (fechas ocupadas)
   */
  getReservacionesByHabitacion: async (habitacionId: number): Promise<Array<{fecha_inicio: string, fecha_fin: string}>> => {
    const { data } = await api.get(`${ENDPOINT}/catalogs/habitaciones/${habitacionId}/reservaciones`);
    return data.data;
  },
};
