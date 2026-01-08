// features/auth/api/auth.api.ts
import api from '../../../lib/api';
import type { 
  LoginCredentials, 
  RegisterData, 
  AuthResponse 
} from '../types';

const ENDPOINT = '/auth';

export const authApi = {
  /**
   * Iniciar sesión
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data } = await api.post(`${ENDPOINT}/login`, credentials);
    return data;
  },

  /**
   * Registrar nuevo usuario
   */
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const { data } = await api.post(`${ENDPOINT}/register`, userData);
    return data;
  },

  /**
   * Obtener información del usuario actual
   */
  me: async (): Promise<AuthResponse> => {
    const { data } = await api.get(`${ENDPOINT}/me`);
    return data;
  },

  /**
   * Cerrar sesión
   */
  logout: async (): Promise<void> => {
    await api.post(`${ENDPOINT}/logout`);
  },

  /**
   * Refrescar token (si aplica)
   */
  refresh: async (): Promise<AuthResponse> => {
    const { data } = await api.post(`${ENDPOINT}/refresh`);
    return data;
  }
};
