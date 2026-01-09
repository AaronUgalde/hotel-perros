// API service for empleados
import api from '../../../lib/api';
import type { Empleado, EmpleadoFormData } from '../types';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const empleadosApi = {
  // Obtener todos los empleados
  getAll: async (): Promise<Empleado[]> => {
    const response = await api.get<ApiResponse<Empleado[]>>('/empleados');
    return response.data.data;
  },

  // Obtener empleado por ID
  getById: async (id: number): Promise<Empleado> => {
    const response = await api.get<ApiResponse<Empleado>>(`/empleados/${id}`);
    return response.data.data;
  },

  // Crear empleado
  create: async (data: EmpleadoFormData): Promise<Empleado> => {
    const response = await api.post<ApiResponse<Empleado>>('/empleados', data);
    return response.data.data;
  },

  // Actualizar empleado
  update: async (id: number, data: Partial<EmpleadoFormData>): Promise<Empleado> => {
    const response = await api.put<ApiResponse<Empleado>>(`/empleados/${id}`, data);
    return response.data.data;
  },

  // Eliminar empleado
  delete: async (id: number): Promise<void> => {
    await api.delete(`/empleados/${id}`);
  },

  // Buscar empleados por especialidad
  searchByEspecialidad: async (especialidad: string): Promise<Empleado[]> => {
    const response = await api.get<ApiResponse<Empleado[]>>(
      `/empleados/search?especialidad=${encodeURIComponent(especialidad)}`
    );
    return response.data.data;
  },

  // Obtener citas de un empleado
  getCitas: async (empleadoId: number) => {
    const response = await api.get(`/empleados/${empleadoId}/citas`);
    return response.data.data;
  },
};
