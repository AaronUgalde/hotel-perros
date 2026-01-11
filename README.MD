# Sistema de Gestión para Hotel de Perros

Sistema integral de gestión para establecimientos de hospedaje de mascotas, desarrollado como monorepo con arquitectura cliente-servidor. Permite administrar reservaciones, servicios, mascotas, propietarios y personal mediante una interfaz web moderna y una API RESTful robusta.

## 📋 Tabla de Contenidos

- [Características Principales](#-características-principales)
- [Arquitectura del Sistema](#-arquitectura-del-sistema)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Ejecución del Proyecto](#-ejecución-del-proyecto)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Scripts Disponibles](#-scripts-disponibles)
- [Documentación Adicional](#-documentación-adicional)

## ✨ Características Principales

### Gestión de Mascotas
- Registro completo de mascotas con información detallada (especie, raza, color, sexo)
- Historial médico (vacunaciones, desparasitaciones, enfermedades, alergias)
- Gestión de documentos y fotografías

### Gestión de Propietarios
- Perfiles de propietarios con datos de contacto
- Múltiples teléfonos y direcciones por propietario
- Historial de reservaciones y servicios

### Sistema de Reservaciones
- Calendario interactivo para visualización y gestión de reservas
- Asignación de habitaciones
- Control de check-in y check-out
- Gestión de pagos y facturación

### Servicios Adicionales
- Citas para servicios especializados (veterinaria, peluquería, entrenamiento)
- Programación y seguimiento de servicios
- Registro de empleados asignados

### Administración
- Control de empleados y roles
- Gestión de habitaciones y disponibilidad
- Reportes y estadísticas
- Sistema de autenticación y autorización

## 🏗️ Arquitectura del Sistema

El proyecto está estructurado como un **monorepo** con dos paquetes principales:

```
hotel-perros/
├── packages/
│   ├── client/          # Aplicación frontend (React + TypeScript)
│   └── server/          # API backend (Express + TypeScript)
└── package.json         # Workspace raíz
```

### Backend (Server)
- **Arquitectura en capas:** Routes → Controllers → Services → Repositories
- **Base de datos:** PostgreSQL con conexión segura
- **Autenticación:** JWT con cookies httpOnly
- **Validación:** express-validator
- **Almacenamiento:** Sistema de archivos para documentos y fotografías

### Frontend (Client)
- **Framework:** React 19 con TypeScript
- **Enrutamiento:** React Router v7
- **Estilos:** Tailwind CSS v4
- **Componentes UI:** Componentes personalizados con lucide-react
- **Calendario:** react-big-calendar para visualización de reservas
- **HTTP Client:** Axios para comunicación con API

## 🔧 Requisitos Previos

Asegúrese de tener instalado lo siguiente en su sistema:

- **Node.js:** >= 18.x (recomendado v20.x LTS)
- **npm:** >= 9.x (incluido con Node.js)
- **PostgreSQL:** >= 12.x (base de datos)
- **Git:** Para clonar el repositorio

### Verificación de versiones

```bash
node --version    # Debe mostrar v18.x o superior
npm --version     # Debe mostrar v9.x o superior
```

## 📦 Instalación

### 1. Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd hotel-perros
```

### 2. Instalar Dependencias

El proyecto utiliza **npm workspaces** para gestionar las dependencias de ambos paquetes desde la raíz:

```bash
# Instalar todas las dependencias (client + server)
npm install
```

Este comando instalará automáticamente las dependencias de:
- Workspace raíz
- `packages/client`
- `packages/server`

## ⚙️ Configuración

### 1. Configuración del Backend

Navegue al directorio del servidor y configure las variables de entorno:

```bash
cd packages/server
```

Cree un archivo `.env` basado en el siguiente template:

```env
# Puerto del servidor
PORT=4000

# URL del frontend (para CORS)
FRONTEND_URL=http://localhost:5173

# Conexión a PostgreSQL
DATABASE_URL=postgresql://usuario:contraseña@host:puerto/nombre_base_datos?sslmode=require

# Configuración JWT
JWT_SECRET=tu_secreto_seguro_aqui_minimo_32_caracteres
JWT_EXPIRES_IN=7d

# Directorio de archivos subidos
UPLOAD_DIR=uploads
```

#### Configuración de la Base de Datos

1. **Crear la base de datos PostgreSQL:**

```sql
CREATE DATABASE neondb;
```

2. **Ejecutar las database.sql** 

3. **Ejecutar datos.sql**

3. **Verificar la conexión** ejecutando el servidor en modo desarrollo

### 2. Configuración del Frontend

Navegue al directorio del cliente:

```bash
cd packages/client
```

Cree un archivo `.env` con la siguiente configuración:

```env
# URL base de la API
VITE_API_URL=http://localhost:4000/api
```

### 3. Permisos y Directorios

Asegúrese de que el directorio de uploads exista y tenga permisos adecuados:

```bash
# Desde packages/server
mkdir -p uploads
```

## 🚀 Ejecución del Proyecto

### Modo Desarrollo (Recomendado)

Desde la raíz del proyecto, ejecute ambos servicios simultáneamente:

```bash
npm run dev
```

Este comando iniciará:
- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:4000

Los servidores se reiniciarán automáticamente al detectar cambios en el código.

### Ejecución Individual

Si desea ejecutar los servicios por separado:

```bash
# Solo frontend
npm run dev:client

# Solo backend
npm run dev:server
```

### Modo Producción

#### 1. Compilar el proyecto

```bash
npm run build
```

Este comando:
- Compila TypeScript a JavaScript en `packages/server/dist`
- Genera build optimizado de React en `packages/client/dist`

#### 2. Ejecutar el backend en producción

```bash
npm run start:server
```

#### 3. Servir el frontend

Para producción, se recomienda usar un servidor web como **Nginx** o **Apache** para servir los archivos estáticos del directorio `packages/client/dist`.

## 📁 Estructura del Proyecto

```
hotel-perros/
├── packages/
│   ├── client/                      # Aplicación frontend
│   │   ├── src/
│   │   │   ├── components/         # Componentes reutilizables
│   │   │   ├── contexts/           # Context API (Auth, etc.)
│   │   │   ├── features/           # Módulos por funcionalidad
│   │   │   ├── pages/              # Páginas/vistas
│   │   │   ├── services/           # Servicios HTTP (API)
│   │   │   ├── lib/                # Utilidades y helpers
│   │   │   ├── App.tsx             # Componente raíz
│   │   │   └── main.tsx            # Punto de entrada
│   │   ├── public/                 # Archivos estáticos
│   │   ├── .env                    # Variables de entorno (crear)
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── vite.config.ts
│   │
│   └── server/                      # API backend
│       ├── src/
│       │   ├── config/             # Configuraciones (DB, JWT, env)
│       │   ├── routes/             # Definición de rutas HTTP
│       │   ├── controllers/        # Controladores (request/response)
│       │   ├── services/           # Lógica de negocio
│       │   ├── repositories/       # Queries a base de datos
│       │   ├── validators/         # Reglas de validación
│       │   ├── middlewares/        # Middlewares personalizados
│       │   ├── utils/              # Funciones auxiliares
│       │   ├── types/              # Tipos TypeScript
│       │   ├── app.ts              # Configuración Express
│       │   ├── db.ts               # Conexión PostgreSQL
│       │   └── index.ts            # Punto de entrada
│       ├── docs/                   # Documentación API
│       ├── uploads/                # Archivos subidos
│       ├── .env                    # Variables de entorno (crear)
│       ├── package.json
│       └── tsconfig.json
│
├── .gitignore
├── package.json                     # Workspace raíz
├── tsconfig.base.json
└── README.md                        # Este archivo
```

## 🛠️ Tecnologías Utilizadas

### Frontend
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| React | ^19.1.1 | Framework UI |
| TypeScript | ~5.8.3 | Tipado estático |
| Vite | ^7.1.2 | Build tool y dev server |
| React Router | ^7.8.2 | Enrutamiento |
| Tailwind CSS | ^4.1.13 | Framework CSS |
| Axios | ^1.12.2 | Cliente HTTP |
| React Big Calendar | ^1.19.4 | Calendario interactivo |
| Lucide React | ^0.544.0 | Iconografía |
| date-fns | ^2.30.0 | Manejo de fechas |

### Backend
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Node.js | >= 18.x | Runtime JavaScript |
| Express | ^4.18.2 | Framework web |
| TypeScript | ^5.1.6 | Tipado estático |
| PostgreSQL (pg) | ^8.16.3 | Base de datos |
| JWT | ^9.0.2 | Autenticación |
| bcrypt | ^5.1.0 | Hashing de contraseñas |
| express-validator | ^6.14.3 | Validación de datos |
| Multer | ^1.4.5 | Carga de archivos |
| dotenv | ^16.0.0 | Variables de entorno |
| ts-node-dev | ^2.0.0 | Hot reload en desarrollo |

## 📜 Scripts Disponibles

### Scripts Raíz (desde `hotel-perros/`)

```bash
# Desarrollo
npm run dev              # Ejecuta client + server simultáneamente
npm run dev:client       # Solo frontend
npm run dev:server       # Solo backend

# Producción
npm run build            # Compila ambos paquetes
npm run build:client     # Solo frontend
npm run build:server     # Solo backend
npm run start:server     # Ejecuta backend compilado

# Utilidades
npm run lint             # Ejecuta linters en ambos paquetes
npm run test             # Ejecuta tests (si están configurados)
npm run clean            # Limpia node_modules y build en ambos paquetes
npm install              # Instala todas las dependencias
```

### Scripts del Cliente

```bash
cd packages/client

npm run dev              # Servidor de desarrollo con hot reload
npm run build            # Build de producción
npm run preview          # Preview del build de producción
npm run lint             # Ejecuta ESLint
```

### Scripts del Servidor

```bash
cd packages/server

npm run dev              # Servidor con hot reload
npm run build            # Compila TypeScript
npm run start            # Ejecuta versión compilada
```

## 📚 Documentación Adicional

### Documentación de la API

La documentación completa de todos los endpoints está disponible en:

```
packages/server/docs/
├── README.md                    # Índice y arquitectura
├── AUTH_ROUTES.md              # Autenticación
├── OWNER_ROUTES.md             # Gestión de propietarios
├── PET_ROUTES.md               # Gestión de mascotas
├── VACCINATION_ROUTES.md       # Vacunaciones
├── DOCUMENT_ROUTES.md          # Documentos
├── RESERVACION_ROUTES.md       # Reservaciones
├── HABITACION_ROUTES.md        # Habitaciones
├── SERVICIO_ROUTES.md          # Servicios
├── CITA_SERVICIO_ROUTES.md     # Citas
├── PAGO_ROUTES.md              # Pagos
├── EMPLEADO_ROUTES.md          # Empleados
└── [otros módulos...]
```

### Acceso a la Documentación

Inicie el servidor y visite:
```
http://localhost:4000/api
```

## 🔒 Consideraciones de Seguridad

1. **Variables de Entorno:** Nunca versionar archivos `.env` con credenciales reales
2. **JWT Secret:** Usar un secreto fuerte (mínimo 32 caracteres aleatorios)
3. **Base de Datos:** Configurar SSL/TLS en conexiones de producción
4. **CORS:** Configurar correctamente `FRONTEND_URL` según el entorno
5. **Uploads:** Validar tipos y tamaños de archivos antes de almacenar

## 🐛 Solución de Problemas

### Error: Cannot find module

```bash
# Limpiar e reinstalar dependencias
rm -rf node_modules package-lock.json
rm -rf packages/*/node_modules
npm install
```

### Error de conexión a PostgreSQL

1. Verificar que PostgreSQL esté ejecutándose
2. Validar credenciales en `DATABASE_URL`
3. Comprobar conectividad de red al servidor de BD
4. Revisar logs del servidor para detalles

### Puerto ya en uso

```bash
# Linux/Mac - Liberar puerto 4000
lsof -ti:4000 | xargs kill -9

# Windows - Liberar puerto 4000
netstat -ano | findstr :4000
taskkill /PID <PID> /F
```

### Build falla en TypeScript

```bash
# Verificar errores de tipos
cd packages/server && npx tsc --noEmit
cd packages/client && npx tsc --noEmit
```

## 📄 Licencia

Este proyecto es privado y confidencial. Todos los derechos reservados.

---

**Desarrollado con TypeScript, React y Express.js**  
**Última actualización:** Enero 2025
