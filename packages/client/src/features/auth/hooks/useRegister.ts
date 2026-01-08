// features/auth/hooks/useRegister.ts
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api';
import type { RegisterData } from '../types';

interface UseRegisterReturn {
  register: (data: RegisterData) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

/**
 * Hook para manejar el proceso de registro
 */
export const useRegister = (): UseRegisterReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    setError(null);

    try {
      await authApi.register(data);
      
      // Redirigir al dashboard o completar perfil
      navigate('/dashboard');
      
    } catch (err: any) {
      const message = err.response?.data?.error || 
                     err.message || 
                     'Error al registrar usuario';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    register,
    isLoading,
    error,
    clearError
  };
};
