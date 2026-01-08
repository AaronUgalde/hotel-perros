import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';
import { useAuth } from '../../features/auth/hooks/useAuth';
import logo from '../../assets/logo.jpg';
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  Home, 
  Calendar, 
  PawPrint,
  Users,
  Settings,
  Briefcase
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon?: React.ElementType;
  external?: boolean;
}

interface UserRole {
  isAdmin: boolean;
  isUser: boolean;
  isGuest: boolean;
}

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Debug
  console.log('Header - user:', user);
  console.log('Header - rol_id:', user?.rol_id);

  // Determinar el rol del usuario
  const role: UserRole = {
    isAdmin: user?.rol_id === 2,
    isUser: user?.rol_id === 1 || (!!user && !user.rol_id),
    isGuest: !user
  };

  console.log('Header - role:', role);
  // Navegación pública (para todos)
  const publicNavItems: NavItem[] = [
    { label: 'Inicio', href: '/', icon: Home },
    { label: 'Contacto', href: '/#contacto' }
  ];

  // Navegación para usuarios regulares
  const userNavItems: NavItem[] = [
    { label: 'Mis Mascotas', href: '/pets', icon: PawPrint },
    { label: 'Mis Reservaciones', href: '/reservations', icon: Calendar },
  ];

  // Navegación para administradores
  const adminNavItems: NavItem[] = [
    { label: 'Dashboard', href: '/admin', icon: Home },
    { label: 'Reservaciones', href: '/admin/reservaciones', icon: Calendar },
    { label: 'Mascotas', href: '/admin/mascotas', icon: PawPrint },
    { label: 'Propietarios', href: '/admin/propietarios', icon: Users },
    { label: 'Empleados', href: '/admin/empleados', icon: Briefcase },
    { label: 'Servicios', href: '/admin/servicios', icon: Settings }
  ];

  // Determinar qué items mostrar según el rol
  const getNavItems = (): NavItem[] => {
    if (role.isAdmin) {
      return [...publicNavItems, ...adminNavItems];
    }
    if (role.isUser) {
      return [...publicNavItems, ...userNavItems];
    }
    return publicNavItems;
  };

  const navItems = getNavItems();
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = async () => {
    await logout();
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center h-full">
            <img 
              src={logo} 
              alt="Hotel Perros Logo" 
              className="h-[90%] object-cover hover:opacity-90 transition-opacity" 
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2"
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {item.label}
                </Link>
              );
            })}
          </nav>
          {/* Auth Section - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {role.isGuest ? (
              <>
                <Button variant="outline" size="sm">
                  <Link to="/register" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Unirse
                  </Link>
                </Button>
                <Button variant="primary" size="sm">
                  <Link to="/login">Iniciar sesión</Link>
                </Button>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 text-gray-700 text-sm px-3 py-2 bg-gray-50 rounded-md">
                  <User className="h-4 w-4" />
                  <span>
                    {user?.nombre || user?.correo_electronico}
                    {role.isAdmin && <span className="ml-2 text-xs bg-black text-white px-2 py-0.5 rounded">Admin</span>}
                  </span>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Cerrar sesión
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2"
                >
                  {Icon && <Icon className="h-5 w-5" />}
                  {item.label}
                </Link>
              );
            })}

            {/* Mobile Auth Section */}
            <div className="border-t pt-4 mt-4 space-y-2">
              {role.isGuest ? (
                <>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium"
                  >
                    <User className="h-5 w-5" />
                    Unirse
                  </Link>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 text-white bg-black hover:bg-gray-800 px-3 py-2 rounded-md text-base font-medium"
                  >
                    Iniciar sesión
                  </Link>
                </>
              ) : (
                <>
                  <div className="px-3 py-2 text-sm text-gray-700 bg-gray-50 rounded-md">
                    {user?.nombre || user?.correo_electronico}
                    {role.isAdmin && <span className="ml-2 text-xs bg-black text-white px-2 py-0.5 rounded">Admin</span>}
                  </div>
                  <button                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full text-left text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium"
                  >
                    <LogOut className="h-5 w-5" />
                    Cerrar sesión
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};