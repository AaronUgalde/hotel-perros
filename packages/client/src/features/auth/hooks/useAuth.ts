// features/auth/hooks/useAuth.ts
import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import type { AuthContextValue } from '../types';

/**
 * Hook para acceder al contexto de autenticación
 * @throws Error si se usa fuera del AuthProvider
 */
export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  
  return context;
};
