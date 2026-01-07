# API de Reservaciones

## Endpoints

### CRUD de Reservaciones

#### 1. Obtener todas las reservaciones del propietario
```http
GET /api/reservaciones
Authorization: Bearer token
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": [
    {
      "reservacion_id": 1,
      "mascota_id": 5,
      "habitacion_id": 2,
      "fecha_reservacion": "2025-01-05T10:30:00Z",
      "fecha_inicio": "2025-01-10",
      "fecha_fin": "2025-01-15",
      "estado_id": 1,
      "monto_total_hospedaje": 2500.00,
      "notas_especiales": "La mascota necesita comida especial",
      "mascota_nombre": "Max",
      "habitacion_nombre": "Suite A1",
      "estado_nombre": "Confirmada",
      "propietario_id": 10
    }
  ]
}
```

---

#### 2. Obtener reservación por ID
```http
GET /api/reservaciones/:id
Authorization: Bearer token
```

**Parámetros:**
- `id`: ID de la reservación (número entero)

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "reservacion_id": 1,
    "mascota_id": 5,
    "habitacion_id": 2,
    "fecha_reservacion": "2025-01-05T10:30:00Z",
    "fecha_inicio": "2025-01-10",
    "fecha_fin": "2025-01-15",
    "estado_id": 1,
    "monto_total_hospedaje": 2500.00,
    "notas_especiales": "La mascota necesita comida especial",
    "mascota_nombre": "Max",
    "habitacion_nombre": "Suite A1",
    "estado_nombre": "Confirmada",
    "propietario_id": 10,
    "servicios": [
      {
        "reservacion_servicio_id": 1,
        "reservacion_id": 1,
        "servicio_id": 3,
        "cantidad": 2,
        "precio_al_momento": 150.00,
        "servicio_nombre": "Baño",
        "servicio_descripcion": "Baño completo con champú especial"
      }
    ]
  }
}
```

**Respuestas de error:**
- `404`: Reservación no encontrada
- `403`: No autorizado

---

#### 3. Crear nueva reservación
```http
POST /api/reservaciones
Authorization: Bearer token
Content-Type: application/json
```

**Body:**
```json
{
  "mascota_id": 5,
  "habitacion_id": 2,
  "fecha_inicio": "2025-01-10",
  "fecha_fin": "2025-01-15",
  "estado_id": 1,
  "monto_total_hospedaje": 2500.00,
  "notas_especiales": "La mascota necesita comida especial"
}
```

**Campos requeridos:**
- `mascota_id` (integer): ID de la mascota
- `habitacion_id` (integer): ID de la habitación
- `fecha_inicio` (date ISO8601): Fecha de inicio de la reservación
- `fecha_fin` (date ISO8601): Fecha de fin de la reservación (debe ser posterior a fecha_inicio)

**Campos opcionales:**
- `estado_id` (integer): Estado de la reservación (default: 1)
- `monto_total_hospedaje` (decimal): Monto total del hospedaje
- `notas_especiales` (string): Notas adicionales

**Respuesta exitosa (201):**
```json
{
  "success": true,
  "data": {
    "reservacion_id": 1,
    "mascota_id": 5,
    "habitacion_id": 2,
    "fecha_reservacion": "2025-01-05T10:30:00Z",
    "fecha_inicio": "2025-01-10",
    "fecha_fin": "2025-01-15",
    "estado_id": 1,
    "monto_total_hospedaje": 2500.00,
    "notas_especiales": "La mascota necesita comida especial"
  }
}
```

**Respuestas de error:**
- `400`: Validación fallida, habitación no disponible, o no autorizado para la mascota

---

#### 4. Actualizar reservación
```http
PUT /api/reservaciones/:id
Authorization: Bearer token
Content-Type: application/json
```

**Parámetros:**
- `id`: ID de la reservación (número entero)

**Body (todos los campos son opcionales):**
```json
{
  "habitacion_id": 3,
  "fecha_inicio": "2025-01-12",
  "fecha_fin": "2025-01-17",
  "estado_id": 2,
  "monto_total_hospedaje": 3000.00,
  "notas_especiales": "Actualización de notas"
}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "reservacion_id": 1,
    "mascota_id": 5,
    "habitacion_id": 3,
    "fecha_reservacion": "2025-01-05T10:30:00Z",
    "fecha_inicio": "2025-01-12",
    "fecha_fin": "2025-01-17",
    "estado_id": 2,
    "monto_total_hospedaje": 3000.00,
    "notas_especiales": "Actualización de notas"
  }
}
```

**Respuestas de error:**
- `403`: No autorizado
- `400`: Habitación no disponible para las nuevas fechas

---

#### 5. Eliminar reservación
```http
DELETE /api/reservaciones/:id
Authorization: Bearer token
```

**Parámetros:**
- `id`: ID de la reservación (número entero)

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Reservación eliminada"
}
```

**Respuestas de error:**
- `403`: No autorizado

---

### Gestión de Servicios de Reservación

#### 6. Agregar servicio a reservación
```http
POST /api/reservaciones/:id/servicios
Authorization: Bearer token
Content-Type: application/json
```

**Parámetros:**
- `id`: ID de la reservación (número entero)

**Body:**
```json
{
  "servicio_id": 3,
  "cantidad": 2,
  "precio_al_momento": 150.00
}
```

**Campos requeridos:**
- `servicio_id` (integer): ID del servicio
- `precio_al_momento` (decimal): Precio unitario del servicio al momento de la reservación

**Campos opcionales:**
- `cantidad` (integer): Cantidad del servicio (default: 1)

**Respuesta exitosa (201):**
```json
{
  "success": true,
  "data": {
    "reservacion_servicio_id": 1,
    "reservacion_id": 1,
    "servicio_id": 3,
    "cantidad": 2,
    "precio_al_momento": 150.00
  }
}
```

**Respuestas de error:**
- `403`: No autorizado

---

#### 7. Eliminar servicio de reservación
```http
DELETE /api/reservaciones/:id/servicios/:servicioId
Authorization: Bearer token
```

**Parámetros:**
- `id`: ID de la reservación (número entero)
- `servicioId`: ID del servicio en la reservación (número entero)

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Servicio eliminado de la reservación"
}
```

**Respuestas de error:**
- `403`: No autorizado

---

### Catálogos (Endpoints Públicos)

#### 8. Obtener estados de reservación
```http
GET /api/reservaciones/catalogs/estados
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "estados": [
      {
        "estado_id": 1,
        "nombre": "Pendiente"
      },
      {
        "estado_id": 2,
        "nombre": "Confirmada"
      },
      {
        "estado_id": 3,
        "nombre": "Cancelada"
      },
      {
        "estado_id": 4,
        "nombre": "Completada"
      }
    ]
  }
}
```

---

#### 9. Obtener habitaciones disponibles
```http
GET /api/reservaciones/catalogs/habitaciones
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "habitaciones": [
      {
        "habitacion_id": 1,
        "nombre_numero": "Suite A1",
        "descripcion": "Habitación amplia con vista al jardín",
        "capacidad_kg": 25.00,
        "max_altura": 60.00,
        "max_largo": 80.00,
        "precio_noche": 500.00,
        "activa": true,
        "especie_id": 1,
        "especie_nombre": "Perro"
      }
    ]
  }
}
```

---

#### 10. Obtener servicios disponibles
```http
GET /api/reservaciones/catalogs/servicios
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "servicios": [
      {
        "servicio_id": 1,
        "nombre": "Baño",
        "descripcion": "Baño completo con champú especial",
        "precio_unitario": 150.00
      },
      {
        "servicio_id": 2,
        "nombre": "Paseo",
        "descripcion": "Paseo por el parque de 30 minutos",
        "precio_unitario": 80.00
      },
      {
        "servicio_id": 3,
        "nombre": "Veterinario",
        "descripcion": "Consulta veterinaria básica",
        "precio_unitario": 300.00
      }
    ]
  }
}
```

---

## Validaciones

### Creación de Reservación
- `mascota_id`: Requerido, entero
- `habitacion_id`: Requerido, entero
- `fecha_inicio`: Requerido, formato ISO8601
- `fecha_fin`: Requerido, formato ISO8601, debe ser posterior a `fecha_inicio`
- `estado_id`: Opcional, entero
- `monto_total_hospedaje`: Opcional, número decimal positivo
- `notas_especiales`: Opcional, texto

### Actualización de Reservación
- Todos los campos son opcionales
- Si se proporcionan `fecha_inicio` y `fecha_fin`, `fecha_fin` debe ser posterior

### Agregar Servicio
- `servicio_id`: Requerido, entero
- `cantidad`: Opcional, entero positivo (mínimo 1)
- `precio_al_momento`: Requerido, número decimal positivo

---

## Lógica de Negocio

### Verificación de Disponibilidad
Al crear o actualizar una reservación con cambio de habitación o fechas, el sistema verifica automáticamente:

1. La habitación no tiene reservaciones activas (no canceladas) en el mismo período
2. Se considera conflicto si:
   - La fecha de inicio de la nueva reservación cae dentro de una reservación existente
   - La fecha de fin de la nueva reservación cae dentro de una reservación existente
   - La nueva reservación engloba completamente una reservación existente

### Control de Acceso
- Todas las operaciones CRUD requieren autenticación
- Los propietarios solo pueden gestionar reservaciones de sus propias mascotas
- Los catálogos son públicos y no requieren autenticación

### Estados de Reservación
Los estados típicos son:
- `1`: Pendiente
- `2`: Confirmada
- `3`: Cancelada (las canceladas no bloquean disponibilidad)
- `4`: Completada

---

## Ejemplos de Uso

### Crear una reservación completa con servicios

**Paso 1: Crear la reservación**
```bash
curl -X POST http://localhost:3000/api/reservaciones \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "mascota_id": 5,
    "habitacion_id": 2,
    "fecha_inicio": "2025-01-10",
    "fecha_fin": "2025-01-15",
    "monto_total_hospedaje": 2500.00,
    "notas_especiales": "La mascota necesita comida especial"
  }'
```

**Paso 2: Agregar servicios**
```bash
# Agregar baño
curl -X POST http://localhost:3000/api/reservaciones/1/servicios \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "servicio_id": 1,
    "cantidad": 2,
    "precio_al_momento": 150.00
  }'

# Agregar paseo diario
curl -X POST http://localhost:3000/api/reservaciones/1/servicios \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "servicio_id": 2,
    "cantidad": 5,
    "precio_al_momento": 80.00
  }'
```

### Consultar reservaciones del propietario
```bash
curl -X GET http://localhost:3000/api/reservaciones \
  -H "Authorization: Bearer <token>"
```

### Actualizar estado a confirmada
```bash
curl -X PUT http://localhost:3000/api/reservaciones/1 \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "estado_id": 2
  }'
```

---

## Notas Adicionales

- Las fechas deben estar en formato ISO8601 (YYYY-MM-DD)
- Los montos son en formato decimal con hasta 2 decimales
- La fecha de reservación se establece automáticamente al crear
- Al eliminar una reservación, también se eliminan sus servicios asociados (CASCADE)
