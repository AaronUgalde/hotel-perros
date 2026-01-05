# Rutas de Propietarios (Owner Routes)

Base URL: `/api/owners`

## Descripción General
Estas rutas manejan las operaciones relacionadas con los propietarios de mascotas, incluyendo el registro completo del perfil, consulta y actualización de información personal.

---

## Endpoints

### 1. Registro Completo de Propietario
**POST** `/api/owners/register-complete`

Completa el registro de un propietario con información personal detallada.

#### Requiere Autenticación
❌ No (registro público)

#### Headers
```
Content-Type: application/json
```

#### Request Body
```json
{
  "propietario": {
    "correo_electronico": "string (requerido, único)",
    "password": "string (requerido, min 6 caracteres)",
    "nombre": "string (requerido, max 80 caracteres)",
    "primer_apellido": "string (requerido, max 80 caracteres)",
    "segundo_apellido": "string (opcional, max 80 caracteres)"
  },
  "telefonos": [
    {
      "numero": "string (requerido)",
      "tipo_telefono_id": "number (requerido)",
      "nombre_contacto": "string (opcional)",
      "relacion_contacto": "string (opcional)",
      "es_principal": "boolean (requerido)",
      "notas": "string (opcional)"
    }
  ],
  "direcciones": [
    {
      "tipo_domicilio_id": "number (requerido)",
      "calle": "string (requerido)",
      "num_exterior": "string (requerido)",
      "num_interior": "string (opcional)",
      "codigo_postal": "string (requerido)",
      "colonia_id": "number (requerido)",
      "estado_id": "number (requerido)",
      "municipio_id": "number (requerido)",
      "fecha_inicio": "string (ISO date, requerido)",
      "fecha_fin": "string (ISO date, opcional)",
      "es_predeterminada": "boolean (requerido)",
      "notas": "string (opcional)"
    }
  ]
}
```

**Nota**: El array `direcciones` es opcional, pero `telefonos` requiere al menos un elemento.

#### Validaciones
- `propietario.correo_electronico`: Email válido y único
- `propietario.password`: Mínimo 6 caracteres
- `propietario.nombre`: Requerido, máximo 80 caracteres
- `propietario.primer_apellido`: Requerido, máximo 80 caracteres
- `propietario.segundo_apellido`: Opcional, máximo 80 caracteres
- `telefonos`: Array con al menos 1 teléfono
- `direcciones`: Array opcional (puede estar vacío o no enviarse)
- Los IDs de catálogos (tipo_telefono_id, colonia_id, etc.) deben existir en la base de datos

#### Response Success (201)
```json
{
  "success": true,
  "data": {
    "propietario_id": "number"
  },
  "message": "Propietario registrado exitosamente"
}
```

#### Response Error (400)
```json
{
  "success": false,
  "error": "Mensaje de error de validación"
}
```

#### Response Error (400)
```json
{
  "success": false,
  "error": "El correo electrónico ya está registrado"
}
```

---

### 2. Obtener Información del Propietario Actual
**GET** `/api/owners/me`

Obtiene la información completa del propietario autenticado.

#### Requiere Autenticación
✅ Sí

#### Headers
```
Authorization: Bearer {token}
```

#### Request Body
Sin body

#### Response Success (200)
```json
{
  "success": true,
  "data": {
    "id": "number",
    "nombre": "string",
    "primer_apellido": "string",
    "segundo_apellido": "string",
    "telefono": "string",
    "direccion": "string",
    "ciudad": "string",
    "estado": "string",
    "codigo_postal": "string",
    "fecha_nacimiento": "string (ISO date)",
    "email": "string",
    "fecha_creacion": "string (ISO date)",
    "fecha_actualizacion": "string (ISO date)"
  }
}
```

#### Response Error (401)
```json
{
  "success": false,
  "error": "No autorizado"
}
```

#### Response Error (404)
```json
{
  "success": false,
  "error": "Propietario no encontrado"
}
```

---

### 3. Actualizar Información del Propietario
**PUT** `/api/owners/me`

Actualiza la información personal del propietario autenticado.

#### Requiere Autenticación
✅ Sí

#### Headers
```
Authorization: Bearer {token}
Content-Type: application/json
```

#### Request Body
Todos los campos son opcionales. Solo envía los campos que deseas actualizar:

```json
{
  "nombre": "string (opcional, max 80 caracteres)",
  "primer_apellido": "string (opcional, max 80 caracteres)",
  "segundo_apellido": "string (opcional, max 80 caracteres)",
  "telefono": "string (opcional)",
  "direccion": "string (opcional)",
  "ciudad": "string (opcional)",
  "estado": "string (opcional)",
  "codigo_postal": "string (opcional)",
  "fecha_nacimiento": "string (ISO date, opcional)"
}
```

#### Validaciones
- Si se proporciona teléfono, debe tener formato válido
- Si se proporciona código postal, debe ser válido
- Si se proporciona fecha de nacimiento, debe ser una fecha válida
- El email NO se puede actualizar desde este endpoint (es inmutable)

#### Response Success (200)
```json
{
  "success": true,
  "data": {
    "id": "number",
    "nombre": "string",
    "primer_apellido": "string",
    "segundo_apellido": "string",
    "telefono": "string",
    "direccion": "string",
    "ciudad": "string",
    "estado": "string",
    "codigo_postal": "string",
    "fecha_nacimiento": "string",
    "email": "string",
    "fecha_actualizacion": "string (ISO date actualizada)"
  }
}
```

#### Response Error (400)
```json
{
  "success": false,
  "error": "Mensaje de error de validación"
}
```

#### Response Error (401)
```json
{
  "success": false,
  "error": "No autorizado"
}
```

---

## Ejemplos de Uso

### Registro Completo con cURL
```bash
curl -X POST http://localhost:3000/api/owners/register-complete \
  -H "Content-Type: application/json" \
  -d '{
    "propietario": {
      "correo_electronico": "maria.gonzalez@ejemplo.com",
      "password": "MiPassword123!",
      "nombre": "María",
      "primer_apellido": "González",
      "segundo_apellido": "López"
    },
    "telefonos": [
      {
        "numero": "5551234567",
        "tipo_telefono_id": 1,
        "nombre_contacto": "María González",
        "es_principal": true
      }
    ],
    "direcciones": [
      {
        "tipo_domicilio_id": 1,
        "calle": "Calle Reforma",
        "num_exterior": "123",
        "codigo_postal": "01000",
        "colonia_id": 1,
        "estado_id": 1,
        "municipio_id": 1,
        "fecha_inicio": "2025-01-01",
        "es_predeterminada": true
      }
    ]
  }'
```

### Obtener Información del Propietario
```javascript
const response = await fetch('http://localhost:3000/api/owners/me', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

const ownerData = await response.json();
console.log(ownerData.data);
```

### Actualizar Información Personal
```javascript
const response = await fetch('http://localhost:3000/api/owners/me', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    telefono: '+52-555-9876543',
    direccion: 'Nueva Dirección 456',
    ciudad: 'Guadalajara'
  })
});

const updatedData = await response.json();
```

### Actualización Parcial
```javascript
// Solo actualizar teléfono
const response = await fetch('http://localhost:3000/api/owners/me', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    telefono: '+52-555-1112233'
  })
});
```

---

## Flujo de Trabajo Recomendado

### 1. Registro Completo
```
Usuario Nuevo → POST /api/owners/register-complete
                ↓
          Recibe token de autenticación
                ↓
          Guarda token para futuras peticiones
```

### 2. Consulta de Perfil
```
Usuario Autenticado → GET /api/owners/me
                      ↓
                Visualiza información personal
```

### 3. Actualización de Perfil
```
Usuario Autenticado → PUT /api/owners/me
                      ↓
                Actualiza campos específicos
                      ↓
                Recibe datos actualizados
```

---

## Notas Importantes

- El endpoint `/register-complete` crea tanto el usuario como el propietario en una sola transacción
- **No devuelve token**: Después del registro debes hacer login en `/auth/login` para obtener el token
- El correo electrónico NO puede ser actualizado después del registro (es un identificador único)
- La ruta `/me` siempre retorna información del usuario autenticado (basado en el token)
- Las actualizaciones son parciales: solo se modifican los campos enviados en el request
- **Estructura anidada**: El registro requiere un objeto `propietario` que contiene `correo_electronico` y `password`
- **Teléfonos obligatorios**: Debe incluirse al menos un teléfono en el array `telefonos`
- **Direcciones opcionales**: El array `direcciones` puede omitirse o estar vacío
- Las validaciones garantizan la integridad de los datos y referencias a catálogos
- La contraseña no puede ser actualizada desde `/me` (requeriría un endpoint separado de cambio de contraseña)

---

## Diferencias con Auth Routes

| Característica | Auth Routes | Owner Routes |
|----------------|-------------|--------------|
| Propósito | Autenticación básica | Información completa del propietario |
| Registro | `/auth/register` - Datos mínimos | `/owners/register-complete` - Datos completos |
| Información | Usuario básico | Propietario con todos los detalles |
| Actualización | No disponible | `/owners/me` - PUT |

Se recomienda usar `/owners/register-complete` para un registro completo en un solo paso, incluyendo información de contacto y dirección.
