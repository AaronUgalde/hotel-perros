import React, { useState } from 'react';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { Eye, EyeOff, LogIn, ArrowRight } from 'lucide-react';
import PerroLogin from '../../../assets/perro_dueño_login.png';
import type { LoginCredentials } from '../types';

export interface LoginPageProps {
  onLogin: (credentials: LoginCredentials) => Promise<void>;
  loading: boolean;
  error: string | null;
}


export const LoginPage: React.FC<LoginPageProps> = ({
  onLogin,
  loading,
  error
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe] = useState(true); // Cambiado a true para persistir sesión
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const credentials: LoginCredentials = {
      email,
      password,
      remember: rememberMe
    };

    await onLogin(credentials);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex items-center justify-between gap-12">

        {/* Login Form */}
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8">

            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-black rounded-full">
                <LogIn className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold">Bienvenido</h1>
              <p className="text-gray-600">
                ¿Está tu mascota lista para unas vacaciones?
              </p>
            </div>

            {error && (
              <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-700 text-center font-medium">
                  {error}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">

              <Input
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="tucorreo@ejemplo.com"
                disabled={loading}
                required
              />

              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={setPassword}
                  placeholder="••••••••"
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>

              <Button disabled={loading} className="w-full">
                {loading ? 'Iniciando sesión…' : 'Iniciar Sesión'}
                <ArrowRight className="ml-2" />
              </Button>
            </form>
          </div>
        </div>

        {/* Image */}
        <div className="hidden lg:flex">
          <img src={PerroLogin} className="w-[500px] filter brightness-0" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
