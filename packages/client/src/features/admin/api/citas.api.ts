// API service for citas de servicios
import api from '../../../lib/api';
import type { CitaServicio, CitaServicioFormData } from '../types';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const citasApi = {
  // Obtener todas las citas (del propietario o todas si es admin)
  getAll: async (): Promise<CitaServicio[]> => {
    const response = await api.get<ApiResponse<CitaServicio[]>>('/citas-servicios');
    return response.data.data;
  },

  // Obtener cita por ID
  getById: async (id: number): Promise<CitaServicio> => {
    const response = await api.get<ApiResponse<CitaServicio>>(`/citas-servicios/${id}`);
    return response.data.data;
  },

  // Crear cita
  create: async (data: CitaServicioFormData): Promise<CitaServicio> => {
    const response = await api.post<ApiResponse<CitaServicio>>('/citas-servicios', data);
    return response.data.data;
  },

  // Actualizar cita
  update: async (id: number, data: Partial<CitaServicioFormData>): Promise<CitaServicio> => {
    const response = await api.put<ApiResponse<CitaServicio>>(`/citas-servicios/${id}`, data);
    return response.data.data;
  },

  // Eliminar cita
  delete: async (id: number): Promise<void> => {
    await api.delete(`/citas-servicios/${id}`);
  },

  // Obtener citas por reservación
  getByReservacion: async (reservacionId: number): Promise<CitaServicio[]> => {
    const response = await api.get<ApiResponse<CitaServicio[]>>(
      `/citas-servicios/by-reservacion/${reservacionId}`
    );
    return response.data.data;
  },

  // Obtener citas por empleado
  getByEmpleado: async (empleadoId: number): Promise<CitaServicio[]> => {
    const response = await api.get<ApiResponse<CitaServicio[]>>(
      `/citas-servicios/by-empleado/${empleadoId}`
    );
    return response.data.data;
  },

  // Obtener citas por rango de fechas
  getByDateRange: async (fechaInicio: string, fechaFin: string): Promise<CitaServicio[]> => {
    const response = await api.get<ApiResponse<CitaServicio[]>>(
      `/citas-servicios/by-date-range?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
    );
    return response.data.data;
  },
};
