# Rutas de Direcciones (Direction Routes)

Base URL: `/api/directions`

## Descripción General
Estas rutas manejan las operaciones CRUD para direcciones de propietarios, así como el acceso a catálogos geográficos (estados, municipios, colonias) y búsqueda por código postal.

---

## Endpoints de Catálogos (Públicos - No Requieren Autenticación)

### 1. Obtener Tipos de Domicilio
**GET** `/api/directions/tipos`  
**GET** `/api/directions/tipos-domicilio`

Obtiene el catálogo de tipos de domicilio disponibles.

#### Requiere Autenticación
❌ No

#### Response Success (200)
```json
{
  "success": true,
  "data": {
    "tipos_domicilio": [
      {
        "tipo_domicilio_id": "number",
        "nombre": "string"
      }
    ]
  }
}
```

**Ejemplo**: Casa, Departamento, Oficina, etc.

---

### 2. Obtener Estados
**GET** `/api/directions/estados`

Obtiene el catálogo de estados de México.

#### Requiere Autenticación
❌ No

#### Response Success (200)
```json
{
  "success": true,
  "data": [
    {
      "id": "number",
      "nombre": "string"
    }
  ]
}
```

---

### 3. Obtener Municipios por Estado
**GET** `/api/directions/municipios/:estadoId`

Obtiene el catálogo de municipios filtrado por estado.

#### Requiere Autenticación
❌ No

#### URL Parameters
- `estadoId` (number, requerido): ID del estado

#### Response Success (200)
```json
{
  "success": true,
  "data": [
    {
      "id": "number",
      "nombre": "string"
    }
  ]
}
```

---

### 4. Obtener Colonias por Municipio y Código Postal
**GET** `/api/directions/colonias/:municipioId/:cp`

Obtiene colonias específicas de un municipio con un código postal dado.

#### Requiere Autenticación
❌ No

#### URL Parameters
- `municipioId` (number, requerido): ID del municipio
- `cp` (string, requerido): Código postal (5 dígitos)

#### Response Success (200)
```json
{
  "success": true,
  "data": [
    {
      "id": "number",
      "nombre": "string"
    }
  ]
}
```

---

### 5. Buscar por Código Postal
**GET** `/api/directions/codigo-postal/:cp`

Busca información completa (colonias, municipio y estado) por código postal.

#### Requiere Autenticación
❌ No

#### URL Parameters
- `cp` (string, requerido): Código postal (5 dígitos)

#### Response Success (200)
```json
{
  "success": true,
  "data": {
    "colonias": [
      {
        "id": "number",
        "nombre": "string"
      }
    ],
    "municipio": "string",
    "municipio_id": "number",
    "estado": "string",
    "estado_id": "number"
  }
}
```

#### Response Error (404)
```json
{
  "success": false,
  "error": "Código postal no encontrado"
}
```

---

## Endpoints CRUD de Direcciones (Requieren Autenticación)

### 6. Obtener Todas las Direcciones del Usuario
**GET** `/api/directions`

Obtiene todas las direcciones del propietario autenticado.

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
      "direccion_id": "number",
      "propietario_id": "number",
      "tipo_domicilio_id": "number",
      "calle": "string",
      "num_exterior": "string",
      "num_interior": "string",
      "colonia_id": "number",
      "estado_id": "number",
      "municipio_id": "number",
      "codigo_postal": "string",
      "notas": "string",
      "es_predeterminada": "boolean",
      "fecha_inicio": "string (ISO date)",
      "fecha_fin": "string (ISO date)"
    }
  ]
}
```

---

### 7. Obtener Dirección por ID
**GET** `/api/directions/:direccionId`

Obtiene una dirección específica del propietario autenticado.

#### Requiere Autenticación
✅ Sí

#### Headers
```
Authorization: Bearer {token}
```

#### URL Parameters
- `direccionId` (number, requerido): ID de la dirección

#### Response Success (200)
```json
{
  "success": true,
  "data": {
    "direccion_id": "number",
    "propietario_id": "number",
    "tipo_domicilio_id": "number",
    "calle": "string",
    "num_exterior": "string",
    "num_interior": "string",
    "colonia_id": "number",
    "estado_id": "number",
    "municipio_id": "number",
    "codigo_postal": "string",
    "notas": "string",
    "es_predeterminada": "boolean",
    "fecha_inicio": "string (ISO date)",
    "fecha_fin": "string (ISO date)"
  }
}
```

#### Response Error (404)
```json
{
  "success": false,
  "error": "Dirección no encontrada"
}
```

---

### 8. Crear Nueva Dirección
**POST** `/api/directions`

Crea una nueva dirección para el propietario autenticado.

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
  "tipo_domicilio_id": "number (requerido)",
  "calle": "string (opcional)",
  "num_exterior": "string (opcional)",
  "num_interior": "string (opcional)",
  "colonia_id": "number (opcional)",
  "estado_id": "number (opcional)",
  "municipio_id": "number (opcional)",
  "codigo_postal": "string (opcional, 5 dígitos)",
  "notas": "string (opcional)",
  "es_predeterminada": "boolean (opcional, default: false)",
  "fecha_inicio": "string (ISO date, opcional, default: fecha actual)",
  "fecha_fin": "string (ISO date, opcional)"
}
```

#### Validaciones
- `tipo_domicilio_id`: Integer válido (requerido)
- `codigo_postal`: Debe tener exactamente 5 dígitos si se proporciona
- `es_predeterminada`: Si es `true`, se desmarcará como predeterminada cualquier otra dirección
- `fecha_inicio` y `fecha_fin`: Formato ISO 8601 (YYYY-MM-DD)

#### Response Success (201)
```json
{
  "success": true,
  "data": {
    "direccion_id": "number",
    "propietario_id": "number",
    "tipo_domicilio_id": "number",
    "calle": "string",
    "num_exterior": "string",
    "num_interior": "string",
    "colonia_id": "number",
    "estado_id": "number",
    "municipio_id": "number",
    "codigo_postal": "string",
    "notas": "string",
    "es_predeterminada": "boolean",
    "fecha_inicio": "string (ISO date)",
    "fecha_fin": "string (ISO date)"
  }
}
```

---

### 9. Actualizar Dirección
**PUT** `/api/directions/:direccionId`

Actualiza una dirección existente del propietario autenticado.

#### Requiere Autenticación
✅ Sí

#### Headers
```
Authorization: Bearer {token}
Content-Type: application/json
```

#### URL Parameters
- `direccionId` (number, requerido): ID de la dirección a actualizar

#### Request Body
Todos los campos son opcionales. Solo envía los campos que deseas actualizar:

```json
{
  "tipo_domicilio_id": "number (opcional)",
  "calle": "string (opcional)",
  "num_exterior": "string (opcional)",
  "num_interior": "string (opcional)",
  "colonia_id": "number (opcional)",
  "estado_id": "number (opcional)",
  "municipio_id": "number (opcional)",
  "codigo_postal": "string (opcional, 5 dígitos)",
  "notas": "string (opcional)",
  "es_predeterminada": "boolean (opcional)",
  "fecha_inicio": "string (ISO date, opcional)",
  "fecha_fin": "string (ISO date, opcional)"
}
```

#### Response Success (200)
```json
{
  "success": true,
  "data": {
    "direccion_id": "number",
    "propietario_id": "number",
    "tipo_domicilio_id": "number",
    "calle": "string",
    "num_exterior": "string",
    "num_interior": "string",
    "colonia_id": "number",
    "estado_id": "number",
    "municipio_id": "number",
    "codigo_postal": "string",
    "notas": "string",
    "es_predeterminada": "boolean",
    "fecha_inicio": "string (ISO date)",
    "fecha_fin": "string (ISO date)"
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

### 10. Eliminar Dirección
**DELETE** `/api/directions/:direccionId`

Elimina una dirección del propietario autenticado.

#### Requiere Autenticación
✅ Sí

#### Headers
```
Authorization: Bearer {token}
```

#### URL Parameters
- `direccionId` (number, requerido): ID de la dirección a eliminar

#### Response Success (200)
```json
{
  "success": true,
  "message": "Dirección eliminada exitosamente"
}
```

#### Response Error (404)
```json
{
  "success": false,
  "error": "Dirección no encontrada"
}
```

---

## Ejemplos de Uso

### Buscar por Código Postal
```bash
curl http://localhost:3000/api/directions/codigo-postal/01000
```

**Response:**
```json
{
  "success": true,
  "data": {
    "colonias": [
      { "id": 1, "nombre": "San Ángel" },
      { "id": 2, "nombre": "San Ángel Inn" }
    ],
    "municipio": "Álvaro Obregón",
    "municipio_id": 10,
    "estado": "Ciudad de México",
    "estado_id": 9
  }
}
```

### Crear una Dirección
```javascript
const response = await fetch('http://localhost:3000/api/directions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    tipo_domicilio_id: 1,
    calle: 'Avenida Insurgentes Sur',
    num_exterior: '1234',
    num_interior: 'Depto 5',
    codigo_postal: '01000',
    colonia_id: 1,
    estado_id: 9,
    municipio_id: 10,
    es_predeterminada: true,
    notas: 'Cerca del metro'
  })
});

const data = await response.json();
```

### Actualizar Dirección Predeterminada
```javascript
const response = await fetch('http://localhost:3000/api/directions/123', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    es_predeterminada: true
  })
});
```

### Obtener Municipios de un Estado
```javascript
const response = await fetch('http://localhost:3000/api/directions/municipios/9');
const data = await response.json();
// Devuelve todos los municipios de CDMX (estado_id = 9)
```

---

## Flujo de Trabajo Típico para Captura de Dirección

### Opción 1: Búsqueda por Código Postal (Recomendado)

```javascript
// 1. Usuario ingresa código postal
const cp = '01000';

// 2. Buscar información del código postal
const cpInfo = await fetch(`/api/directions/codigo-postal/${cp}`);
const cpData = await cpInfo.json();

// 3. Mostrar colonias, municipio y estado encontrados
console.log(cpData.data.colonias);      // Lista de colonias para seleccionar
console.log(cpData.data.municipio);     // Nombre del municipio (auto-completado)
console.log(cpData.data.estado);        // Nombre del estado (auto-completado)

// 4. Usuario selecciona colonia y completa calle/número
// 5. Crear dirección con los datos
const direccion = await fetch('/api/directions', {
  method: 'POST',
  body: JSON.stringify({
    tipo_domicilio_id: 1,
    calle: 'Insurgentes Sur',
    num_exterior: '1234',
    codigo_postal: cp,
    colonia_id: cpData.data.colonias[0].id,
    municipio_id: cpData.data.municipio_id,
    estado_id: cpData.data.estado_id,
    es_predeterminada: true
  })
});
```

### Opción 2: Selección Manual (Cascada)

```javascript
// 1. Obtener estados
const estados = await fetch('/api/directions/estados');

// 2. Usuario selecciona estado → Obtener municipios
const municipios = await fetch(`/api/directions/municipios/${estadoId}`);

// 3. Usuario ingresa código postal y selecciona municipio → Obtener colonias
const colonias = await fetch(`/api/directions/colonias/${municipioId}/${cp}`);

// 4. Usuario selecciona colonia y completa dirección
// 5. Crear dirección
```

---

## Diccionario de Campos

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `direccion_id` | number | Identificador único de la dirección |
| `propietario_id` | number | ID del propietario (asignado automáticamente) |
| `tipo_domicilio_id` | number | Tipo de domicilio (Casa, Depto, Oficina, etc.) |
| `calle` | string | Nombre de la calle |
| `num_exterior` | string | Número exterior |
| `num_interior` | string | Número interior, departamento o local |
| `colonia_id` | number | ID de la colonia |
| `estado_id` | number | ID del estado |
| `municipio_id` | number | ID del municipio o delegación |
| `codigo_postal` | string | Código postal (5 dígitos) |
| `notas` | string | Notas adicionales o referencias para ubicar |
| `es_predeterminada` | boolean | Indica si es la dirección principal del usuario |
| `fecha_inicio` | date | Fecha desde la que reside en esta dirección |
| `fecha_fin` | date | Fecha hasta la que residió (null si es actual) |

---

## Notas Importantes

### Dirección Predeterminada
- Solo puede haber **una dirección predeterminada** por propietario
- Al marcar una dirección como predeterminada, automáticamente se desmarca la anterior
- Útil para identificar la dirección principal o actual del usuario

### Código Postal
- Debe tener exactamente **5 dígitos** en el frontend
- **El backend normaliza automáticamente**: Los leading zeros (ceros a la izquierda) se eliminan antes de guardar en la base de datos
- Ejemplos de normalización:
  - `"01000"` → se guarda como `"1000"`
  - `"00123"` → se guarda como `"123"`
  - `"12345"` → se guarda como `"12345"`
- Esto es transparente para el usuario: puedes enviar `"01000"` y funcionará correctamente
- La búsqueda por código postal también normaliza automáticamente: buscar por `"01000"` encontrará registros guardados como `"1000"`

### Campos Opcionales
- Solo `tipo_domicilio_id` es requerido al crear una dirección
- Todos los demás campos son opcionales
- Permite capturar direcciones con información incompleta

### Jerarquía Geográfica
```
Estado
  └── Municipio/Delegación
       └── Colonia
            └── Código Postal (5 dígitos)
```

### Validaciones de Integridad
- Los IDs de catálogos (tipo_domicilio_id, colonia_id, etc.) deben existir
- El código postal debe corresponder a colonias existentes
- La relación colonia → municipio → estado debe ser coherente

### Fechas de Residencia
- `fecha_inicio`: Útil para historial de domicilios
- `fecha_fin`: `null` indica que es la dirección actual
- Permite mantener un registro temporal de cambios de domicilio

### Seguridad
- Todas las operaciones CRUD requieren autenticación
- Cada usuario solo puede ver y modificar sus propias direcciones
- Los catálogos son públicos para facilitar el llenado de formularios

---

## Códigos de Estado HTTP

| Código | Descripción |
|--------|-------------|
| `200` | OK - Operación exitosa |
| `201` | Created - Dirección creada exitosamente |
| `400` | Bad Request - Error en validación o nada que actualizar |
| `401` | Unauthorized - No autenticado o token inválido |
| `404` | Not Found - Dirección o código postal no encontrado |
| `500` | Internal Server Error - Error del servidor |

---

**Última actualización**: Enero 2025
