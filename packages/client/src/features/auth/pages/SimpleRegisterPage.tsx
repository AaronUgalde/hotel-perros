// src/features/auth/pages/SimpleRegisterPage.tsx
import React, { useState } from 'react';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { Eye, EyeOff, UserPlus, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PerroLogin from '../../../assets/perro_dueño_login.png';
import authService from '../api/auth.service';

export const SimpleRegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validaciones
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (!formData.nombre || !formData.apellido_paterno) {
      setError('Nombre y primer apellido son requeridos');
      return;
    }

    setLoading(true);

    try {
      await authService.register({
        email: formData.email,
        password: formData.password,
        nombre: formData.nombre,
        apellido_paterno: formData.apellido_paterno,
        apellido_materno: formData.apellido_materno || undefined,
      });

      // Redirigir al home después del registro exitoso
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al registrar usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex items-center justify-between gap-12">
        
        {/* Register Form Section */}
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8">
            
            {/* Welcome Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-black rounded-full">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Crear Cuenta</h1>
              <p className="text-gray-600">
                Únete a nuestra familia de cuidado de mascotas
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-700 text-center font-medium">{error}</p>
              </div>
            )}

            {/* Register Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Email Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Correo Electrónico *
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(val) => handleChange('email', val)}
                  placeholder="tucorreo@ejemplo.com"
                  className="w-full"
                  required
                  disabled={loading}
                />
              </div>

              {/* Name and Last Names */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Nombre *
                  </label>
                  <Input
                    type="text"
                    value={formData.nombre}
                    onChange={(val) => handleChange('nombre', val)}
                    placeholder="Juan"
                    className="w-full"
                    required
                    disabled={loading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Primer Apellido *
                  </label>
                  <Input
                    type="text"
                    value={formData.apellido_paterno}
                    onChange={(val) => handleChange('apellido_paterno', val)}
                    placeholder="Pérez"
                    className="w-full"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Segundo Apellido
                </label>
                <Input
                  type="text"
                  value={formData.apellido_materno}
                  onChange={(val) => handleChange('apellido_materno', val)}
                  placeholder="García (opcional)"
                  className="w-full"
                  disabled={loading}
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Contraseña *
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(val) => handleChange('password', val)}
                    placeholder="••••••••"
                    className="w-full pr-12"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-500">Mínimo 6 caracteres</p>
              </div>

              {/* Confirm Password Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Confirmar Contraseña *
                </label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(val) => handleChange('confirmPassword', val)}
                    placeholder="••••••••"
                    className="w-full pr-12"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Register Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full group"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creando cuenta...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    Crear Cuenta
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </Button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500 font-medium">
                    ¿Ya tienes cuenta?
                  </span>
                </div>
              </div>

              {/* Login Link */}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="w-full py-3 px-4 border-2 border-gray-900 rounded-lg font-semibold text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-200"
              >
                Iniciar Sesión
              </button>

              {/* Complete Registration Link */}
              <div className="text-center mt-4">
                <p className="text-sm text-gray-600 mb-2">
                  ¿Necesitas registrar información completa?
                </p>
                <button
                  type="button"
                  onClick={() => navigate('/register-complete')}
                  className="text-sm font-semibold text-gray-900 hover:text-gray-700 underline"
                >
                  Ir a Registro Completo
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Dog Image Section */}
        <div className="hidden lg:flex w-full max-w-2xl justify-center items-center">
          <div className="relative">
            <img
              src={PerroLogin}
              alt="Perro y dueño"
              className="w-[500px] h-[500px] object-contain filter brightness-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleRegisterPage;
