// src/services/auth.service.ts
import api from '../lib/api';

export interface LoginCredentials {
  email?: string;
  correo_electronico?: string;
  password: string;
  remember?: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  nombre?: string;
  apellido_paterno?: string;
  apellido_materno?: string;
  remember?: boolean;
}

export interface Propietario {
  propietario_id: number;
  correo_electronico: string;
  nombre?: string;
  primer_apellido?: string;
  segundo_apellido?: string;
  rol_id?: number;
}

export interface AuthResponse {
  propietario: Propietario;
}

const authService = {
  /**
   * Login de usuario
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  /**
   * Registro de usuario básico
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  /**
   * Obtener información del usuario actual
   */
  async me(): Promise<AuthResponse> {
    const response = await api.get('/auth/me');
    return response.data;
  },

  /**
   * Cerrar sesión
   */
  async logout(): Promise<void> {
    await api.post('/auth/logout');
  },
};

export default authService;
