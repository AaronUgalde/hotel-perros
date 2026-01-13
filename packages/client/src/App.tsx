// App.tsx - Configuración de rutas con Layout
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Layout } from './components/layout';
import { 
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
import {
  ReservationsListPage,
  ReservationFormPage,
  ReservationDetailPage,
  ReservationCalendarPage
} from './features/reservations';
import {
  EmpleadosListPage,
  EmpleadoFormPage,
  EmpleadoAgendaPage,
  CitasListPage,
  CitaFormPage
} from './features/admin';

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
            
            
            {/* Registro Completo - Con teléfonos y direcciones */}
            <Route path="/register" element={<RegistrationPage />} />
            
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
              <Route path="/reservations" element={<ReservationsListPage />} />
              <Route path="/reservations/calendar" element={<ReservationCalendarPage />} />
              <Route path="/reservations/new" element={<ReservationFormPage />} />
              <Route path="/reservations/:id/edit" element={<ReservationFormPage />} />
              <Route path="/reservations/:id" element={<ReservationDetailPage />} />
            </Route>
            
            {/* ========== RUTAS PROTEGIDAS ADMIN ========== */}
            <Route element={<ProtectedRoute redirectTo="/login" requireAdmin />}>
              {/* Dashboard Admin */}
              {/* <Route path="/admin" element={<AdminDashboard />} /> */}
              
              {/* Gestión de Reservaciones - Admin */}
              <Route path="/admin/reservaciones" element={<ReservationsListPage />} />
              <Route path="/admin/reservaciones/calendar" element={<ReservationCalendarPage />} />
              <Route path="/admin/reservaciones/:id" element={<ReservationDetailPage />} />
              
              {/* Gestión de Mascotas - Admin usa las mismas páginas pero ve todas las mascotas */}
              <Route path="/admin/mascotas" element={<PetsListPage />} />
              <Route path="/admin/mascotas/:id" element={<PetFormPage />} />
              <Route path="/admin/mascotas/:id/details" element={<PetDetailPage />} />
              <Route path="/admin/mascotas/:id/vacunas/new" element={<AddVacunaPage />} />
              <Route path="/admin/mascotas/:id/enfermedades/new" element={<AddEnfermedadPage />} />
              <Route path="/admin/mascotas/:id/alergias/new" element={<AddAlergiaPage />} />
              <Route path="/admin/mascotas/:id/desparasitaciones/new" element={<AddDesparasitacionPage />} />
              <Route path="/admin/mascotas/:id/documentos/new" element={<AddDocumentoPage />} />
              
              {/* Gestión de Propietarios */}
              {/* <Route path="/admin/propietarios" element={<AdminPropietariosPage />} /> */}
              {/* <Route path="/admin/propietarios/:id" element={<AdminPropietarioDetailPage />} /> */}
              
              {/* Gestión de Empleados */}
              <Route path="/admin/empleados" element={<EmpleadosListPage />} />
              <Route path="/admin/empleados/new" element={<EmpleadoFormPage />} />
              <Route path="/admin/empleados/:id" element={<EmpleadoFormPage />} />
              <Route path="/admin/empleados/:id/agenda" element={<EmpleadoAgendaPage />} />
              
              {/* Gestión de Citas */}
              <Route path="/admin/citas" element={<CitasListPage />} />
              <Route path="/admin/citas/new" element={<CitaFormPage />} />
              <Route path="/admin/citas/:id" element={<CitaFormPage />} />
              
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