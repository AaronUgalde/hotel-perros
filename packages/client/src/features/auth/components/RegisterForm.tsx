// features/auth/components/RegisterForm.tsx
import { useState } from 'react';
import { useRegister } from '../hooks';
import type { RegisterData } from '../types';

interface RegisterFormProps {
  onSuccess?: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const { register, isLoading, error, clearError } = useRegister();
  
  const [formData, setFormData] = useState<RegisterData>({
    email: '',
    password: '',
    nombre: '',
    primer_apellido: '',
    segundo_apellido: ''
  });

  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    clearError();
    setValidationError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    // Validar contraseñas
    if (formData.password !== confirmPassword) {
      setValidationError('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      setValidationError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      await register(formData);
      onSuccess?.();
    } catch (err) {
      console.error('Register error:', err);
    }
  };

  const displayError = validationError || error;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {displayError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {displayError}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium mb-2">
            Nombre
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="primer_apellido" className="block text-sm font-medium mb-2">
            Primer Apellido
          </label>
          <input
            id="primer_apellido"
            name="primer_apellido"
            type="text"
            value={formData.primer_apellido}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            disabled={isLoading}
          />
        </div>
      </div>

      <div>
        <label htmlFor="segundo_apellido" className="block text-sm font-medium mb-2">
          Segundo Apellido (Opcional)
        </label>
        <input
          id="segundo_apellido"
          name="segundo_apellido"
          type="text"
          value={formData.segundo_apellido}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-2">
          Contraseña *
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

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
          Confirmar Contraseña *
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setValidationError('');
          }}
          className="w-full px-3 py-2 border rounded-md"
          disabled={isLoading}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isLoading ? 'Registrando...' : 'Registrarse'}
      </button>
    </form>
  );
};
