// features/auth/components/LoginForm.tsx
import { useState } from 'react';
import { useLogin } from '../hooks';
import type { LoginCredentials } from '../types';

interface LoginFormProps {
  onSuccess?: () => void;
  redirectTo?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ 
  onSuccess, 
  redirectTo 
}) => {
  const { login, isLoading, error, clearError } = useLogin();
  
  const [formData, setFormData] = useState<LoginCredentials>({
    correo_electronico: '',
    password: '',
    remember: true // Cambiado a true por defecto para persistir la sesión
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(formData);
      onSuccess?.();
    } catch (err) {
      // Error ya manejado en el hook
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="correo_electronico" className="block text-sm font-medium mb-2">
          Email
        </label>
        <input
          id="correo_electronico"
          name="correo_electronico"
          type="email"
          required
          value={formData.correo_electronico}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-2">
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          value={formData.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          disabled={isLoading}
        />
      </div>

      <div className="flex items-center">
        <input
          id="remember"
          name="remember"
          type="checkbox"
          checked={formData.remember}
          onChange={handleChange}
          className="h-4 w-4 rounded"
          disabled={isLoading}
        />
        <label htmlFor="remember" className="ml-2 text-sm">
          Recordarme
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
      </button>
    </form>
  );
};
