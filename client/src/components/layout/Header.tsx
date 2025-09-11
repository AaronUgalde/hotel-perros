import React from 'react';
import { Button } from '../ui/Button';
import { Dropdown } from '../ui/Dropdown';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  const petInfoItems = [
    { label: 'Agregar mascota', href: '/pets/add' },
    { label: 'Editar información', href: '/pets/edit' },
  ];

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-gray-900">Logo</div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Inicio Rápido
            </button>
            <button className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Reservas Online
            </button>
            <button className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Contacto Aquí
            </button>
            <Dropdown
              trigger={
                <span className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium flex items-center">
                  <Link to="/registrar-mascota">
                    Agregar o editar información de tus mascotas
                  </Link>
                  <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              }
              items={petInfoItems}
            />
          </nav>

          {/* Auth buttons */}
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              Unirse
            </Button>
            <Button variant="primary" size="sm">
              Iniciar sesión
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};