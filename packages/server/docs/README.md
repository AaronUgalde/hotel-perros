# 📚 Documentación API - Hotel Perros

Documentación completa del backend refactorizado siguiendo las mejores prácticas de Express.js.

---

## 📋 Índice de Documentación

### 🔐 Autenticación
- [**AUTH_ROUTES.md**](./AUTH_ROUTES.md) - Registro, login, logout, gestión de sesiones

### 👤 Propietarios
- [**OWNER_ROUTES.md**](./OWNER_ROUTES.md) - Perfil de propietarios, datos personales

### 📞 Teléfonos
- [**PHONE_ROUTES.md**](./PHONE_ROUTES.md) - Gestión de teléfonos de contacto

### 🏠 Direcciones
- [**DIRECTION_ROUTES.md**](./DIRECTION_ROUTES.md) - Direcciones de propietarios

### 🐕 Mascotas
- [**PET_ROUTES.md**](./PET_ROUTES.md) - CRUD de mascotas, catálogos (especies, razas, colores)

### 💉 Vacunaciones
- [**VACCINATION_ROUTES.md**](./VACCINATION_ROUTES.md) - Historial de vacunaciones ✨ **Refactorizado**
- [**vaccinations-architecture.md**](./vaccinations-architecture.md) - Arquitectura técnica del módulo ✨ **Nuevo**

### 📄 Documentos
- [**DOCUMENT_ROUTES.md**](./DOCUMENT_ROUTES.md) - Carga y gestión de documentos

---

## 🏗️ Arquitectura del Proyecto

### Estructura General

```
packages/server/
├── src/
│   ├── config/              # Configuraciones centralizadas
│   │   ├── database.ts      # Pool de conexiones PostgreSQL
│   │   ├── env.ts           # Variables de entorno validadas
│   │   └── jwt.ts           # Configuración JWT
│   │
│   ├── routes/              # Definición de endpoints HTTP
│   ├── controllers/         # Manejo de Request/Response
│   ├── services/            # Lógica de negocio
│   ├── repositories/        # Queries SQL
│   ├── validators/          # Reglas de validación
│   ├── middlewares/         # Middlewares personalizados
│   ├── utils/               # Funciones auxiliares
│   ├── types/               # Tipos TypeScript
│   │
│   ├── app.ts              # Configuración de Express
│   └── server.ts           # Punto de entrada
│
├── docs/                    # Esta documentación
├── uploads/                 # Archivos subidos
├── .env                     # Variables de entorno
└── package.json
```

---

## 🎯 Flujo de Datos (Arquitectura en Capas)

```
HTTP Request
    ↓
┌─────────────────┐
│     ROUTES      │  Define endpoints y aplica middlewares
└────────┬────────┘
         ↓
┌─────────────────┐
│   MIDDLEWARES   │  Auth, Validation, Error Handling
└────────┬────────┘
         ↓
┌─────────────────┐
│  CONTROLLERS    │  Maneja Request/Response
└────────┬────────┘
         ↓
┌─────────────────┐
│    SERVICES     │  Lógica de negocio
└────────┬────────┘
         ↓
┌─────────────────┐
│  REPOSITORIES   │  Queries SQL
└────────┬────────┘
         ↓
┌─────────────────┐
│    DATABASE     │  PostgreSQL
└─────────────────┘
```

---

## 🚀 Inicio Rápido

### 1. Configuración

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales
```

### 2. Desarrollo

```bash
# Modo desarrollo (con hot-reload)
npm run dev

# El servidor iniciará en http://localhost:4000
```

### 3. Producción

```bash
# Compilar TypeScript
npm run build

# Ejecutar en producción
npm start
```

---

## 📡 Base URL

```
Local: http://localhost:4000
Production: https://api.hotel-perros.com
```

---

## 🔐 Autenticación

Todos los endpoints CRUD requieren autenticación mediante **JWT token en cookie httpOnly**.

### Headers Requeridos

```http
Cookie: token=<JWT_TOKEN>
```

### Obtener Token

```bash
# 1. Login
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'

# El token se establece automáticamente en cookie httpOnly
```

---

## 📊 Estructura de Respuestas

### Respuesta Exitosa

```json
{
  "success": true,
  "data": {
    // Datos solicitados
  },
  "message": "Mensaje opcional"
}
```

### Respuesta de Error

```json
{
  "success": false,
  "error": "Mensaje de error descriptivo"
}
```

### Errores de Validación

```json
{
  "success": false,
  "errors": [
    {
      "field": "email",
      "message": "Email inválido"
    },
    {
      "field": "password",
      "message": "La contraseña debe tener al menos 6 caracteres"
    }
  ]
}
```

---

## 🔢 Códigos de Estado HTTP

| Código | Descripción |
|--------|-------------|
| `200` | OK - Operación exitosa |
| `201` | Created - Recurso creado |
| `400` | Bad Request - Error de validación |
| `401` | Unauthorized - No autenticado |
| `403` | Forbidden - Sin permisos |
| `404` | Not Found - Recurso no encontrado |
| `500` | Internal Server Error - Error del servidor |

---

## 📝 Convenciones

### Fechas
- **Formato:** ISO 8601 (`YYYY-MM-DD` o `YYYY-MM-DDTHH:mm:ssZ`)
- **Ejemplos:**
  - `2024-01-15`
  - `2024-01-15T10:30:00Z`
  - `2024-01-15T10:30:00-06:00`

### IDs
- **Tipo:** Integer
- **Ejemplo:** `123`, `456`

### Booleanos
- **Valores:** `true` o `false`
- **Ejemplo:** `"esterilizado": true`

---

## 🧪 Testing con cURL

### Ejemplo: Obtener mascotas

```bash
curl -X GET http://localhost:4000/api/pets \
  -H "Cookie: token=YOUR_JWT_TOKEN"
```

### Ejemplo: Crear mascota

```bash
curl -X POST http://localhost:4000/api/pets \
  -H "Content-Type: application/json" \
  -H "Cookie: token=YOUR_JWT_TOKEN" \
  -d '{
    "nombre": "Rex",
    "especie_id": 1,
    "sexo_id": 1,
    "fecha_nacimiento": "2021-05-15"
  }'
```

---

## 🔄 Módulos Refactorizados

### ✅ Vacunaciones (Completado)

El módulo de vacunaciones ha sido completamente refactorizado siguiendo las mejores prácticas:

- ✅ Separación en capas (Repository, Service, Controller)
- ✅ Validaciones centralizadas
- ✅ Manejo consistente de errores
- ✅ TypeScript types
- ✅ Documentación completa

**Ver:**
- [Documentación de Usuario](./VACCINATION_ROUTES.md)
- [Arquitectura Técnica](./vaccinations-architecture.md)

### ⏳ Próximos Módulos

Se aplicará el mismo patrón a:
- Documentos
- Enfermedades
- Teléfonos
- Direcciones

---

## 🛠️ Tecnologías

- **Runtime:** Node.js >= 18.x
- **Framework:** Express.js 4.x
- **Lenguaje:** TypeScript 5.x
- **Base de Datos:** PostgreSQL
- **Autenticación:** JWT (jsonwebtoken)
- **Validación:** express-validator
- **Hashing:** bcrypt

---

## 📚 Recursos Adicionales

### Documentos del Proyecto
- [API_EXAMPLES.md](../API_EXAMPLES.md) - Ejemplos prácticos de uso
- [RESUMEN_VERIFICACION.md](../RESUMEN_VERIFICACION.md) - Estado de verificación
- [TEST_RESULTS.md](../TEST_RESULTS.md) - Resultados de pruebas

### Archivos de Configuración
- [package.json](../package.json) - Dependencias y scripts
- [tsconfig.json](../tsconfig.json) - Configuración TypeScript
- [.env.example](../.env.example) - Variables de entorno ejemplo

---

## 🐛 Reporte de Problemas

Si encuentras algún error en la documentación o en la API:

1. Verifica que estés usando la versión correcta de la API
2. Revisa los códigos de estado HTTP en la respuesta
3. Consulta la documentación específica del endpoint
4. Revisa los logs del servidor para detalles del error

---

## 📄 Licencia

Este proyecto es privado y confidencial.

---

**Última actualización:** Enero 2025  
**Versión API:** 2.0  
**Estado:** En desarrollo activo
