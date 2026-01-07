# Rutas de Servicios (Servicio Routes)

Base URL: `/api/servicios`

## Descripción General
Estas rutas manejan el catálogo de servicios adicionales disponibles en el hotel para perros. Permiten gestionar servicios como baño, corte de pelo, paseos, entrenamiento, etc., que pueden ser agregados a las reservaciones.

---

## Endpoints CRUD

### 1. Obtener Todos los Servicios
**GET** `/api/servicios`

Obtiene la lista completa de servicios disponibles en el hotel, ordenados alfabéticamente por nombre.

#### Requiere Autenticación
❌ No (Público)

#### Response Success (200)
```json
{
  "success": true,
  "data": [
    {
      "servicio_id": 1,
      "nombre": "Baño completo",
      "descripcion": "Baño con shampoo especial, secado y cepillado",
      "precio_unitario": 350.00
    },
    {
      "servicio_id": 2,
      "nombre": "Corte de pelo",
      "descripcion": "Corte de pelo profesional según raza",
      "precio_unitario": 450.00
    },
    {
      "servicio_id": 3,
      "nombre": "Paseo en el parque",
      "descripcion": "Paseo de 30 minutos en área verde",
      "precio_unitario": 150.00
    }
  ]
}
```

---

### 2. Obtener Servicio Específico
**GET** `/api/servicios/:servicioId`

Obtiene los detalles de un servicio específico por su ID.

#### Requiere Autenticación
❌ No (Público)

#### URL Parameters
- `servicioId` (number, requerido): ID del servicio

#### Response Success (200)
```json
{
  "success": true,
  "data": {
    "servicio_id": 1,
    "nombre": "Baño completo",
    "descripcion": "Baño con shampoo especial, secado y cepillado",
    "precio_unitario": 350.00
  }
}
```

#### Response Error (404)
```json
{
  "success": false,
  "error": "Servicio no encontrado"
}
```

---

### 3. Crear Nuevo Servicio
**POST** `/api/servicios`

Crea un nuevo servicio en el catálogo del hotel.

#### Requiere Autenticación
✅ Sí (Solo administradores)

#### Headers
```
Authorization: Bearer {token}
Content-Type: application/json
```

#### Request Body
```json
{
  "nombre": "Entrenamiento básico",
  "descripcion": "Sesión de 1 hora de entrenamiento básico de obediencia",
  "precio_unitario": 500.00
}
```

#### Campos del Request Body

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `nombre` | string (max 100) | **Sí** | Nombre del servicio |
| `descripcion` | string (max 500) | Opcional | Descripción detallada del servicio |
| `precio_unitario` | number (decimal 10,2) | **Sí** | Precio por unidad del servicio |

#### Validaciones
- `nombre`: **Requerido**, entre 1 y 100 caracteres
- `descripcion`: Opcional, máximo 500 caracteres
- `precio_unitario`: **Requerido**, número mayor o igual a 0, máximo 2 decimales

#### Response Success (201)
```json
{
  "success": true,
  "data": {
    "servicio_id": 4,
    "nombre": "Entrenamiento básico",
    "descripcion": "Sesión de 1 hora de entrenamiento básico de obediencia",
    "precio_unitario": 500.00
  },
  "message": "Servicio creado exitosamente"
}
```

#### Response Error (400)
```json
{
  "success": false,
  "errors": [
    {
      "field": "nombre",
      "message": "El nombre del servicio es requerido"
    }
  ]
}
```

---

### 4. Actualizar Servicio
**PUT** `/api/servicios/:servicioId`

Actualiza la información de un servicio existente.

#### Requiere Autenticación
✅ Sí (Solo administradores)

#### Headers
```
Authorization: Bearer {token}
Content-Type: application/json
```

#### URL Parameters
- `servicioId` (number, requerido): ID del servicio a actualizar

#### Request Body
Todos los campos son opcionales. Solo envía los campos que deseas actualizar:

```json
{
  "precio_unitario": 550.00,
  "descripcion": "Sesión de 1 hora de entrenamiento básico de obediencia. Incluye manual"
}
```

#### Response Success (200)
```json
{
  "success": true,
  "data": {
    "servicio_id": 4,
    "nombre": "Entrenamiento básico",
    "descripcion": "Sesión de 1 hora de entrenamiento básico de obediencia. Incluye manual",
    "precio_unitario": 550.00
  },
  "message": "Servicio actualizado exitosamente"
}
```

#### Response Error (404)
```json
{
  "success": false,
  "error": "Servicio no encontrado o nada que actualizar"
}
```

---

### 5. Eliminar Servicio
**DELETE** `/api/servicios/:servicioId`

Elimina un servicio del catálogo.

#### Requiere Autenticación
✅ Sí (Solo administradores)

#### Headers
```
Authorization: Bearer {token}
```

#### URL Parameters
- `servicioId` (number, requerido): ID del servicio a eliminar

#### Response Success (200)
```json
{
  "success": true,
  "message": "Servicio eliminado exitosamente"
}
```

#### Response Error (404)
```json
{
  "success": false,
  "error": "Servicio no encontrado"
}
```

#### Response Error (409)
```json
{
  "success": false,
  "error": "No se puede eliminar el servicio porque está siendo usado en reservaciones"
}
```

#### Notas sobre Eliminación
- No se puede eliminar un servicio que esté siendo usado en reservaciones activas
- El sistema verifica automáticamente las referencias en `reservaciones_servicios`
- Error 409 (Conflict) cuando el servicio está en uso

---

## Ejemplos de Uso

### Obtener Lista de Servicios (Frontend - Pública)
```javascript
const response = await fetch('http://localhost:4000/api/servicios');
const data = await response.json();

console.log('Servicios disponibles:', data.data);
```

### Crear Servicio de Spa
```javascript
const response = await fetch('http://localhost:4000/api/servicios', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${adminToken}`
  },
  credentials: 'include',
  body: JSON.stringify({
    nombre: 'Spa canino',
    descripcion: 'Tratamiento completo: baño, masaje, aromaterapia y corte de uñas',
    precio_unitario: 850.00
  })
});

const data = await response.json();
```

### Actualizar Precio
```javascript
const response = await fetch('http://localhost:4000/api/servicios/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${adminToken}`
  },
  credentials: 'include',
  body: JSON.stringify({
    precio_unitario: 380.00
  })
});
```

### Consultar Servicio Específico
```bash
curl http://localhost:4000/api/servicios/1
```

### Eliminar Servicio
```javascript
const response = await fetch('http://localhost:4000/api/servicios/3', {
  method: 'DELETE',
  headers: {
    'Authorization': `Bearer ${adminToken}`
  },
  credentials: 'include'
});

if (response.status === 409) {
  console.error('El servicio está en uso y no puede eliminarse');
}
```

---

## Diccionario de Campos

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `servicio_id` | number | Identificador único del servicio |
| `nombre` | string | Nombre del servicio (máx 100 caracteres) |
| `descripcion` | string | Descripción detallada del servicio (máx 500 caracteres) |
| `precio_unitario` | decimal | Precio por unidad/sesión (formato: 10,2) |

---

## Notas Importantes

### Campos Requeridos
Al crear un servicio:
- **`nombre`**: Obligatorio
- **`precio_unitario`**: Obligatorio
- `descripcion`: Opcional

### Precios
- Formato: Número decimal con máximo 2 decimales
- Mínimo: 0.00 (servicios gratuitos permitidos)
- Máximo: 99,999,999.99 (límite de la base de datos)
- Ejemplos válidos: `350.00`, `1250.50`, `0.00`

### Ordenamiento
- Los servicios siempre se retornan ordenados alfabéticamente por nombre
- Facilita la presentación en menús y listas

### Relación con Reservaciones
- Los servicios se vinculan a reservaciones mediante la tabla `reservaciones_servicios`
- Al agregar un servicio a una reservación, se guarda el `precio_al_momento`
- Esto permite mantener histórico de precios aunque el servicio se actualice

### Protección de Datos
- No se pueden eliminar servicios que tengan reservaciones asociadas
- Error 409 (Conflict) indica uso activo del servicio
- Considera desactivar servicios en lugar de eliminarlos (implementación futura)

### Actualización Parcial
- El endpoint PUT permite actualizaciones parciales
- Solo envía los campos que deseas modificar
- Los campos no enviados conservan su valor actual

### Permisos
- Lectura (GET): Público - no requiere autenticación
- Escritura (POST/PUT/DELETE): Requiere autenticación y rol de administrador

---

## Códigos de Estado HTTP

| Código | Descripción |
|--------|-------------|
| `200` | OK - Operación exitosa |
| `201` | Created - Servicio creado exitosamente |
| `400` | Bad Request - Error de validación |
| `401` | Unauthorized - No autenticado |
| `403` | Forbidden - Sin permisos de administrador |
| `404` | Not Found - Servicio no encontrado |
| `409` | Conflict - Servicio en uso, no puede eliminarse |
| `500` | Internal Server Error - Error del servidor |

---

## Casos de Uso Comunes

### Catálogo de Servicios Básicos
```json
[
  {
    "nombre": "Hospedaje día completo",
    "precio_unitario": 250.00
  },
  {
    "nombre": "Baño completo",
    "descripcion": "Baño con shampoo especial, secado y cepillado",
    "precio_unitario": 350.00
  },
  {
    "nombre": "Corte de pelo",
    "precio_unitario": 450.00
  }
]
```

### Servicios Premium
```json
{
  "nombre": "Spa Premium",
  "descripcion": "Tratamiento completo: baño con productos premium, masaje relajante, aromaterapia, corte de uñas, limpieza de oídos y cepillado de dientes",
  "precio_unitario": 1200.00
}
```

### Servicio Gratuito
```json
{
  "nombre": "Revisión de bienvenida",
  "descripcion": "Revisión inicial gratuita al ingresar al hotel",
  "precio_unitario": 0.00
}
```

### Actualización de Temporada
```json
{
  "descripcion": "Promoción de verano: baño completo + corte de pelo junior",
  "precio_unitario": 650.00
}
```

---

