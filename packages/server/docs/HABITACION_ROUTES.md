# API de Habitaciones - Hotel para Perros

## Descripción
API REST para gestionar las habitaciones del hotel. Permite crear, leer, actualizar y eliminar habitaciones, con soporte para filtrado por especie y estado (activa/inactiva).

## Endpoints

### 1. Listar todas las habitaciones
```http
GET /api/habitaciones
```

**Query Parameters:**
- `includeInactive` (opcional): `true` para incluir habitaciones inactivas, por defecto solo muestra activas

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": [
    {
      "habitacion_id": 1,
      "nombre_numero": "H-101",
      "descripcion": "Habitación pequeña para razas pequeñas",
      "capacidad_kg": 15.00,
      "max_altura": 0.50,
      "max_largo": 0.80,
      "precio_noche": 350.00,
      "activa": true,
      "especie_id": 1,
      "especie_nombre": "Perro"
    }
  ]
}
```

---

### 2. Obtener habitación por ID
```http
GET /api/habitaciones/:habitacionId
```

**Parámetros de ruta:**
- `habitacionId` (requerido): ID de la habitación

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "habitacion_id": 1,
    "nombre_numero": "H-101",
    "descripcion": "Habitación pequeña para razas pequeñas",
    "capacidad_kg": 15.00,
    "max_altura": 0.50,
    "max_largo": 0.80,
    "precio_noche": 350.00,
    "activa": true,
    "especie_id": 1,
    "especie_nombre": "Perro"
  }
}
```

**Errores:**
- `404 Not Found`: Habitación no encontrada

---

### 3. Obtener habitaciones por especie
```http
GET /api/habitaciones/especie/:especieId
```

**Parámetros de ruta:**
- `especieId` (requerido): ID de la especie

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": [
    {
      "habitacion_id": 1,
      "nombre_numero": "H-101",
      "descripcion": "Habitación pequeña",
      "capacidad_kg": 15.00,
      "max_altura": 0.50,
      "max_largo": 0.80,
      "precio_noche": 350.00,
      "activa": true,
      "especie_id": 1,
      "especie_nombre": "Perro"
    }
  ]
}
```

---

### 4. Crear nueva habitación
```http
POST /api/habitaciones
```

**Headers:**
- `Authorization: Bearer <token>` (requerido)

**Body:**
```json
{
  "nombre_numero": "H-101",
  "descripcion": "Habitación pequeña para razas pequeñas",
  "capacidad_kg": 15.00,
  "max_altura": 0.50,
  "max_largo": 0.80,
  "precio_noche": 350.00,
  "activa": true,
  "especie_id": 1
}
```

**Campos:**
- `nombre_numero` (string, requerido, max 50): Nombre o número de la habitación
- `descripcion` (string, opcional, max 200): Descripción de la habitación
- `capacidad_kg` (number, opcional, max 2 decimales): Capacidad en kilogramos
- `max_altura` (number, opcional, max 2 decimales): Altura máxima permitida en metros
- `max_largo` (number, opcional, max 2 decimales): Largo máximo permitido en metros
- `precio_noche` (number, requerido, max 2 decimales): Precio por noche
- `activa` (boolean, opcional, default true): Estado de la habitación
- `especie_id` (integer, opcional): ID de la especie permitida

**Respuesta exitosa (201):**
```json
{
  "success": true,
  "data": {
    "habitacion_id": 1,
    "nombre_numero": "H-101",
    "descripcion": "Habitación pequeña para razas pequeñas",
    "capacidad_kg": 15.00,
    "max_altura": 0.50,
    "max_largo": 0.80,
    "precio_noche": 350.00,
    "activa": true,
    "especie_id": 1
  },
  "message": "Habitación creada exitosamente"
}
```

**Errores:**
- `401 Unauthorized`: No autenticado
- `409 Conflict`: Ya existe una habitación con ese nombre/número
- `400 Bad Request`: Datos de validación incorrectos

---

### 5. Actualizar habitación
```http
PUT /api/habitaciones/:habitacionId
```

**Headers:**
- `Authorization: Bearer <token>` (requerido)

**Parámetros de ruta:**
- `habitacionId` (requerido): ID de la habitación

**Body:**
Todos los campos son opcionales, se actualizarán solo los campos enviados
```json
{
  "nombre_numero": "H-102",
  "descripcion": "Habitación mediana actualizada",
  "capacidad_kg": 25.00,
  "max_altura": 0.70,
  "max_largo": 1.00,
  "precio_noche": 450.00,
  "activa": true,
  "especie_id": 1
}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "habitacion_id": 1,
    "nombre_numero": "H-102",
    "descripcion": "Habitación mediana actualizada",
    "capacidad_kg": 25.00,
    "max_altura": 0.70,
    "max_largo": 1.00,
    "precio_noche": 450.00,
    "activa": true,
    "especie_id": 1
  },
  "message": "Habitación actualizada exitosamente"
}
```

**Errores:**
- `401 Unauthorized`: No autenticado
- `404 Not Found`: Habitación no encontrada
- `409 Conflict`: Ya existe otra habitación con ese nombre/número
- `400 Bad Request`: Datos de validación incorrectos

---

### 6. Desactivar habitación (Soft Delete)
```http
PATCH /api/habitaciones/:habitacionId/deactivate
```

**Headers:**
- `Authorization: Bearer <token>` (requerido)

**Parámetros de ruta:**
- `habitacionId` (requerido): ID de la habitación

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Habitación desactivada exitosamente"
}
```

**Errores:**
- `401 Unauthorized`: No autenticado
- `404 Not Found`: Habitación no encontrada

**Nota:** Este endpoint cambia el campo `activa` a `false` sin eliminar el registro de la base de datos.

---

### 7. Eliminar habitación permanentemente
```http
DELETE /api/habitaciones/:habitacionId
```

**Headers:**
- `Authorization: Bearer <token>` (requerido)

**Parámetros de ruta:**
- `habitacionId` (requerido): ID de la habitación

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Habitación eliminada exitosamente"
}
```

**Errores:**
- `401 Unauthorized`: No autenticado
- `404 Not Found`: Habitación no encontrada
- `409 Conflict`: No se puede eliminar porque tiene reservaciones asociadas

**Nota:** Este endpoint elimina permanentemente el registro. Solo funciona si la habitación no tiene reservaciones asociadas.

---

## Estructura de datos

### Habitación
```typescript
interface Habitacion {
  habitacion_id: number;
  nombre_numero: string;
  descripcion: string | null;
  capacidad_kg: number | null;
  max_altura: number | null;
  max_largo: number | null;
  precio_noche: number;
  activa: boolean;
  especie_id: number | null;
  especie_nombre?: string | null;  // Solo en respuestas con JOIN
}
```

## Reglas de negocio

1. **Nombres únicos**: No pueden existir dos habitaciones con el mismo `nombre_numero`
2. **Soft delete**: Al desactivar una habitación, esta no se elimina sino que se marca como `activa = false`
3. **Eliminación permanente**: Solo se pueden eliminar habitaciones que no tengan reservaciones asociadas
4. **Relación con especies**: Una habitación puede estar asociada a una especie específica (opcional)
5. **Filtrado por estado**: Por defecto, el listado solo muestra habitaciones activas

## Validaciones

### Crear/Actualizar habitación:
- `nombre_numero`: 1-50 caracteres, requerido en creación
- `descripcion`: máximo 200 caracteres, opcional
- `capacidad_kg`: número ≥ 0, máximo 2 decimales, opcional
- `max_altura`: número ≥ 0, máximo 2 decimales, opcional
- `max_largo`: número ≥ 0, máximo 2 decimales, opcional
- `precio_noche`: número ≥ 0, máximo 2 decimales, requerido en creación
- `activa`: booleano, opcional, default true
- `especie_id`: entero ≥ 1, opcional

## Ejemplos de uso

### Ejemplo 1: Crear habitación básica
```bash
curl -X POST http://localhost:3000/api/habitaciones \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre_numero": "H-101",
    "precio_noche": 350.00
  }'
```

### Ejemplo 2: Crear habitación completa con restricciones
```bash
curl -X POST http://localhost:3000/api/habitaciones \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre_numero": "H-201",
    "descripcion": "Habitación grande para perros grandes",
    "capacidad_kg": 50.00,
    "max_altura": 1.00,
    "max_largo": 1.50,
    "precio_noche": 650.00,
    "especie_id": 1
  }'
```

### Ejemplo 3: Listar habitaciones activas
```bash
curl http://localhost:3000/api/habitaciones
```

### Ejemplo 4: Listar todas las habitaciones (incluyendo inactivas)
```bash
curl http://localhost:3000/api/habitaciones?includeInactive=true
```

### Ejemplo 5: Obtener habitaciones para perros
```bash
curl http://localhost:3000/api/habitaciones/especie/1
```

### Ejemplo 6: Actualizar solo el precio
```bash
curl -X PUT http://localhost:3000/api/habitaciones/1 \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "precio_noche": 400.00
  }'
```

### Ejemplo 7: Desactivar habitación
```bash
curl -X PATCH http://localhost:3000/api/habitaciones/1/deactivate \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Ejemplo 8: Eliminar habitación permanentemente
```bash
curl -X DELETE http://localhost:3000/api/habitaciones/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Códigos de respuesta HTTP

- `200 OK`: Operación exitosa
- `201 Created`: Recurso creado exitosamente
- `400 Bad Request`: Error de validación en los datos enviados
- `401 Unauthorized`: Token de autenticación inválido o no proporcionado
- `404 Not Found`: Recurso no encontrado
- `409 Conflict`: Conflicto (nombre duplicado o habitación en uso)
- `500 Internal Server Error`: Error del servidor

## Notas adicionales

### Diferencia entre Soft Delete y Delete
- **PATCH /deactivate**: Marca la habitación como inactiva (`activa = false`). La habitación sigue existiendo en la base de datos y puede ser reactivada.
- **DELETE**: Elimina permanentemente el registro de la base de datos. Solo funciona si no hay reservaciones asociadas.

### Consultas con relaciones
Todos los endpoints que devuelven habitaciones incluyen automáticamente el nombre de la especie asociada mediante un LEFT JOIN, facilitando la visualización de datos relacionados sin necesidad de consultas adicionales.
