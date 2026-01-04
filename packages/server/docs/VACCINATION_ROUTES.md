# Rutas de Vacunaciones (Vaccination Routes)

Base URL: `/api/pet-vaccinations`

## Descripción General
Estas rutas manejan el historial de vacunaciones de las mascotas. Permiten registrar, consultar, actualizar y eliminar vacunas aplicadas, así como acceder a catálogos de vacunas disponibles por especie.

---

## Endpoints CRUD (Requieren Autenticación)

### 1. Obtener Todas las Vacunaciones de una Mascota
**GET** `/api/pet-vaccinations/:mascotaId`

Obtiene el historial completo de vacunaciones de una mascota específica, ordenado por fecha de aplicación (más reciente primero).

#### Requiere Autenticación
✅ Sí

#### Headers
```
Authorization: Bearer {token}
```

#### URL Parameters
- `mascotaId` (number, requerido): ID de la mascota

#### Response Success (200)
```json
{
  "success": true,
  "data": [
    {
      "vacuna_mascota_id": 1,
      "mascota_id": 5,
      "vacuna_id": 3,
      "nombre_vacuna": "Rabia",
      "fecha_aplicacion": "2024-01-15T00:00:00.000Z",
      "vigencia_hasta": "2025-01-15T00:00:00.000Z",
      "veterinario": "Dr. García",
      "notas": "Primera dosis anual"
    },
    {
      "vacuna_mascota_id": 2,
      "mascota_id": 5,
      "vacuna_id": 5,
      "nombre_vacuna": "Parvovirus",
      "fecha_aplicacion": "2023-12-10T00:00:00.000Z",
      "vigencia_hasta": "2024-12-10T00:00:00.000Z",
      "veterinario": "Dra. Martínez",
      "notas": "Refuerzo"
    }
  ]
}
```

#### Response Error (404)
```json
{
  "success": false,
  "error": "Mascota no encontrada o no pertenece al propietario"
}
```

---

### 2. Obtener Vacunación Específica
**GET** `/api/pet-vaccinations/:mascotaId/:vacunaId`

Obtiene los detalles de una vacunación específica.

#### Requiere Autenticación
✅ Sí

#### Headers
```
Authorization: Bearer {token}
```

#### URL Parameters
- `mascotaId` (number, requerido): ID de la mascota
- `vacunaId` (number, requerido): ID de la vacunación

#### Response Success (200)
```json
{
  "success": true,
  "data": {
    "vacuna_mascota_id": 1,
    "mascota_id": 5,
    "vacuna_id": 3,
    "nombre_vacuna": "Rabia",
    "fecha_aplicacion": "2024-01-15T00:00:00.000Z",
    "vigencia_hasta": "2025-01-15T00:00:00.000Z",
    "veterinario": "Dr. García",
    "notas": "Primera dosis anual"
  }
}
```

#### Response Error (404)
```json
{
  "success": false,
  "error": "Vacunación no encontrada"
}
```

---

### 3. Registrar Nueva Vacunación
**POST** `/api/pet-vaccinations/:mascotaId`

Registra una nueva vacunación para una mascota.

#### Requiere Autenticación
✅ Sí

#### Headers
```
Authorization: Bearer {token}
Content-Type: application/json
```

#### URL Parameters
- `mascotaId` (number, requerido): ID de la mascota

#### Request Body
```json
{
  "vacuna_id": 3,
  "nombre_vacuna": "Rabia",
  "fecha_aplicacion": "2024-01-15",
  "vigencia_hasta": "2025-01-15",
  "veterinario": "Dr. García",
  "notas": "Primera dosis anual"
}
```

#### Campos del Request Body

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `vacuna_id` | number | Opcional | ID del catálogo de vacunas |
| `nombre_vacuna` | string | Opcional | Nombre personalizado de la vacuna |
| `fecha_aplicacion` | string (ISO date) | Opcional | Fecha cuando se aplicó la vacuna |
| `vigencia_hasta` | string (ISO date) | Opcional | Fecha de vencimiento de la vacuna |
| `veterinario` | string | Opcional | Nombre del veterinario que aplicó la vacuna |
| `notas` | string | Opcional | Observaciones o comentarios adicionales |

#### Validaciones
- `mascotaId`: Debe ser un número entero mayor a 0
- `vacuna_id`: Si se proporciona, debe ser un número entero
- `nombre_vacuna`: Si se proporciona, debe ser texto no vacío
- `fecha_aplicacion`: Formato ISO 8601 (YYYY-MM-DD)
- `vigencia_hasta`: Formato ISO 8601 (YYYY-MM-DD)
- `veterinario`: Texto
- `notas`: Texto

#### Response Success (201)
```json
{
  "success": true,
  "data": {
    "vacuna_mascota_id": 1,
    "mascota_id": 5,
    "vacuna_id": 3,
    "nombre_vacuna": "Rabia",
    "fecha_aplicacion": "2024-01-15T00:00:00.000Z",
    "vigencia_hasta": "2025-01-15T00:00:00.000Z",
    "veterinario": "Dr. García",
    "notas": "Primera dosis anual"
  },
  "message": "Vacunación registrada exitosamente"
}
```

#### Response Error (400)
```json
{
  "success": false,
  "errors": [
    {
      "field": "fecha_aplicacion",
      "message": "Fecha de aplicación debe ser una fecha válida (ISO8601)"
    }
  ]
}
```

#### Response Error (404)
```json
{
  "success": false,
  "error": "Mascota no encontrada o no pertenece al propietario"
}
```

---

### 4. Actualizar Vacunación
**PUT** `/api/pet-vaccinations/:mascotaId/:vacunaId`

Actualiza la información de una vacunación existente.

#### Requiere Autenticación
✅ Sí

#### Headers
```
Authorization: Bearer {token}
Content-Type: application/json
```

#### URL Parameters
- `mascotaId` (number, requerido): ID de la mascota
- `vacunaId` (number, requerido): ID de la vacunación a actualizar

#### Request Body
Todos los campos son opcionales. Solo envía los campos que deseas actualizar:

```json
{
  "vigencia_hasta": "2026-01-15",
  "notas": "Revacunación completada"
}
```

#### Response Success (200)
```json
{
  "success": true,
  "data": {
    "vacuna_mascota_id": 1,
    "mascota_id": 5,
    "vacuna_id": 3,
    "nombre_vacuna": "Rabia",
    "fecha_aplicacion": "2024-01-15T00:00:00.000Z",
    "vigencia_hasta": "2026-01-15T00:00:00.000Z",
    "veterinario": "Dr. García",
    "notas": "Revacunación completada"
  },
  "message": "Vacunación actualizada exitosamente"
}
```

#### Response Error (404)
```json
{
  "success": false,
  "error": "Vacunación no encontrada o nada que actualizar"
}
```

---

### 5. Eliminar Vacunación
**DELETE** `/api/pet-vaccinations/:mascotaId/:vacunaId`

Elimina un registro de vacunación del sistema.

#### Requiere Autenticación
✅ Sí

#### Headers
```
Authorization: Bearer {token}
```

#### URL Parameters
- `mascotaId` (number, requerido): ID de la mascota
- `vacunaId` (number, requerido): ID de la vacunación a eliminar

#### Response Success (200)
```json
{
  "success": true,
  "message": "Vacunación eliminada exitosamente"
}
```

#### Response Error (404)
```json
{
  "success": false,
  "error": "Vacunación no encontrada"
}
```

---

## Endpoints de Catálogos (Públicos - No Requieren Autenticación)

### 6. Obtener Catálogo de Vacunas por Especie
**GET** `/api/pet-vaccinations/vacunas/:id_especie`

Obtiene el catálogo de vacunas disponibles filtrado por especie (perro, gato, etc.).

#### Requiere Autenticación
❌ No

#### URL Parameters
- `id_especie` (string, requerido): ID de la especie (ej: "1" para perros, "2" para gatos)

#### Response Success (200)
```json
{
  "success": true,
  "data": {
    "vacunas": [
      {
        "vacuna_id": 1,
        "nombre": "Rabia",
        "especie_id": "1",
        "descripcion": "Vacuna antirrábica obligatoria",
        "vigencia_meses": 12
      },
      {
        "vacuna_id": 2,
        "nombre": "Parvovirus",
        "especie_id": "1",
        "descripcion": "Protección contra parvovirus canino",
        "vigencia_meses": 12
      },
      {
        "vacuna_id": 3,
        "nombre": "Moquillo",
        "especie_id": "1",
        "descripcion": "Prevención de moquillo canino",
        "vigencia_meses": 12
      }
    ]
  }
}
```

#### Response Error (400)
```json
{
  "success": false,
  "error": "ID de especie inválido"
}
```

---

## Ejemplos de Uso

### Registrar Primera Vacuna de Rabia
```javascript
const response = await fetch('http://localhost:4000/api/pet-vaccinations/5', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  credentials: 'include', // Importante para cookies
  body: JSON.stringify({
    vacuna_id: 1,
    nombre_vacuna: 'Rabia',
    fecha_aplicacion: '2024-01-15',
    vigencia_hasta: '2025-01-15',
    veterinario: 'Dr. García',
    notas: 'Primera dosis - cachorro de 3 meses'
  })
});

const data = await response.json();
console.log('Vacunación registrada:', data.data);
```

### Registrar Vacuna con Campos Mínimos
```javascript
const response = await fetch('http://localhost:4000/api/pet-vaccinations/5', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  credentials: 'include',
  body: JSON.stringify({
    nombre_vacuna: 'Sextuple',
    fecha_aplicacion: '2024-02-10'
  })
});

const data = await response.json();
```

### Consultar Historial de Vacunaciones
```bash
curl -X GET http://localhost:4000/api/pet-vaccinations/5 \
  -H "Authorization: Bearer YOUR_TOKEN" \
  --cookie "token=YOUR_JWT_TOKEN"
```

### Actualizar Fecha de Vigencia
```javascript
const response = await fetch('http://localhost:4000/api/pet-vaccinations/5/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  credentials: 'include',
  body: JSON.stringify({
    vigencia_hasta: '2026-01-15',
    notas: 'Revacunación completada - todo en orden'
  })
});
```

### Obtener Catálogo de Vacunas para Perros
```bash
# Sin autenticación (público)
curl http://localhost:4000/api/pet-vaccinations/vacunas/1
```

### Obtener Catálogo de Vacunas para Gatos
```bash
curl http://localhost:4000/api/pet-vaccinations/vacunas/2
```

### Eliminar Registro de Vacunación
```javascript
const response = await fetch('http://localhost:4000/api/pet-vaccinations/5/1', {
  method: 'DELETE',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  credentials: 'include'
});

const data = await response.json();
console.log(data.message); // "Vacunación eliminada exitosamente"
```

---

## Diccionario de Campos

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `vacuna_mascota_id` | number | Identificador único de la vacunación |
| `mascota_id` | number | ID de la mascota vacunada |
| `vacuna_id` | number | ID del catálogo de vacunas (opcional si se usa nombre personalizado) |
| `nombre_vacuna` | string | Nombre de la vacuna aplicada |
| `fecha_aplicacion` | date | Fecha cuando se aplicó la vacuna (formato ISO: YYYY-MM-DD) |
| `vigencia_hasta` | date | Fecha de vencimiento o próxima aplicación (formato ISO: YYYY-MM-DD) |
| `veterinario` | string | Nombre del veterinario que aplicó la vacuna |
| `notas` | string | Observaciones, reacciones adversas, o comentarios adicionales |

---

## Notas Importantes

### Flexibilidad de Campos
- **Todos los campos son opcionales** al registrar una vacunación
- Puedes usar `vacuna_id` para seleccionar del catálogo o `nombre_vacuna` para vacunas personalizadas
- Si usas ambos (`vacuna_id` y `nombre_vacuna`), el `nombre_vacuna` tiene prioridad en la visualización

### Fechas
- `fecha_aplicacion`: Registra cuándo se aplicó la vacuna
- `vigencia_hasta`: Útil para recordatorios de revacunación
- Ambas fechas deben estar en formato ISO 8601 (YYYY-MM-DD)
- Las fechas se almacenan como timestamps con zona horaria

### Historial
- Las vacunaciones se ordenan por `fecha_aplicacion` descendente
- Los registros más recientes aparecen primero
- No hay límite en la cantidad de vacunaciones por mascota

### Catálogos
- Las vacunas del catálogo están organizadas por especie
- Cada especie tiene su propio conjunto de vacunas recomendadas
- Los catálogos son públicos para facilitar el registro desde cualquier dispositivo

### Control de Acceso
- Solo el propietario de la mascota puede ver y gestionar sus vacunaciones
- La verificación se hace automáticamente mediante el token JWT
- No es posible acceder a vacunaciones de mascotas de otros usuarios

### Actualización Parcial
- El endpoint PUT permite actualizaciones parciales
- Solo envía los campos que deseas modificar
- Los campos no enviados conservan su valor actual
- Útil para actualizar solo la vigencia o agregar notas

### Eliminación
- La eliminación es permanente y no se puede deshacer
- Considera usar notas para marcar como "cancelada" en lugar de eliminar
- La eliminación verifica que la mascota pertenezca al usuario

---

## Códigos de Estado HTTP

| Código | Descripción |
|--------|-------------|
| `200` | OK - Operación exitosa |
| `201` | Created - Vacunación registrada exitosamente |
| `400` | Bad Request - Error en los datos enviados (validación fallida) |
| `401` | Unauthorized - No autenticado o token inválido |
| `403` | Forbidden - No tiene permisos para esta mascota |
| `404` | Not Found - Mascota o vacunación no encontrada |
| `500` | Internal Server Error - Error del servidor |

---

## Casos de Uso Comunes

### Registro Inicial
Al adoptar o comprar una mascota:
```json
{
  "nombre_vacuna": "Vacunación inicial completa",
  "fecha_aplicacion": "2024-01-15",
  "veterinario": "Clínica Veterinaria Central",
  "notas": "Incluye: Rabia, Parvovirus, Moquillo"
}
```

### Revacunación Anual
```json
{
  "vacuna_id": 1,
  "nombre_vacuna": "Rabia - Refuerzo anual",
  "fecha_aplicacion": "2025-01-15",
  "vigencia_hasta": "2026-01-15",
  "veterinario": "Dr. García",
  "notas": "Sin reacciones adversas"
}
```

### Vacuna con Reacción
```json
{
  "vacuna_id": 5,
  "nombre_vacuna": "Leptospirosis",
  "fecha_aplicacion": "2024-03-10",
  "vigencia_hasta": "2025-03-10",
  "veterinario": "Dra. Martínez",
  "notas": "IMPORTANTE: Presentó inflamación leve en el sitio de aplicación. Duró 2 días. Administrar antihistamínico en próxima aplicación."
}
```

### Vacuna Personalizada
```json
{
  "nombre_vacuna": "Vacuna experimental COVID-19 canino",
  "fecha_aplicacion": "2024-06-15",
  "vigencia_hasta": "2024-12-15",
  "veterinario": "Dr. Rodríguez - Hospital Veterinario Universitario",
  "notas": "Estudio clínico #12345. Dosis 1 de 2. Próxima cita: 2024-07-15"
}
```

---

## Integración con Frontend

### Estado de Vigencia
Calcula si una vacuna está vigente:

```javascript
function isVaccineValid(vaccination) {
  if (!vaccination.vigencia_hasta) return null; // Sin información
  
  const today = new Date();
  const expiryDate = new Date(vaccination.vigencia_hasta);
  
  return today <= expiryDate;
}

function getVaccineStatus(vaccination) {
  const isValid = isVaccineValid(vaccination);
  
  if (isValid === null) return { status: 'unknown', color: 'gray' };
  if (isValid) return { status: 'vigente', color: 'green' };
  return { status: 'vencida', color: 'red' };
}
```

### Recordatorios
Alerta 30 días antes del vencimiento:

```javascript
function needsAlert(vaccination) {
  if (!vaccination.vigencia_hasta) return false;
  
  const today = new Date();
  const expiryDate = new Date(vaccination.vigencia_hasta);
  const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
  
  return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
}
```

---

**Última actualización**: Enero 2025
**Versión**: 2.0 - Refactorizada con arquitectura en capas
