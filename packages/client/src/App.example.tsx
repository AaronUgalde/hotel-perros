// App.tsx - Ejemplo de integración completa
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { 
  LoginPage, 
  SimpleRegisterPage, 
  RegistrationPage,
  ProtectedRoute 
} from './features/auth';

// Tus componentes existentes
// import HomePage from './pages/HomePage';
// import Dashboard from './pages/Dashboard';
// import Profile from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ========== RUTAS PÚBLICAS ========== */}
          
          {/* Login - Estilo minimalista blanco y negro */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Registro Simplificado - Solo datos básicos */}
          <Route path="/register" element={<SimpleRegisterPage />} />
          
          {/* Registro Completo - Con teléfonos y direcciones */}
          <Route path="/register-complete" element={<RegistrationPage />} />
          
          {/* ========== RUTAS PROTEGIDAS ========== */}
          {/* Todas las rutas dentro de ProtectedRoute requieren autenticación */}
          <Route element={<ProtectedRoute redirectTo="/login" />}>
            {/* Ejemplo: Home */}
            {/* <Route path="/" element={<HomePage />} /> */}
            
            {/* Ejemplo: Dashboard */}
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            
            {/* Ejemplo: Perfil de usuario */}
            {/* <Route path="/profile" element={<Profile />} /> */}
            
            {/* Ejemplo: Gestión de mascotas */}
            {/* <Route path="/pets" element={<PetsPage />} /> */}
            {/* <Route path="/pets/new" element={<NewPetPage />} /> */}
            {/* <Route path="/pets/:id" element={<PetDetailPage />} /> */}
            
            {/* Ejemplo: Reservaciones */}
            {/* <Route path="/bookings" element={<BookingsPage />} /> */}
            {/* <Route path="/bookings/new" element={<NewBookingPage />} /> */}
          </Route>
          
          {/* ========== REDIRECCIONES ========== */}
          {/* Redirigir cualquier ruta no encontrada */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

/* 
  NOTAS DE USO:
  
  1. Descomenta las rutas que necesites
  2. Importa tus componentes reales
  3. El AuthProvider envuelve toda la aplicación
  4. ProtectedRoute verifica autenticación automáticamente
  
  EJEMPLO DE COMPONENTE CON AUTH:
  
  import { useAuth } from './contexts/AuthContext';
  
  function MyComponent() {
    const { user, logout, loading } = useAuth();
    
    if (loading) return <div>Cargando...</div>;
    
    return (
      <div>
        <h1>Bienvenido, {user?.nombre}</h1>
        <button onClick={logout}>Cerrar Sesión</button>
      </div>
    );
  }
*/
