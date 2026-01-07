# API de Empleados

## Endpoints

### CRUD de Empleados

#### 1. Obtener todos los empleados
```http
GET /api/empleados
Authorization: Bearer token
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": [
    {
      "empleado_id": 1,
      "nombre": "Dr. Carlos Méndez",
      "especialidad": "Veterinario"
    },
    {
      "empleado_id": 2,
      "nombre": "Ana García",
      "especialidad": "Peluquería Canina"
    },
    {
      "empleado_id": 3,
      "nombre": "Luis Ramírez",
      "especialidad": "Entrenador"
    }
  ]
}
```

---

#### 2. Obtener empleado por ID
```http
GET /api/empleados/:id
Authorization: Bearer token
```

**Parámetros:**
- `id`: ID del empleado (número entero)

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "empleado_id": 1,
    "nombre": "Dr. Carlos Méndez",
    "especialidad": "Veterinario"
  }
}
```

**Respuestas de error:**
- `404`: Empleado no encontrado

---

#### 3. Crear nuevo empleado
```http
POST /api/empleados
Authorization: Bearer token
Content-Type: application/json
```

**Body:**
```json
{
  "nombre": "Dr. Carlos Méndez",
  "especialidad": "Veterinario"
}
```

**Campos requeridos:**
- `nombre` (string): Nombre del empleado (2-100 caracteres)

**Campos opcionales:**
- `especialidad` (string): Especialidad del empleado (máximo 50 caracteres)

**Respuesta exitosa (201):**
```json
{
  "success": true,
  "data": {
    "empleado_id": 1,
    "nombre": "Dr. Carlos Méndez",
    "especialidad": "Veterinario"
  }
}
```

**Respuestas de error:**
- `400`: Validación fallida

---

#### 4. Actualizar empleado
```http
PUT /api/empleados/:id
Authorization: Bearer token
Content-Type: application/json
```

**Parámetros:**
- `id`: ID del empleado (número entero)

**Body (todos los campos son opcionales):**
```json
{
  "nombre": "Dr. Carlos Méndez Pérez",
  "especialidad": "Veterinario Especializado"
}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "empleado_id": 1,
    "nombre": "Dr. Carlos Méndez Pérez",
    "especialidad": "Veterinario Especializado"
  }
}
```

**Respuestas de error:**
- `404`: Empleado no encontrado
- `400`: Validación fallida

---

#### 5. Eliminar empleado
```http
DELETE /api/empleados/:id
Authorization: Bearer token
```

**Parámetros:**
- `id`: ID del empleado (número entero)

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Empleado eliminado"
}
```

**Respuestas de error:**
- `404`: Empleado no encontrado

---

### Búsquedas y Consultas Adicionales

#### 6. Buscar empleados por especialidad
```http
GET /api/empleados/search?especialidad=veterinario
Authorization: Bearer token
```

**Query Parameters:**
- `especialidad` (string, requerido): Especialidad a buscar (búsqueda parcial, case-insensitive)

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": [
    {
      "empleado_id": 1,
      "nombre": "Dr. Carlos Méndez",
      "especialidad": "Veterinario"
    },
    {
      "empleado_id": 4,
      "nombre": "Dra. María López",
      "especialidad": "Veterinaria Especializada"
    }
  ]
}
```

**Respuestas de error:**
- `400`: Especialidad no proporcionada

---

#### 7. Obtener citas de un empleado
```http
GET /api/empleados/:id/citas
Authorization: Bearer token
```

**Parámetros:**
- `id`: ID del empleado (número entero)

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": [
    {
      "cita_id": 10,
      "reservacion_id": 5,
      "servicio_id": 3,
      "empleado_id": 1,
      "fecha_hora_inicio": "2025-01-15T10:00:00Z",
      "fecha_hora_fin": "2025-01-15T11:00:00Z",
      "notas": "Consulta de rutina",
      "fecha_inicio": "2025-01-10",
      "fecha_fin": "2025-01-20",
      "mascota_nombre": "Max",
      "servicio_nombre": "Consulta Veterinaria"
    },
    {
      "cita_id": 12,
      "reservacion_id": 7,
      "servicio_id": 3,
      "empleado_id": 1,
      "fecha_hora_inicio": "2025-01-18T14:00:00Z",
      "fecha_hora_fin": "2025-01-18T15:00:00Z",
      "notas": "Vacunación",
      "fecha_inicio": "2025-01-15",
      "fecha_fin": "2025-01-22",
      "mascota_nombre": "Luna",
      "servicio_nombre": "Vacunación"
    }
  ]
}
```

**Respuestas de error:**
- `404`: Empleado no encontrado

---

## Validaciones

### Creación de Empleado
- `nombre`: Requerido, string de 2-100 caracteres
- `especialidad`: Opcional, string de máximo 50 caracteres


### Actualización de Empleado
- `nombre`: Opcional, string de 2-100 caracteres
- `especialidad`: Opcional, string de máximo 50 caracteres

### Búsqueda por Especialidad
- `especialidad`: Requerido en query string, realiza búsqueda parcial case-insensitive

---

## Ejemplos de Uso

### Crear un empleado veterinario
```bash
curl -X POST http://localhost:3000/api/empleados \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Dr. Carlos Méndez",
    "especialidad": "Veterinario"
  }'
```

### Crear un empleado sin especialidad
```bash
curl -X POST http://localhost:3000/api/empleados \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "María González"
  }'
```

### Actualizar solo la especialidad
```bash
curl -X PUT http://localhost:3000/api/empleados/1 \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "especialidad": "Veterinario Especializado en Felinos"
  }'
```

### Buscar empleados veterinarios
```bash
curl -X GET "http://localhost:3000/api/empleados/search?especialidad=veterinario" \
  -H "Authorization: Bearer <token>"
```

### Obtener todas las citas de un empleado
```bash
curl -X GET http://localhost:3000/api/empleados/1/citas \
  -H "Authorization: Bearer <token>"
```

### Listar todos los empleados
```bash
curl -X GET http://localhost:3000/api/empleados \
  -H "Authorization: Bearer <token>"
```

### Eliminar un empleado
```bash
curl -X DELETE http://localhost:3000/api/empleados/1 \
  -H "Authorization: Bearer <token>"
```

---

## Notas Adicionales

### Relación con Citas de Servicios
- Los empleados pueden estar asignados a citas de servicios (`citas_servicios`)
- La tabla `citas_servicios` conecta empleados con servicios específicos de reservaciones
- Al consultar las citas de un empleado, se obtiene información completa incluyendo:
  - Información de la cita
  - Datos de la reservación
  - Nombre de la mascota
  - Nombre del servicio

### Control de Acceso
- Todos los endpoints requieren autenticación mediante Bearer token
- No hay restricciones adicionales basadas en roles en este módulo
- Todos los usuarios autenticados pueden consultar empleados

### Consideraciones de Eliminación
- Al eliminar un empleado, las citas asociadas NO se eliminan automáticamente
- Las foreign keys de `citas_servicios` tienen `ON DELETE NO ACTION`
- Verificar que no haya citas pendientes antes de eliminar un empleado

### Búsqueda
- La búsqueda por especialidad es case-insensitive
- Realiza búsqueda parcial (ILIKE %término%)
- Útil para filtrar empleados por tipo de servicio que ofrecen

---

## Estructura de la Base de Datos

```sql
CREATE TABLE empleados (
    empleado_id serial PRIMARY KEY,
    nombre varchar(100),
    especialidad varchar(50)
);
```

**Campos:**
- `empleado_id`: Identificador único autoincremental
- `nombre`: Nombre completo del empleado
- `especialidad`: Área de especialización (opcional)
