# Rutas de Teléfonos (Phone Routes)

Base URL: `/api/phones`

## Descripción General
Estas rutas manejan las operaciones CRUD para teléfonos de propietarios, así como el acceso al catálogo de tipos de teléfono. Permite gestionar múltiples números telefónicos por usuario con información de contacto asociada.

---

## Endpoints de Catálogos (Públicos - No Requieren Autenticación)

### 1. Obtener Tipos de Teléfono
**GET** `/api/phones/tipos`  
**GET** `/api/phones/tipos_telefono`

Obtiene el catálogo de tipos de teléfono disponibles.

#### Requiere Autenticación
❌ No

#### Response Success (200)
```json
{
  "success": true,
  "data": {
    "tipos_telefono": [
      {
        "tipo_telefono_id": "number",
        "nombre": "string"
      }
    ]
  }
}
```

**Ejemplos de tipos**: Celular, Casa, Trabajo, Fax, etc.

---

## Endpoints CRUD de Teléfonos (Requieren Autenticación)

### 2. Obtener Todos los Teléfonos del Usuario
**GET** `/api/phones`

Obtiene todos los teléfonos del propietario autenticado, ordenados por teléfono principal primero.

#### Requiere Autenticación
✅ Sí

#### Headers
```
Authorization: Bearer {token}
```

#### Response Success (200)
```json
{
  "success": true,
  "data": [
    {
      "telefono_id": "number",
      "propietario_id": "number",
      "numero": "string",
      "tipo_telefono_id": "number",
      "nombre_contacto": "string",
      "relacion_contacto": "string",
      "es_principal": "boolean",
      "notas": "string"
    }
  ]
}
```

**Nota**: Los resultados están ordenados con el teléfono principal primero (`es_principal DESC`).

---

### 3. Obtener Teléfono por ID
**GET** `/api/phones/:telefonoId`

Obtiene un teléfono específico del propietario autenticado.

#### Requiere Autenticación
✅ Sí

#### Headers
```
Authorization: Bearer {token}
```

#### URL Parameters
- `telefonoId` (number, requerido): ID del teléfono

#### Response Success (200)
```json
{
  "success": true,
  "data": {
    "telefono_id": "number",
    "propietario_id": "number",
    "numero": "string",
    "tipo_telefono_id": "number",
    "nombre_contacto": "string",
    "relacion_contacto": "string",
    "es_principal": "boolean",
    "notas": "string"
  }
}
```

#### Response Error (404)
```json
{
  "success": false,
  "error": "Teléfono no encontrado"
}
```

---

### 4. Crear Nuevo Teléfono
**POST** `/api/phones`

Crea un nuevo teléfono para el propietario autenticado.

#### Requiere Autenticación
✅ Sí

#### Headers
```
Authorization: Bearer {token}
Content-Type: application/json
```

#### Request Body
```json
{
  "numero": "string (requerido)",
  "tipo_telefono_id": "number (opcional)",
  "nombre_contacto": "string (opcional)",
  "relacion_contacto": "string (opcional)",
  "es_principal": "boolean (opcional, default: false)",
  "notas": "string (opcional)"
}
```

#### Validaciones
- `numero`: String no vacío (requerido)
- `tipo_telefono_id`: Integer válido si se proporciona
- `es_principal`: Si es `true`, automáticamente desmarca cualquier otro teléfono como principal
- Todos los demás campos son opcionales

#### Response Success (201)
```json
{
  "success": true,
  "data": {
    "telefono_id": "number",
    "propietario_id": "number",
    "numero": "string",
    "tipo_telefono_id": "number",
    "nombre_contacto": "string",
    "relacion_contacto": "string",
    "es_principal": "boolean",
    "notas": "string"
  }
}
```

---

### 5. Actualizar Teléfono
**PUT** `/api/phones/:telefonoId`

Actualiza un teléfono existente del propietario autenticado.

#### Requiere Autenticación
✅ Sí

#### Headers
```
Authorization: Bearer {token}
Content-Type: application/json
```

#### URL Parameters
- `telefonoId` (number, requerido): ID del teléfono a actualizar

#### Request Body
Todos los campos son opcionales. Solo envía los campos que deseas actualizar:

```json
{
  "numero": "string (opcional)",
  "tipo_telefono_id": "number (opcional)",
  "nombre_contacto": "string (opcional)",
  "relacion_contacto": "string (opcional)",
  "es_principal": "boolean (opcional)",
  "notas": "string (opcional)"
}
```

#### Response Success (200)
```json
{
  "success": true,
  "data": {
    "telefono_id": "number",
    "propietario_id": "number",
    "numero": "string",
    "tipo_telefono_id": "number",
    "nombre_contacto": "string",
    "relacion_contacto": "string",
    "es_principal": "boolean",
    "notas": "string"
  }
}
```

#### Response Error (400)
```json
{
  "success": false,
  "error": "Nada que actualizar"
}
```

---

### 6. Eliminar Teléfono
**DELETE** `/api/phones/:telefonoId`

Elimina un teléfono del propietario autenticado.

#### Requiere Autenticación
✅ Sí

#### Headers
```
Authorization: Bearer {token}
```

#### URL Parameters
- `telefonoId` (number, requerido): ID del teléfono a eliminar

#### Response Success (200)
```json
{
  "success": true,
  "message": "Teléfono eliminado exitosamente"
}
```

#### Response Error (404)
```json
{
  "success": false,
  "error": "Teléfono no encontrado"
}
```

---

## Ejemplos de Uso

### Crear un Teléfono Principal
```javascript
const response = await fetch('http://localhost:3000/api/phones', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    numero: '5551234567',
    tipo_telefono_id: 1, // Celular
    nombre_contacto: 'Juan Pérez',
    es_principal: true,
    notas: 'Teléfono personal'
  })
});

const data = await response.json();
```

### Agregar un Teléfono de Emergencia
```javascript
const response = await fetch('http://localhost:3000/api/phones', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    numero: '5559876543',
    tipo_telefono_id: 1,
    nombre_contacto: 'María González',
    relacion_contacto: 'Hermana',
    es_principal: false,
    notas: 'Contacto de emergencia'
  })
});
```

### Actualizar Teléfono Principal
```javascript
// Marcar otro teléfono como principal
const response = await fetch('http://localhost:3000/api/phones/5', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    es_principal: true
  })
});

// El teléfono anterior principal se desmarcará automáticamente
```

### Actualizar Solo el Número
```javascript
const response = await fetch('http://localhost:3000/api/phones/3', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    numero: '5551112233'
  })
});
```

### Obtener Todos los Teléfonos
```javascript
const response = await fetch('http://localhost:3000/api/phones', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

const data = await response.json();
console.log(data.data); // Array de teléfonos, principal primero
```

### Eliminar Teléfono
```bash
curl -X DELETE http://localhost:3000/api/phones/3 \
  -H "Authorization: Bearer {token}"
```

---

## Diccionario de Campos

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `telefono_id` | number | Identificador único del teléfono |
| `propietario_id` | number | ID del propietario (asignado automáticamente) |
| `numero` | string | Número telefónico (formato libre) |
| `tipo_telefono_id` | number | Tipo de teléfono (Celular, Casa, Trabajo, etc.) |
| `nombre_contacto` | string | Nombre del titular del teléfono |
| `relacion_contacto` | string | Relación con el titular (Propio, Familiar, Emergencia) |
| `es_principal` | boolean | Indica si es el teléfono principal de contacto |
| `notas` | string | Notas adicionales sobre el teléfono |

---

## Notas Importantes

### Teléfono Principal
- Solo puede haber **un teléfono principal** por propietario
- Al marcar un teléfono como principal (`es_principal: true`), automáticamente se desmarca el anterior
- El teléfono principal aparece primero en la lista de teléfonos
- Útil para identificar el número de contacto prioritario

### Formato del Número
- **Sin validación de formato**: El campo `numero` acepta cualquier string
- Esto permite flexibilidad para diferentes formatos:
  - `5551234567` (10 dígitos)
  - `+52 55 1234 5567` (formato internacional)
  - `(555) 123-4567` (formato con paréntesis y guiones)
  - `55-1234-5567` (con guiones)
- El backend no normaliza ni valida el formato
- Se recomienda implementar validación en el frontend según necesidades

### Múltiples Teléfonos
- Un propietario puede tener **múltiples teléfonos** registrados
- Útil para:
  - Teléfono personal
  - Teléfono de trabajo
  - Teléfono de casa
  - Contactos de emergencia (familiares)

### Información de Contacto
- `nombre_contacto`: Útil cuando el teléfono no es del propietario
- `relacion_contacto`: Describe la relación (ej: "Esposa", "Hermano", "Secretaria")
- Estos campos ayudan a identificar a quién contactar en cada número

### Campos Opcionales
- Solo `numero` es requerido al crear un teléfono
- Todos los demás campos son opcionales
- Permite captura rápida con información mínima

### Ordenamiento
- Los teléfonos se retornan ordenados por:
  1. Teléfono principal primero (`es_principal DESC`)
  2. ID de teléfono (`telefono_id ASC`)

### Validaciones de Integridad
- El `tipo_telefono_id` debe existir en el catálogo si se proporciona
- No se permite valores negativos en IDs
- El `numero` no puede estar vacío

### Seguridad
- Todas las operaciones CRUD requieren autenticación
- Cada usuario solo puede ver y modificar sus propios teléfonos
- Los catálogos son públicos para facilitar el llenado de formularios

---

## Casos de Uso Comunes

### 1. Perfil de Usuario con Múltiples Contactos
```javascript
// Teléfono personal (principal)
await createPhone({
  numero: '5551234567',
  tipo_telefono_id: 1, // Celular
  nombre_contacto: 'Juan Pérez',
  es_principal: true
});

// Teléfono de trabajo
await createPhone({
  numero: '5559876543',
  tipo_telefono_id: 3, // Trabajo
  nombre_contacto: 'Juan Pérez',
  notas: 'Ext. 105'
});

// Contacto de emergencia
await createPhone({
  numero: '5554445566',
  tipo_telefono_id: 1,
  nombre_contacto: 'María Pérez',
  relacion_contacto: 'Hermana',
  notas: 'Contacto de emergencia'
});
```

### 2. Actualizar Teléfono Principal
```javascript
// Escenario: El usuario cambió de número principal
// Marcar el nuevo número como principal
await updatePhone(newPhoneId, { es_principal: true });

// El teléfono anterior se desmarcará automáticamente
```

### 3. Validar Teléfono Antes de Guardar (Frontend)
```javascript
function validarTelefono(numero) {
  // Remover caracteres no numéricos
  const cleaned = numero.replace(/\D/g, '');
  
  // Validar longitud (10 dígitos para México)
  if (cleaned.length !== 10) {
    return { valid: false, error: 'Debe tener 10 dígitos' };
  }
  
  return { valid: true, cleaned };
}

// Uso
const validation = validarTelefono('(555) 123-4567');
if (validation.valid) {
  await createPhone({ numero: validation.cleaned });
}
```

---

## Códigos de Estado HTTP

| Código | Descripción |
|--------|-------------|
| `200` | OK - Operación exitosa |
| `201` | Created - Teléfono creado exitosamente |
| `400` | Bad Request - Error en validación o nada que actualizar |
| `401` | Unauthorized - No autenticado o token inválido |
| `404` | Not Found - Teléfono no encontrado |
| `500` | Internal Server Error - Error del servidor |

---

**Última actualización**: Enero 2025
