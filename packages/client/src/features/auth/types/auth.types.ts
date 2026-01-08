// features/auth/types/auth.types.ts

// ============= Entidades Base =============
export interface User {
  propietario_id: number;
  correo_electronico: string;
  nombre?: string;
  primer_apellido?: string;
  segundo_apellido?: string;
  rol_id?: number;
  created_at?: string;
  updated_at?: string;
}

// ============= Request DTOs =============
export interface LoginCredentials {
  email?: string;
  correo_electronico?: string;
  password: string;
  remember?: boolean;
}

export interface RegisterData {
  email: string;
  correo_electronico?: string;
  password: string;
  nombre?: string;
  primer_apellido?: string;
  segundo_apellido?: string;
  apellido_paterno?: string;
  apellido_materno?: string;
  remember?: boolean;
}

// ============= Response DTOs =============
export interface AuthResponse {
  success: boolean;
  propietario: User;
  message?: string;
}

export interface ErrorResponse {
  success: false;
  error: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

// ============= Auth State =============
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// ============= Context Types =============
export interface AuthContextValue extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}
