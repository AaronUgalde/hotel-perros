# Rutas de Autenticación (Auth Routes)

Base URL: `/api/auth`

## Descripción General
Estas rutas manejan el registro, inicio de sesión, cierre de sesión y obtención de información del usuario autenticado.

---

## Endpoints

### 1. Registro de Usuario
**POST** `/api/auth/register`

Crea una nueva cuenta de usuario en el sistema.

#### Requiere Autenticación
❌ No

#### Request Body
```json
{
  "email": "string",
  "password": "string",
  "nombre": "string",
  "apellido_paterno": "string",
  "apellido_materno": "string (opcional)"
}
```

#### Validaciones
- Email válido y único
- Password con requisitos mínimos de seguridad
- Nombre y apellido paterno requeridos

#### Response Success (201)
```json
{
  "success": true,
  "data": {
    "id": "number",
    "email": "string",
    "nombre": "string",
    "apellido_paterno": "string",
    "apellido_materno": "string"
  },
  "token": "string"
}
```

#### Response Error (400/409)
```json
{
  "success": false,
  "error": "Mensaje de error"
}
```

---

### 2. Inicio de Sesión
**POST** `/api/auth/login`

Autentica un usuario existente y devuelve un token de sesión.

#### Requiere Autenticación
❌ No

#### Request Body
```json
{
  "email": "string",
  "password": "string"
}
```

#### Validaciones
- Email válido
- Password requerido

#### Response Success (200)
```json
{
  "success": true,
  "data": {
    "id": "number",
    "email": "string",
    "nombre": "string"
  },
  "token": "string"
}
```

#### Response Error (401)
```json
{
  "success": false,
  "error": "Credenciales inválidas"
}
```

---

### 3. Cerrar Sesión
**POST** `/api/auth/logout`

Cierra la sesión del usuario actual.

#### Requiere Autenticación
❌ No (pero típicamente se envía con token para invalidarlo)

#### Request Body
Sin body requerido

#### Response Success (200)
```json
{
  "success": true,
  "message": "Sesión cerrada exitosamente"
}
```

---

### 4. Obtener Usuario Actual
**GET** `/api/auth/me`

Obtiene la información del usuario autenticado actualmente.

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
    "email": "string",
    "nombre": "string",
    "apellido_paterno": "string",
    "apellido_materno": "string",
    "fecha_creacion": "string (ISO date)"
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

---

## Ejemplos de Uso

### Registro con cURL
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@ejemplo.com",
    "password": "MiPassword123!",
    "nombre": "Juan",
    "apellido_paterno": "Pérez",
    "apellido_materno": "García"
  }'
```

### Login con JavaScript (Fetch)
```javascript
const response = await fetch('http://localhost:3000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'usuario@ejemplo.com',
    password: 'MiPassword123!'
  })
});

const data = await response.json();
const token = data.token;
```

### Obtener Usuario Actual
```javascript
const response = await fetch('http://localhost:3000/api/auth/me', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

const userData = await response.json();
```

---

## Notas Importantes

- El token de autenticación se devuelve en las respuestas de `/register` y `/login`
- El token debe incluirse en el header `Authorization` como `Bearer {token}` para rutas protegidas
- Las validaciones se ejecutan antes de procesar la petición
- Los errores de validación devuelven código 400 con detalles específicos
