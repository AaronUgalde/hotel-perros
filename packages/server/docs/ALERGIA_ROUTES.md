# Rutas de Alergias (Alergia Routes)

Base URL: `/api/alergias`

## Descripción General
Estas rutas manejan las alergias de las mascotas. Permiten registrar, consultar y eliminar alergias asociadas a cada mascota, así como acceder al catálogo de alergias disponibles.

---

## Endpoints CRUD (Requieren Autenticación)

### 1. Obtener Todas las Alergias de una Mascota
**GET** `/api/alergias/:mascotaId`

Obtiene la lista completa de alergias registradas para una mascota específica, ordenadas alfabéticamente por nombre.

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
      "mascota_id": 5,
      "alergia_id": 1,
      "severidad": "Alta",
      "nombre": "Pollo",
      "tipo": "Alimentaria"
    },
    {
      "mascota_id": 5,
      "alergia_id": 8,
      "severidad": "Moderada",
      "nombre": "Polen",
      "tipo": "Ambiental"
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

### 2. Agregar Alergia a Mascota
**POST** `/api/alergias/:mascotaId`

Registra una nueva alergia para una mascota.

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
  "alergia_id": 3,
  "severidad": "Alta"
}
```

#### Campos del Request Body

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `alergia_id` | number | **Sí** | ID del catálogo de alergias |
| `severidad` | string (max 50) | Opcional | Nivel de severidad (Leve, Moderada, Alta, Severa) |

#### Validaciones
- `mascotaId`: Debe ser un número entero mayor a 0
- `alergia_id`: **Requerido**, debe ser un número entero
- `severidad`: Opcional, máximo 50 caracteres

#### Response Success (201)
```json
{
  "success": true,
  "data": {
    "mascota_id": 5,
    "alergia_id": 3,
    "severidad": "Alta"
  },
  "message": "Alergia agregada exitosamente"
}
```

#### Response Error (400)
```json
{
  "success": false,
  "errors": [
    {
      "field": "alergia_id",
      "message": "ID de alergia es requerido y debe ser un número entero"
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

### 3. Eliminar Alergia de Mascota
**DELETE** `/api/alergias/:mascotaId/:alergiaId`

Elimina una alergia registrada de una mascota.

#### Requiere Autenticación
✅ Sí

#### Headers
```
Authorization: Bearer {token}
```

#### URL Parameters
- `mascotaId` (number, requerido): ID de la mascota
- `alergiaId` (number, requerido): ID de la alergia a eliminar

#### Response Success (200)
```json
{
  "success": true,
  "message": "Alergia eliminada exitosamente"
}
```

#### Response Error (404)
```json
{
  "success": false,
  "error": "Alergia no encontrada"
}
```

---

## Endpoints de Catálogos (Públicos - No Requieren Autenticación)

### 4. Obtener Catálogo de Alergias
**GET** `/api/alergias/catalogo`

Obtiene el catálogo completo de alergias disponibles, agrupadas por tipo.

#### Requiere Autenticación
❌ No

#### Response Success (200)
```json
{
  "success": true,
  "data": {
    "alergias": [
      {
        "alergia_id": 1,
        "nombre": "Pollo",
        "tipo": "Alimentaria"
      },
      {
        "alergia_id": 2,
        "nombre": "Carne de res",
        "tipo": "Alimentaria"
      },
      {
        "alergia_id": 3,
        "nombre": "Trigo",
        "tipo": "Alimentaria"
      },
      {
        "alergia_id": 4,
        "nombre": "Penicilina",
        "tipo": "Medicamentosa"
      },
      {
        "alergia_id": 5,
        "nombre": "Polen",
        "tipo": "Ambiental"
      },
      {
        "alergia_id": 6,
        "nombre": "Ácaros",
        "tipo": "Ambiental"
      }
    ]
  }
}
```

---

## Ejemplos de Uso

### Registrar Alergia Alimentaria
```javascript
const response = await fetch('http://localhost:4000/api/alergias/5', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  credentials: 'include',
  body: JSON.stringify({
    alergia_id: 1,
    severidad: 'Alta'
  })
});

const data = await response.json();
console.log('Alergia registrada:', data.data);
```

### Registrar Alergia sin Severidad
```javascript
const response = await fetch('http://localhost:4000/api/alergias/5', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  credentials: 'include',
  body: JSON.stringify({
    alergia_id: 8
  })
});
```

### Consultar Alergias de una Mascota
```bash
curl -X GET http://localhost:4000/api/alergias/5 \
  -H "Authorization: Bearer YOUR_TOKEN" \
  --cookie "token=YOUR_JWT_TOKEN"
```

### Eliminar Alergia
```javascript
const response = await fetch('http://localhost:4000/api/alergias/5/1', {
  method: 'DELETE',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  credentials: 'include'
});
```

### Obtener Catálogo de Alergias
```bash
# Sin autenticación (público)
curl http://localhost:4000/api/alergias/catalogo
```

---

## Diccionario de Campos

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `mascota_id` | number | ID de la mascota |
| `alergia_id` | number | ID del catálogo de alergias |
| `severidad` | string | Nivel de severidad (Leve, Moderada, Alta, Severa) |
| `nombre` | string | Nombre de la alergia |
| `tipo` | string | Tipo de alergia (Alimentaria, Medicamentosa, Ambiental) |

---

## Notas Importantes

### Campo Requerido
- **`alergia_id`** es el único campo **obligatorio** al registrar una alergia
- `severidad` es opcional

### Tipos de Alergias
El sistema categoriza las alergias en tres tipos:
- **Alimentaria**: Alergia a ingredientes en la comida (pollo, carne, trigo, lácteos, etc.)
- **Medicamentosa**: Alergia a medicamentos (penicilina, antibióticos, etc.)
- **Ambiental**: Alergia a elementos del entorno (polen, ácaros, moho, picaduras, etc.)

### Severidad
Aunque es un campo opcional de texto libre, se recomienda usar estos valores estándar:
- **Leve**: Síntomas menores, no requiere acción inmediata
- **Moderada**: Síntomas notables, requiere atención
- **Alta**: Síntomas graves, evitar exposición
- **Severa**: Reacción anafiláctica, emergencia médica

### Control de Acceso
- Solo el propietario de la mascota puede ver y gestionar alergias
- Verificación automática mediante JWT
- No es posible acceder a alergias de mascotas de otros usuarios

### Eliminación
- La eliminación es permanente
- No afecta el catálogo de alergias
- Solo elimina la relación mascota-alergia

### Catálogo
- El catálogo es compartido entre todos los usuarios
- Las alergias están pre-cargadas en el sistema
- Si necesitas una alergia que no está en el catálogo, contacta al administrador

---

## Códigos de Estado HTTP

| Código | Descripción |
|--------|-------------|
| `200` | OK - Operación exitosa |
| `201` | Created - Alergia agregada exitosamente |
| `400` | Bad Request - Error de validación |
| `401` | Unauthorized - No autenticado |
| `403` | Forbidden - Sin permisos |
| `404` | Not Found - Mascota o alergia no encontrada |
| `500` | Internal Server Error - Error del servidor |

---

## Casos de Uso Comunes

### Registro al Adoptar/Adquirir Mascota
```json
{
  "alergias": [
    { "alergia_id": 1, "severidad": "Alta" },
    { "alergia_id": 8, "severidad": "Moderada" }
  ]
}
```

### Descubrimiento de Nueva Alergia
```json
{
  "alergia_id": 4,
  "severidad": "Severa"
}
```

### Sin Especificar Severidad
```json
{
  "alergia_id": 6
}
```

---

## Integración con Frontend

### Selector de Alergias con Severidad
```javascript
function AlergiaSelector({ mascotaId, onAdd }) {
  const [alergias, setAlergias] = useState([]);
  const [severidad, setSeveridad] = useState('Moderada');
  
  useEffect(() => {
    fetch('http://localhost:4000/api/alergias/catalogo')
      .then(res => res.json())
      .then(data => setAlergias(data.data.alergias));
  }, []);

  const handleAdd = (alergiaId) => {
    fetch(`http://localhost:4000/api/alergias/${mascotaId}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ alergia_id: alergiaId, severidad })
    })
    .then(res => res.json())
    .then(data => onAdd(data.data));
  };

  return (
    <div>
      <select onChange={(e) => setSeveridad(e.target.value)}>
        <option value="Leve">Leve</option>
        <option value="Moderada">Moderada</option>
        <option value="Alta">Alta</option>
        <option value="Severa">Severa</option>
      </select>
      {/* Lista de alergias */}
    </div>
  );
}
```

### Agrupación por Tipo
```javascript
function groupByTipo(alergias) {
  return alergias.reduce((acc, alergia) => {
    const tipo = alergia.tipo || 'Sin Tipo';
    if (!acc[tipo]) acc[tipo] = [];
    acc[tipo].push(alergia);
    return acc;
  }, {});
}

// Uso
const grouped = groupByTipo(alergiasCatalogo);
// {
//   "Alimentaria": [...],
//   "Medicamentosa": [...],
//   "Ambiental": [...]
// }
```

### Indicador de Severidad Visual
```javascript
function getSeveridadColor(severidad) {
  const colors = {
    'Leve': 'green',
    'Moderada': 'yellow',
    'Alta': 'orange',
    'Severa': 'red'
  };
  return colors[severidad] || 'gray';
}
```

### Alertas en Reservaciones
```javascript
function checkAlergias(mascota, servicios) {
  const hasAlergias = mascota.alergias.some(a => 
    a.tipo === 'Alimentaria' && ['Alta', 'Severa'].includes(a.severidad)
  );
  
  if (hasAlergias) {
    return {
      warning: true,
      message: 'IMPORTANTE: Esta mascota tiene alergias alimentarias severas. Verificar dieta especial.'
    };
  }
  
  return { warning: false };
}
```

---

**Última actualización**: Enero 2025  
**Versión**: 1.0 - Arquitectura en capas (Repository, Service, Controller)
