// src/contexts/AuthContext.tsx
import React, { createContext, useEffect, useState } from 'react';
import authService from '../features/auth/api/auth.service';
import type {
  AuthContextValue,
  LoginCredentials,
  RegisterData,
  User,
} from '../features/auth';

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = !!user;

  // ========================
  // Auth logic
  // ========================

  const checkAuth = async () => {
    try {
      setIsLoading(true);
      const response = await authService.me();
      setUser(response.propietario);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await authService.login(credentials);
      setUser(response.propietario);
    } catch (err: any) {
      setError(err?.message ?? 'Error al iniciar sesión');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await authService.register(data);
      setUser(response.propietario);
    } catch (err: any) {
      setError(err?.message ?? 'Error al registrarse');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
    }
  };

  const clearError = () => setError(null);

  // ========================
  // Provider
  // ========================

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        error,
        login,
        register,
        logout,
        checkAuth,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
