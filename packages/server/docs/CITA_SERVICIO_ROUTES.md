# API de Citas de Servicios

## Descripción
Las citas de servicios son programaciones específicas para servicios que se realizarán durante una reservación (veterinario, peluquería, paseos, etc.). Cada cita se asocia a una reservación, un servicio y opcionalmente a un empleado.

---

## Endpoints

### CRUD de Citas de Servicios

#### 1. Obtener todas las citas del propietario
```http
GET /api/citas-servicios
Authorization: Bearer token
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": [
    {
      "cita_id": 1,
      "reservacion_id": 5,
      "servicio_id": 3,
      "empleado_id": 1,
      "fecha_hora_inicio": "2025-01-15T10:00:00Z",
      "fecha_hora_fin": "2025-01-15T11:00:00Z",
      "notas": "Consulta de rutina",
      "reservacion_fecha_inicio": "2025-01-10",
      "reservacion_fecha_fin": "2025-01-20",
      "mascota_id": 5,
      "mascota_nombre": "Max",
      "servicio_nombre": "Consulta Veterinaria",
      "servicio_descripcion": "Consulta médica general",
      "empleado_nombre": "Dr. Carlos Méndez",
      "empleado_especialidad": "Veterinario",
      "propietario_id": 10
    }
  ]
}
```

---

#### 2. Obtener cita por ID
```http
GET /api/citas-servicios/:id
Authorization: Bearer token
```

**Parámetros:**
- `id`: ID de la cita (número entero)

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "cita_id": 1,
    "reservacion_id": 5,
    "servicio_id": 3,
    "empleado_id": 1,
    "fecha_hora_inicio": "2025-01-15T10:00:00Z",
    "fecha_hora_fin": "2025-01-15T11:00:00Z",
    "notas": "Consulta de rutina",
    "reservacion_fecha_inicio": "2025-01-10",
    "reservacion_fecha_fin": "2025-01-20",
    "mascota_id": 5,
    "mascota_nombre": "Max",
    "servicio_nombre": "Consulta Veterinaria",
    "servicio_descripcion": "Consulta médica general",
    "empleado_nombre": "Dr. Carlos Méndez",
    "empleado_especialidad": "Veterinario",
    "propietario_id": 10
  }
}
```

**Respuestas de error:**
- `404`: Cita no encontrada
- `403`: No autorizado

---

#### 3. Crear nueva cita de servicio
```http
POST /api/citas-servicios
Authorization: Bearer token
Content-Type: application/json
```

**Body:**
```json
{
  "reservacion_id": 5,
  "servicio_id": 3,
  "empleado_id": 1,
  "fecha_hora_inicio": "2025-01-15T10:00:00Z",
  "fecha_hora_fin": "2025-01-15T11:00:00Z",
  "notas": "Consulta de rutina"
}
```

**Campos requeridos:**
- `reservacion_id` (integer): ID de la reservación
- `servicio_id` (integer): ID del servicio a realizar
- `fecha_hora_inicio` (datetime ISO8601): Fecha y hora de inicio
- `fecha_hora_fin` (datetime ISO8601): Fecha y hora de fin (debe ser posterior a inicio)

**Campos opcionales:**
- `empleado_id` (integer): ID del empleado asignado
- `notas` (string): Notas adicionales (máximo 500 caracteres)

**Respuesta exitosa (201):**
```json
{
  "success": true,
  "data": {
    "cita_id": 1,
    "reservacion_id": 5,
    "servicio_id": 3,
    "empleado_id": 1,
    "fecha_hora_inicio": "2025-01-15T10:00:00Z",
    "fecha_hora_fin": "2025-01-15T11:00:00Z",
    "notas": "Consulta de rutina"
  }
}
```

**Respuestas de error:**
- `400`: Validación fallida, empleado no disponible, o fechas inválidas
- `403`: No autorizado para la reservación

---

#### 4. Actualizar cita de servicio
```http
PUT /api/citas-servicios/:id
Authorization: Bearer token
Content-Type: application/json
```

**Parámetros:**
- `id`: ID de la cita (número entero)

**Body (todos los campos son opcionales):**
```json
{
  "empleado_id": 2,
  "fecha_hora_inicio": "2025-01-15T14:00:00Z",
  "fecha_hora_fin": "2025-01-15T15:00:00Z",
  "notas": "Actualización: chequeo preventivo"
}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "cita_id": 1,
    "reservacion_id": 5,
    "servicio_id": 3,
    "empleado_id": 2,
    "fecha_hora_inicio": "2025-01-15T14:00:00Z",
    "fecha_hora_fin": "2025-01-15T15:00:00Z",
    "notas": "Actualización: chequeo preventivo"
  }
}
```

**Respuestas de error:**
- `403`: No autorizado
- `400`: Empleado no disponible o fechas inválidas

---

#### 5. Eliminar cita de servicio
```http
DELETE /api/citas-servicios/:id
Authorization: Bearer token
```

**Parámetros:**
- `id`: ID de la cita (número entero)

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Cita eliminada"
}
```

**Respuestas de error:**
- `403`: No autorizado

---

### Consultas Especializadas

#### 6. Obtener citas por reservación
```http
GET /api/citas-servicios/by-reservacion/:reservacionId
Authorization: Bearer token
```

**Parámetros:**
- `reservacionId`: ID de la reservación (número entero)

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": [
    {
      "cita_id": 1,
      "reservacion_id": 5,
      "servicio_id": 3,
      "empleado_id": 1,
      "fecha_hora_inicio": "2025-01-15T10:00:00Z",
      "fecha_hora_fin": "2025-01-15T11:00:00Z",
      "notas": "Consulta de rutina",
      "servicio_nombre": "Consulta Veterinaria",
      "servicio_descripcion": "Consulta médica general",
      "empleado_nombre": "Dr. Carlos Méndez",
      "empleado_especialidad": "Veterinario"
    },
    {
      "cita_id": 2,
      "reservacion_id": 5,
      "servicio_id": 1,
      "empleado_id": 3,
      "fecha_hora_inicio": "2025-01-16T09:00:00Z",
      "fecha_hora_fin": "2025-01-16T10:00:00Z",
      "notas": null,
      "servicio_nombre": "Baño",
      "servicio_descripcion": "Baño completo con champú especial",
      "empleado_nombre": "Ana García",
      "empleado_especialidad": "Peluquería Canina"
    }
  ]
}
```

**Respuestas de error:**
- `403`: No autorizado

---

#### 7. Obtener citas por empleado
```http
GET /api/citas-servicios/by-empleado/:empleadoId
Authorization: Bearer token
```

**Parámetros:**
- `empleadoId`: ID del empleado (número entero)

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": [
    {
      "cita_id": 1,
      "reservacion_id": 5,
      "servicio_id": 3,
      "empleado_id": 1,
      "fecha_hora_inicio": "2025-01-15T10:00:00Z",
      "fecha_hora_fin": "2025-01-15T11:00:00Z",
      "notas": "Consulta de rutina",
      "reservacion_fecha_inicio": "2025-01-10",
      "reservacion_fecha_fin": "2025-01-20",
      "mascota_id": 5,
      "mascota_nombre": "Max",
      "servicio_nombre": "Consulta Veterinaria",
      "servicio_descripcion": "Consulta médica general"
    }
  ]
}
```

---

#### 8. Obtener citas por rango de fechas
```http
GET /api/citas-servicios/by-date-range?fechaInicio=2025-01-10T00:00:00Z&fechaFin=2025-01-20T23:59:59Z
Authorization: Bearer token
```

**Query Parameters:**
- `fechaInicio` (datetime ISO8601, requerido): Fecha y hora de inicio del rango
- `fechaFin` (datetime ISO8601, requerido): Fecha y hora de fin del rango

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": [
    {
      "cita_id": 1,
      "reservacion_id": 5,
      "servicio_id": 3,
      "empleado_id": 1,
      "fecha_hora_inicio": "2025-01-15T10:00:00Z",
      "fecha_hora_fin": "2025-01-15T11:00:00Z",
      "notas": "Consulta de rutina",
      "mascota_nombre": "Max",
      "servicio_nombre": "Consulta Veterinaria",
      "empleado_nombre": "Dr. Carlos Méndez",
      "empleado_especialidad": "Veterinario"
    },
    {
      "cita_id": 3,
      "reservacion_id": 7,
      "servicio_id": 1,
      "empleado_id": 3,
      "fecha_hora_inicio": "2025-01-16T09:00:00Z",
      "fecha_hora_fin": "2025-01-16T10:00:00Z",
      "notas": null,
      "mascota_nombre": "Luna",
      "servicio_nombre": "Baño",
      "empleado_nombre": "Ana García",
      "empleado_especialidad": "Peluquería Canina"
    }
  ]
}
```

**Respuestas de error:**
- `400`: Fechas inválidas o fecha fin no posterior a inicio

---

## Validaciones

### Creación de Cita
- `reservacion_id`: Requerido, entero
- `servicio_id`: Requerido, entero
- `empleado_id`: Opcional, entero
- `fecha_hora_inicio`: Requerido, formato ISO8601
- `fecha_hora_fin`: Requerido, formato ISO8601, debe ser posterior a inicio
- `notas`: Opcional, máximo 500 caracteres

### Actualización de Cita
- Todos los campos opcionales
- Si se actualizan fechas, fecha_hora_fin debe ser posterior a inicio
- Validación de disponibilidad de empleado si se cambia

---

## Lógica de Negocio

### Verificación de Disponibilidad de Empleado
Al crear o actualizar una cita con empleado asignado, el sistema verifica automáticamente:
1. El empleado no tiene citas conflictivas en el mismo horario
2. Se considera conflicto si:
   - La hora de inicio de la nueva cita cae dentro de una cita existente
   - La hora de fin de la nueva cita cae dentro de una cita existente
   - La nueva cita engloba completamente una cita existente

### Control de Acceso
- Todas las operaciones CRUD requieren autenticación
- Los propietarios solo pueden gestionar citas de sus propias reservaciones
- Las consultas por empleado y rango de fechas son accesibles para usuarios autenticados

### Validaciones Temporales
- `fecha_hora_fin` siempre debe ser posterior a `fecha_hora_inicio`
- Las fechas deben estar en formato ISO8601 con timezone

---

## Ejemplos de Uso

### Crear una cita veterinaria
```bash
curl -X POST http://localhost:3000/api/citas-servicios \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "reservacion_id": 5,
    "servicio_id": 3,
    "empleado_id": 1,
    "fecha_hora_inicio": "2025-01-15T10:00:00Z",
    "fecha_hora_fin": "2025-01-15T11:00:00Z",
    "notas": "Consulta de rutina"
  }'
```

### Crear cita sin empleado asignado
```bash
curl -X POST http://localhost:3000/api/citas-servicios \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "reservacion_id": 5,
    "servicio_id": 2,
    "fecha_hora_inicio": "2025-01-16T14:00:00Z",
    "fecha_hora_fin": "2025-01-16T14:30:00Z"
  }'
```

### Reasignar empleado
```bash
curl -X PUT http://localhost:3000/api/citas-servicios/1 \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "empleado_id": 2
  }'
```

### Reprogramar cita
```bash
curl -X PUT http://localhost:3000/api/citas-servicios/1 \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "fecha_hora_inicio": "2025-01-17T10:00:00Z",
    "fecha_hora_fin": "2025-01-17T11:00:00Z"
  }'
```

### Ver todas las citas de una reservación
```bash
curl -X GET http://localhost:3000/api/citas-servicios/by-reservacion/5 \
  -H "Authorization: Bearer <token>"
```

### Ver agenda de un empleado
```bash
curl -X GET http://localhost:3000/api/citas-servicios/by-empleado/1 \
  -H "Authorization: Bearer <token>"
```

### Ver citas en un rango de fechas
```bash
curl -X GET "http://localhost:3000/api/citas-servicios/by-date-range?fechaInicio=2025-01-10T00:00:00Z&fechaFin=2025-01-20T23:59:59Z" \
  -H "Authorization: Bearer <token>"
```

### Eliminar una cita
```bash
curl -X DELETE http://localhost:3000/api/citas-servicios/1 \
  -H "Authorization: Bearer <token>"
```

---

## Notas Adicionales

### Formato de Fechas
- Todas las fechas deben estar en formato ISO8601 con timezone
- Ejemplo: `2025-01-15T10:00:00Z` (UTC)
- Ejemplo con timezone: `2025-01-15T10:00:00-06:00` (CST)

### Relación con Otras Tablas
- **Reservaciones**: Cada cita está asociada a una reservación
- **Servicios**: Define qué tipo de servicio se realizará
- **Empleados**: Opcional, asigna quién realizará el servicio
- **Mascotas**: Indirectamente a través de la reservación


### Casos de Uso Típicos

1. **Agendar consulta veterinaria durante hospedaje**
   - Cliente reserva habitación para su mascota
   - Solicita consulta veterinaria para día específico
   - Se crea cita asignando veterinario disponible

2. **Programar servicios de estética**
   - Durante reservación, se programan baños o cortes
   - Se asigna empleado de peluquería
   - Sistema verifica disponibilidad de empleado

3. **Calendario de actividades**
   - Paseos diarios programados
   - Sesiones de entrenamiento
   - Pueden o no tener empleado asignado

4. **Gestión de agenda de empleados**
   - Ver todas las citas de un empleado
   - Evitar conflictos de horario
   - Reasignar citas si es necesario

### Consideraciones de Diseño

- **Flexibilidad**: Empleado es opcional para permitir servicios auto-gestionados
- **Validación**: Sistema previene doble-booking de empleados
- **Trazabilidad**: Todas las citas quedan registradas con notas
- **Consultas**: Múltiples formas de consultar (por reservación, empleado, fechas)

---

## Estructura de la Base de Datos

```sql
CREATE TABLE citas_servicios (
    cita_id serial PRIMARY KEY,
    reservacion_id integer REFERENCES reservaciones(reservacion_id),
    servicio_id integer REFERENCES servicios(servicio_id),
    empleado_id integer REFERENCES empleados(empleado_id),
    fecha_hora_inicio timestamp without time zone,
    fecha_hora_fin timestamp without time zone,
    notas text
);
```

**Campos:**
- `cita_id`: Identificador único autoincremental
- `reservacion_id`: Reservación asociada
- `servicio_id`: Tipo de servicio a realizar
- `empleado_id`: Empleado asignado (opcional)
- `fecha_hora_inicio`: Inicio programado
- `fecha_hora_fin`: Fin programado
- `notas`: Observaciones adicionales

**Foreign Keys:**
- ON DELETE NO ACTION para todas las relaciones
- Mantiene integridad referencial

---

## Resumen de Endpoints

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | `/api/citas-servicios` | Listar todas las citas del propietario | ✅ |
| GET | `/api/citas-servicios/:id` | Obtener cita por ID | ✅ |
| POST | `/api/citas-servicios` | Crear nueva cita | ✅ |
| PUT | `/api/citas-servicios/:id` | Actualizar cita | ✅ |
| DELETE | `/api/citas-servicios/:id` | Eliminar cita | ✅ |
| GET | `/api/citas-servicios/by-reservacion/:id` | Citas de una reservación | ✅ |
| GET | `/api/citas-servicios/by-empleado/:id` | Citas de un empleado | ✅ |
| GET | `/api/citas-servicios/by-date-range` | Citas en rango de fechas | ✅ |
