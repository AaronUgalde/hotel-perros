import React from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import LoginPage from './LoginPage';

export const LoginContainer: React.FC = () => {
  const { login } = useAuth();

  const handleLogin = async (email: string, password: string, rememberMe: boolean) => {
    try {
      await login(email, password, rememberMe);
      // Redirecciona o muestra mensaje de éxito
    } catch (err) {
      // Manejo de errores
      console.error(err);
    }
  };

  return <LoginPage onLogin={handleLogin} />;
};

export default LoginContainer;