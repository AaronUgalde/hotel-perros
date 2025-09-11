import React, { useState } from 'react';
import { Input } from '../../../components/ui/Input';
import { FormSection } from '../../../components/ui/FormSection';
import { Button } from '../../../components/ui/Button';
import PerroLogin from '../../../assets/perro_dueño_login.png'

interface RegistrationForm {
  email: string;
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  password: string;
  confirmPassword: string;
  telefonoPrincipal: string;
  tipoDomicilio: string;
  calle: string;
  colonia: string;
  ciudad: string;
  estado: string;
  codigoPostal: string;
  numeroExterior1: string;
  numeroExterior2: string;
  telefonosEmergencia: string[];
}

export const RegistrationPage: React.FC = () => {
  const [form, setForm] = useState<RegistrationForm>({
    email: '',
    nombre: '',
    primerApellido: '',
    segundoApellido: '',
    password: '',
    confirmPassword: '',
    telefonoPrincipal: '',
    tipoDomicilio: '',
    calle: '',
    colonia: '',
    ciudad: '',
    estado: '',
    codigoPostal: '',
    numeroExterior1: '',
    numeroExterior2: '',
    telefonosEmergencia: ['', '', '', '', '']
  });

  const updateField = (field: keyof RegistrationForm, value: string) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateEmergencyPhone = (index: number, value: string) => {
    const newPhones = [...form.telefonosEmergencia];
    newPhones[index] = value;
    setForm(prev => ({
      ...prev,
      telefonosEmergencia: newPhones
    }));
  };

  const addEmergencyPhone = () => {
    setForm(prev => ({
      ...prev,
      telefonosEmergencia: [...prev.telefonosEmergencia, '']
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', form);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="text-xl font-bold text-gray-900">Your Logo</div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Registration Form */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Bienvenido</h1>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Registrarse</h2>
              <p className="text-gray-600">Donde las mascotas descansan de sus dueños</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information Section */}
              <FormSection title="Información Personal">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    type="email"
                    label="Correo electrónico"
                    value={form.email}
                    onChange={(value) => updateField('email', value)}
                    placeholder="Ingresa tu correo electronico"
                    required
                  />
                  
                  <Input
                    label="Tipo de domicilio"
                    value={form.tipoDomicilio}
                    onChange={(value) => updateField('tipoDomicilio', value)}
                    placeholder="Ingresa tu tipo de domicilio"
                  />
                  
                  <Input
                    label="Nombre"
                    value={form.nombre}
                    onChange={(value) => updateField('nombre', value)}
                    placeholder="Ingresa tu nombre"
                  />
                  
                  <Input
                    label="Calle"
                    value={form.calle}
                    onChange={(value) => updateField('calle', value)}
                    placeholder="Ingresa tu calle"
                  />
                  
                  <Input
                    label="Primer apellido"
                    value={form.primerApellido}
                    onChange={(value) => updateField('primerApellido', value)}
                    placeholder="Ingresa tu primer apellido"
                  />
                  
                  <Input
                    label="Colonia"
                    value={form.colonia}
                    onChange={(value) => updateField('colonia', value)}
                    placeholder="Ingresa tu colonia"
                  />
                  
                  <Input
                    label="Segundo apellido"
                    value={form.segundoApellido}
                    onChange={(value) => updateField('segundoApellido', value)}
                    placeholder="Ingresa tu segundo apellido"
                  />
                  
                  <Input
                    label="Ciudad"
                    value={form.ciudad}
                    onChange={(value) => updateField('ciudad', value)}
                    placeholder="Ingresa tu ciudad"
                  />
                  
                  <Input
                    type="password"
                    label="Contraseña"
                    value={form.password}
                    onChange={(value) => updateField('password', value)}
                    placeholder="Ingresa tu contraseña"
                    required
                  />
                  
                  <Input
                    label="Estado"
                    value={form.estado}
                    onChange={(value) => updateField('estado', value)}
                    placeholder="Ingresa tu Estado"
                  />
                  
                  <Input
                    type="password"
                    label="Confirmar contraseña"
                    value={form.confirmPassword}
                    onChange={(value) => updateField('confirmPassword', value)}
                    placeholder="Confirma tu contraseña"
                    required
                  />
                  
                  <Input
                    label="Codigo postal"
                    value={form.codigoPostal}
                    onChange={(value) => updateField('codigoPostal', value)}
                    placeholder="Ingresa tu Codigo postal"
                  />
                  
                  <Input
                    label="Telefono principal"
                    value={form.telefonoPrincipal}
                    onChange={(value) => updateField('telefonoPrincipal', value)}
                    placeholder="Telefono principal"
                    required
                  />
                  
                  <Input
                    label="Numero exterior"
                    value={form.numeroExterior1}
                    onChange={(value) => updateField('numeroExterior1', value)}
                    placeholder="Ingresa tu numero exterior"
                  />
                  
                  <div className="md:col-span-2">
                    <Input
                      label="Numero exterior"
                      value={form.numeroExterior2}
                      onChange={(value) => updateField('numeroExterior2', value)}
                      placeholder="Ingresa tu numero exterior"
                    />
                  </div>
                </div>
              </FormSection>

              {/* Submit Button */}
              <Button 
                variant="primary" 
                size="lg" 
                className="w-full"
              >
                Registrate
              </Button>
              
              <div className="text-center">
                <span className="text-gray-600">Ya tienes una cuenta? </span>
                <button type="button" className="text-gray-600 hover:text-gray-800 underline">
                  Inicia sesión
                </button>
              </div>
            </form>
          </div>

          {/* Emergency Phones Sidebar */}
          <div className="lg:col-span-1">
            <FormSection title="Telefonos extra" className="h-fit">
              <div className="space-y-4">
                {form.telefonosEmergencia.map((phone, index) => (
                  <Input
                    key={index}
                    label={`Telefono de emergencia ${index + 1}`}
                    value={phone}
                    onChange={(value) => updateEmergencyPhone(index, value)}
                    placeholder="Telefono de emergencia"
                  />
                ))}
                
                <button
                  type="button"
                  onClick={addEmergencyPhone}
                  className="w-full text-left text-gray-500 hover:text-gray-700 text-sm underline"
                >
                  Agregar telefono de emergencia
                </button>
              </div>
            </FormSection>

            {/* Decorative Image */}
            <div className="mt-8 flex justify-center">
              <div className="relative">
                <img 
                  src={PerroLogin} 
                  alt="Gato registrar" 
                  className="w-48 h-48 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};