// features/auth/hooks/useLogin.ts
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api';
import type { LoginCredentials } from '../types';

interface UseLoginReturn {
  login: (credentials: LoginCredentials) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

/**
 * Hook para manejar el proceso de login
 */
export const useLogin = (): UseLoginReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      await authApi.login(credentials);
      
      // Guardar token si viene en la respuesta (opcional)
      // if (response.token) {
      //   localStorage.setItem('token', response.token);
      // }
      
      // Redirigir al dashboard o home
      navigate('/dashboard');
      
    } catch (err: any) {
      const message = err.response?.data?.error || 
                     err.message || 
                     'Error al iniciar sesión';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    login,
    isLoading,
    error,
    clearError
  };
};
