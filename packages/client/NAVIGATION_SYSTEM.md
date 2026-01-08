# Sistema de Navegación y Roles - Hotel Perros

## Estructura del Header

El Header es dinámico y cambia según el rol del usuario:

### 1. Usuario No Autenticado (Guest)
**Navegación disponible:**
- 🏠 Inicio (/)
- 📞 Contacto (/#contacto)

**Acciones:**
- Botón "Unirse" → `/register`
- Botón "Iniciar sesión" → `/login`

---

### 2. Usuario Autenticado Regular (rol_id = 2 o sin rol_id)
**Navegación disponible:**
- 🏠 Inicio (/)
- 📞 Contacto (/#contacto)
- 🐾 Mis Mascotas (/pets)
- 📅 Mis Reservaciones (/reservaciones)
- 📝 Nueva Reservación (/reservaciones/nueva)

**Perfil:**
- Muestra nombre del usuario
- Botón "Cerrar sesión"

---

### 3. Administrador (rol_id = 1)
**Navegación disponible:**
- 🏠 Inicio (/)
- 📞 Contacto (/#contacto)
- 📊 Dashboard (/admin)
- 📅 Reservaciones (/admin/reservaciones)
- 🐾 Mascotas (/admin/mascotas)
- 👥 Propietarios (/admin/propietarios)
- 💼 Empleados (/admin/empleados)
- ⚙️ Servicios (/admin/servicios)

**Perfil:**
- Muestra nombre del usuario + badge "Admin"
- Botón "Cerrar sesión"

---

## Rutas Configuradas

### Rutas Públicas (sin autenticación)
```
/                      → LandingPage (página principal)
/login                 → LoginContainer (inicio de sesión)
/register              → SimpleRegisterPage (registro rápido)
/register-complete     → RegistrationPage (registro con teléfonos y direcciones)
```

### Rutas Protegidas - Usuario Regular
```
/pets                  → Lista de mascotas del usuario
/pets/new              → Registrar nueva mascota
/pets/:id              → Detalle de mascota

/reservaciones         → Lista de reservaciones del usuario
/reservaciones/nueva   → Nueva reservación
/reservaciones/:id     → Detalle de reservación
```

### Rutas Protegidas - Solo Admin
```
/admin                         → Dashboard administrativo
/admin/reservaciones           → Gestión de todas las reservaciones
/admin/reservaciones/:id       → Detalle de reservación
/admin/mascotas                → Gestión de todas las mascotas
/admin/mascotas/:id            → Detalle de mascota
/admin/propietarios            → Gestión de propietarios
/admin/propietarios/:id        → Detalle de propietario
/admin/empleados               → Gestión de empleados
/admin/empleados/:id           → Detalle de empleado
/admin/servicios               → Gestión de servicios
```

---

## Componentes del Sistema

### Layout Components
- **Layout**: Wrapper principal que incluye el Header
- **Header**: Navegación dinámica basada en rol

### Auth Components
- **ProtectedRoute**: HOC para proteger rutas
  - Props: `redirectTo` (default: "/login"), `requireAdmin` (default: false)
- **LoginContainer**: Container para LoginPage
- **LoginPage**: Formulario de inicio de sesión
- **SimpleRegisterPage**: Registro rápido (solo datos básicos)
- **RegistrationPage**: Registro completo (con teléfonos y direcciones)

---

## Lógica de Roles

### Determinación de Roles
```typescript
const role = {
  isAdmin: user?.rol_id === 1,
  isUser: user?.rol_id === 2 || (!!user && !user.rol_id),
  isGuest: !user
};
```

### Validación en ProtectedRoute
```typescript
// Para rutas que requieren autenticación
<Route element={<ProtectedRoute />}>
  // Rutas de usuario
</Route>

// Para rutas que requieren admin
<Route element={<ProtectedRoute requireAdmin />}>
  // Rutas de administrador
</Route>
```

### Redirecciones
- Usuario no autenticado en ruta protegida → `/login`
- Usuario regular en ruta admin → `/`
- Ruta no encontrada → `/`

---

## Navegación Responsive

El Header incluye:
- **Desktop**: Navegación horizontal con iconos
- **Mobile**: Menú hamburguesa con navegación completa

---

## Próximos Pasos

Para agregar nuevas funcionalidades:

1. **Crear los componentes de página** en sus respectivas carpetas de features
2. **Descomentar las rutas** correspondientes en `App.tsx`
3. **Importar los componentes** en la parte superior de `App.tsx`
4. Las rutas ya están estructuradas y el sistema de autenticación funcionará automáticamente

Ejemplo:
```typescript
// Importar
import { PetsPage } from './features/pets/pages/PetsPage';

// Descomentar y usar
<Route path="/pets" element={<PetsPage />} />
```