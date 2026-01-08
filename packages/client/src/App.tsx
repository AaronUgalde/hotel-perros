// App.tsx - Configuración de rutas con Layout
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Layout } from './components/layout';
import { 
  SimpleRegisterPage, 
  RegistrationPage,
  ProtectedRoute, 
  LoginContainer
} from './features/auth';
import { 
  LandingPage, 
  PetsListPage, 
  PetFormPage, 
  PetDetailPage,
  AddVacunaPage,
  AddEnfermedadPage,
  AddAlergiaPage,
  AddDesparasitacionPage,
  AddDocumentoPage
} from './features/pets/pages';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            {/* ========== RUTAS PÚBLICAS ========== */}
            
            {/* Home - Landing Page */}
            <Route path="/" element={<LandingPage />} />
            
            {/* Login - Estilo minimalista blanco y negro */}
            <Route path="/login" element={<LoginContainer />} />
            
            {/* Registro Simplificado - Solo datos básicos */}
            <Route path="/register" element={<SimpleRegisterPage />} />
            
            {/* Registro Completo - Con teléfonos y direcciones */}
            <Route path="/register-complete" element={<RegistrationPage />} />
            
            {/* ========== RUTAS PROTEGIDAS USUARIO ========== */}
            <Route element={<ProtectedRoute redirectTo="/login" />}>
              {/* Gestión de mascotas */}
              <Route path="/pets" element={<PetsListPage />} />
              <Route path="/pets/new" element={<PetFormPage />} />
              <Route path="/pets/:id" element={<PetFormPage />} />
              <Route path="/pets/:id/details" element={<PetDetailPage />} />
              <Route path="/pets/:id/vacunas/new" element={<AddVacunaPage />} />
              <Route path="/pets/:id/enfermedades/new" element={<AddEnfermedadPage />} />
              <Route path="/pets/:id/alergias/new" element={<AddAlergiaPage />} />
              <Route path="/pets/:id/desparasitaciones/new" element={<AddDesparasitacionPage />} />
              <Route path="/pets/:id/documentos/new" element={<AddDocumentoPage />} />
              
              {/* Reservaciones del usuario */}
              {/* <Route path="/reservaciones" element={<ReservacionesPage />} /> */}
              {/* <Route path="/reservaciones/nueva" element={<NuevaReservacionPage />} /> */}
              {/* <Route path="/reservaciones/:id" element={<ReservacionDetailPage />} /> */}
            </Route>
            
            {/* ========== RUTAS PROTEGIDAS ADMIN ========== */}
            <Route element={<ProtectedRoute redirectTo="/login" requireAdmin />}>
              {/* Dashboard Admin */}
              {/* <Route path="/admin" element={<AdminDashboard />} /> */}
              
              {/* Gestión de Reservaciones */}
              {/* <Route path="/admin/reservaciones" element={<AdminReservacionesPage />} /> */}
              {/* <Route path="/admin/reservaciones/:id" element={<AdminReservacionDetailPage />} /> */}
              
              {/* Gestión de Mascotas - Admin usa las mismas páginas pero ve todas las mascotas */}
              <Route path="/admin/mascotas" element={<PetsListPage />} />
              <Route path="/admin/mascotas/:id" element={<PetFormPage />} />
              
              {/* Gestión de Propietarios */}
              {/* <Route path="/admin/propietarios" element={<AdminPropietariosPage />} /> */}
              {/* <Route path="/admin/propietarios/:id" element={<AdminPropietarioDetailPage />} /> */}
              
              {/* Gestión de Empleados */}
              {/* <Route path="/admin/empleados" element={<AdminEmpleadosPage />} /> */}
              {/* <Route path="/admin/empleados/:id" element={<AdminEmpleadoDetailPage />} /> */}
              
              {/* Gestión de Servicios */}
              {/* <Route path="/admin/servicios" element={<AdminServiciosPage />} /> */}
            </Route>            
            {/* ========== REDIRECCIONES ========== */}
            {/* Redirigir cualquier ruta no encontrada al home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

/* 
  NOTAS DE USO:
  
  1. El Layout con Header se aplica automáticamente a todas las rutas
  2. Descomenta las rutas que necesites
  3. Importa tus componentes reales
  4. El AuthProvider envuelve toda la aplicación
  5. ProtectedRoute verifica autenticación automáticamente
  6. Las rutas admin requieren requireAdmin={true} en ProtectedRoute
  
  ESTRUCTURA DE NAVEGACIÓN:
  
  PÚBLICO:
  - / - Landing Page
  - /login - Iniciar sesión
  - /register - Registro rápido
  - /register-complete - Registro completo
  
  USUARIO AUTENTICADO:
  - /pets - Mis mascotas
  - /pets/new - Registrar mascota
  - /reservaciones - Mis reservaciones
  - /reservaciones/nueva - Nueva reservación
  
  ADMIN:
  - /admin - Dashboard
  - /admin/reservaciones - Gestión de reservaciones
  - /admin/mascotas - Gestión de mascotas
  - /admin/propietarios - Gestión de propietarios
  - /admin/empleados - Gestión de empleados
  - /admin/servicios - Gestión de servicios
  
  EJEMPLO DE USO DEL HEADER:
  El Header cambia automáticamente según el rol:
  - Sin login: Muestra "Inicio" y "Contacto"
  - Usuario: Muestra opciones de mascotas y reservaciones
  - Admin: Muestra dashboard y gestión completa del sistema
*/