# Rutas de Desparasitaciones (Desparasitacion Routes)

Base URL: `/api/desparasitaciones`

## Descripción General
Estas rutas manejan el historial de desparasitaciones de las mascotas. Permiten registrar, consultar, actualizar y eliminar registros de desparasitaciones internas y externas, incluyendo información sobre productos utilizados y fechas de próximas aplicaciones.

---

## Endpoints CRUD (Requieren Autenticación)

### 1. Obtener Todas las Desparasitaciones de una Mascota
**GET** `/api/desparasitaciones/:mascotaId`

Obtiene el historial completo de desparasitaciones de una mascota específica, ordenado por fecha (más reciente primero).

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
      "desparasitacion_id": 1,
      "mascota_id": 5,
      "tipo": "Interna",
      "producto": "Drontal Plus",
      "fecha": "2024-12-15",
      "proxima_fecha": "2025-03-15"
    },
    {
      "desparasitacion_id": 2,
      "mascota_id": 5,
      "tipo": "Externa",
      "producto": "Bravecto",
      "fecha": "2024-11-01",
      "proxima_fecha": "2025-02-01"
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

### 2. Obtener Desparasitación Específica
**GET** `/api/desparasitaciones/:mascotaId/:desparasitacionId`

Obtiene los detalles de una desparasitación específica.

#### Requiere Autenticación
✅ Sí

#### Headers
```
Authorization: Bearer {token}
```

#### URL Parameters
- `mascotaId` (number, requerido): ID de la mascota
- `desparasitacionId` (number, requerido): ID de la desparasitación

#### Response Success (200)
```json
{
  "success": true,
  "data": {
    "desparasitacion_id": 1,
    "mascota_id": 5,
    "tipo": "Interna",
    "producto": "Drontal Plus - 2 tabletas",
    "fecha": "2024-12-15",
    "proxima_fecha": "2025-03-15"
  }
}
```

#### Response Error (404)
```json
{
  "success": false,
  "error": "Desparasitación no encontrada"
}
```

---

### 3. Registrar Nueva Desparasitación
**POST** `/api/desparasitaciones/:mascotaId`

Registra una nueva desparasitación para una mascota.

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
  "tipo": "Interna",
  "producto": "Drontal Plus - 2 tabletas",
  "fecha": "2024-12-15",
  "proxima_fecha": "2025-03-15"
}
```

#### Campos del Request Body

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `tipo` | string (max 50) | Opcional | Tipo de desparasitación (Interna/Externa) |
| `producto` | string (max 100) | Opcional | Nombre y dosis del producto utilizado |
| `fecha` | string (ISO date) | Opcional | Fecha de aplicación |
| `proxima_fecha` | string (ISO date) | Opcional | Fecha programada para próxima aplicación |

#### Validaciones
- `mascotaId`: Debe ser un número entero mayor a 0
- `tipo`: Opcional, máximo 50 caracteres
- `producto`: Opcional, máximo 100 caracteres
- `fecha`: Formato ISO 8601 (YYYY-MM-DD)
- `proxima_fecha`: Formato ISO 8601 (YYYY-MM-DD)

#### Response Success (201)
```json
{
  "success": true,
  "data": {
    "desparasitacion_id": 1,
    "mascota_id": 5,
    "tipo": "Interna",
    "producto": "Drontal Plus - 2 tabletas",
    "fecha": "2024-12-15",
    "proxima_fecha": "2025-03-15"
  },
  "message": "Desparasitación registrada exitosamente"
}
```

#### Response Error (400)
```json
{
  "success": false,
  "errors": [
    {
      "field": "fecha",
      "message": "La fecha debe ser una fecha válida (ISO8601)"
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

### 4. Actualizar Desparasitación
**PUT** `/api/desparasitaciones/:mascotaId/:desparasitacionId`

Actualiza la información de una desparasitación existente.

#### Requiere Autenticación
✅ Sí

#### Headers
```
Authorization: Bearer {token}
Content-Type: application/json
```

#### URL Parameters
- `mascotaId` (number, requerido): ID de la mascota
- `desparasitacionId` (number, requerido): ID de la desparasitación a actualizar

#### Request Body
Todos los campos son opcionales. Solo envía los campos que deseas actualizar:

```json
{
  "proxima_fecha": "2025-04-15",
  "producto": "Drontal Plus - 2 tabletas (refuerzo)"
}
```

#### Response Success (200)
```json
{
  "success": true,
  "data": {
    "desparasitacion_id": 1,
    "mascota_id": 5,
    "tipo": "Interna",
    "producto": "Drontal Plus - 2 tabletas (refuerzo)",
    "fecha": "2024-12-15",
    "proxima_fecha": "2025-04-15"
  },
  "message": "Desparasitación actualizada exitosamente"
}
```

#### Response Error (404)
```json
{
  "success": false,
  "error": "Desparasitación no encontrada o nada que actualizar"
}
```

---

### 5. Eliminar Desparasitación
**DELETE** `/api/desparasitaciones/:mascotaId/:desparasitacionId`

Elimina un registro de desparasitación del sistema.

#### Requiere Autenticación
✅ Sí

#### Headers
```
Authorization: Bearer {token}
```

#### URL Parameters
- `mascotaId` (number, requerido): ID de la mascota
- `desparasitacionId` (number, requerido): ID de la desparasitación a eliminar

#### Response Success (200)
```json
{
  "success": true,
  "message": "Desparasitación eliminada exitosamente"
}
```

#### Response Error (404)
```json
{
  "success": false,
  "error": "Desparasitación no encontrada"
}
```

---

## Ejemplos de Uso

### Registrar Desparasitación Interna Completa
```javascript
const response = await fetch('http://localhost:4000/api/desparasitaciones/5', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  credentials: 'include',
  body: JSON.stringify({
    tipo: 'Interna',
    producto: 'Drontal Plus - 2 tabletas según peso',
    fecha: '2024-12-15',
    proxima_fecha: '2025-03-15'
  })
});

const data = await response.json();
console.log('Desparasitación registrada:', data.data);
```

### Registrar Desparasitación Externa
```javascript
const response = await fetch('http://localhost:4000/api/desparasitaciones/5', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  credentials: 'include',
  body: JSON.stringify({
    tipo: 'Externa',
    producto: 'Bravecto 1000mg',
    fecha: '2024-11-01',
    proxima_fecha: '2025-02-01'
  })
});
```

### Registrar Solo Producto y Fecha
```javascript
const response = await fetch('http://localhost:4000/api/desparasitaciones/5', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  credentials: 'include',
  body: JSON.stringify({
    producto: 'Panacur',
    fecha: '2024-12-20'
  })
});
```

### Consultar Historial de Desparasitaciones
```bash
curl -X GET http://localhost:4000/api/desparasitaciones/5 \
  -H "Authorization: Bearer YOUR_TOKEN" \
  --cookie "token=YOUR_JWT_TOKEN"
```

### Actualizar Próxima Fecha
```javascript
const response = await fetch('http://localhost:4000/api/desparasitaciones/5/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  credentials: 'include',
  body: JSON.stringify({
    proxima_fecha: '2025-04-15'
  })
});
```

### Eliminar Registro
```javascript
const response = await fetch('http://localhost:4000/api/desparasitaciones/5/1', {
  method: 'DELETE',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  credentials: 'include'
});
```

---

## Diccionario de Campos

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `desparasitacion_id` | number | Identificador único de la desparasitación |
| `mascota_id` | number | ID de la mascota |
| `tipo` | string | Tipo de desparasitación (Interna/Externa) |
| `producto` | string | Nombre del producto y dosis utilizada (máx 100 caracteres) |
| `fecha` | date | Fecha de aplicación (formato ISO: YYYY-MM-DD) |
| `proxima_fecha` | date | Fecha programada para próxima aplicación (formato ISO: YYYY-MM-DD) |

---

## Notas Importantes

### Todos los Campos son Opcionales
- Al registrar una desparasitación, **todos los campos son opcionales**
- Esto permite flexibilidad para registrar información parcial
- Sin embargo, se recomienda incluir al menos `producto` y `fecha`

### Tipos de Desparasitación
El campo `tipo` acepta texto libre, pero se recomienda usar:
- **Interna**: Para parásitos internos (lombrices, gusanos intestinales)
- **Externa**: Para parásitos externos (pulgas, garrapatas, ácaros)

Productos comunes:
- **Interna**: Drontal, Panacur, Milbemax, Endogard
- **Externa**: Bravecto, NexGard, Simparica, Frontline, Revolution

### Producto
- Incluye nombre comercial y dosis
- Ejemplos:
  - "Drontal Plus - 2 tabletas"
  - "Bravecto 1000mg (perros 20-40kg)"
  - "NexGard Spectra M - 1 tableta"

### Fechas
- `fecha`: Cuándo se aplicó la desparasitación
- `proxima_fecha`: Recordatorio para próxima aplicación
- Útil para generar alertas y recordatorios

### Frecuencia Recomendada
- **Interna**: Cada 3 meses (trimestral)
- **Externa**: Varía según producto:
  - Mensual: NexGard, Simparica
  - Trimestral: Bravecto

### Historial
- Las desparasitaciones se ordenan por `fecha` descendente
- Los registros sin fecha aparecen al final
- No hay límite en la cantidad de registros por mascota

### Control de Acceso
- Solo el propietario de la mascota puede ver y gestionar desparasitaciones
- Verificación automática mediante JWT
- No es posible acceder a registros de mascotas de otros usuarios

### Actualización Parcial
- El endpoint PUT permite actualizaciones parciales
- Solo envía los campos que deseas modificar
- Los campos no enviados conservan su valor actual

### Eliminación
- La eliminación es permanente
- Considera usar observaciones para marcar como "completado" en lugar de eliminar
- Mantener historial es importante para salud a largo plazo

---

## Códigos de Estado HTTP

| Código | Descripción |
|--------|-------------|
| `200` | OK - Operación exitosa |
| `201` | Created - Desparasitación registrada exitosamente |
| `400` | Bad Request - Error de validación |
| `401` | Unauthorized - No autenticado |
| `403` | Forbidden - Sin permisos |
| `404` | Not Found - Mascota o desparasitación no encontrada |
| `500` | Internal Server Error - Error del servidor |

---

## Casos de Uso Comunes

### Desparasitación al Adoptar
```json
{
  "tipo": "Interna",
  "producto": "Drontal Plus - 2 tabletas",
  "fecha": "2024-12-15",
  "proxima_fecha": "2025-03-15"
}
```

### Aplicación de Pipeta Externa
```json
{
  "tipo": "Externa",
  "producto": "Frontline Combo - pipeta 20-40kg",
  "fecha": "2024-12-01",
  "proxima_fecha": "2025-01-01"
}
```

### Registro Histórico Sin Fecha Exacta
```json
{
  "tipo": "Interna",
  "producto": "Panacur"
}
```

### Plan de Desparasitación Anual
```json
[
  {
    "tipo": "Interna",
    "producto": "Drontal",
    "fecha": "2024-01-15",
    "proxima_fecha": "2024-04-15"
  },
  {
    "tipo": "Interna",
    "producto": "Drontal",
    "fecha": "2024-04-15",
    "proxima_fecha": "2024-07-15"
  },
  {
    "tipo": "Interna",
    "producto": "Drontal",
    "fecha": "2024-07-15",
    "proxima_fecha": "2024-10-15"
  },
  {
    "tipo": "Interna",
    "producto": "Drontal",
    "fecha": "2024-10-15",
    "proxima_fecha": "2025-01-15"
  }
]
```

---

## Integración con Frontend

### Timeline de Desparasitaciones
```javascript
function DesparasitacionTimeline({ mascotaId }) {
  const [desparasitaciones, setDesparasitaciones] = useState([]);
  
  useEffect(() => {
    fetch(`http://localhost:4000/api/desparasitaciones/${mascotaId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => setDesparasitaciones(data.data));
  }, [mascotaId]);

  return (
    <div className="timeline">
      {desparasitaciones.map(d => (
        <div key={d.desparasitacion_id} className="timeline-item">
          <span className="date">{d.fecha}</span>
          <span className="tipo">{d.tipo}</span>
          <span className="producto">{d.producto}</span>
          {d.proxima_fecha && (
            <span className="next">Próxima: {d.proxima_fecha}</span>
          )}
        </div>
      ))}
    </div>
  );
}
```

### Alerta de Próxima Desparasitación
```javascript
function checkProximaDesparasitacion(desparasitaciones) {
  const hoy = new Date();
  const proximaSemana = new Date();
  proximaSemana.setDate(hoy.getDate() + 7);

  const pendientes = desparasitaciones.filter(d => {
    if (!d.proxima_fecha) return false;
    const proxima = new Date(d.proxima_fecha);
    return proxima <= proximaSemana && proxima >= hoy;
  });

  if (pendientes.length > 0) {
    return {
      alert: true,
      message: `Próxima desparasitación programada: ${pendientes[0].tipo} - ${pendientes[0].proxima_fecha}`
    };
  }

  return { alert: false };
}
```

### Separar por Tipo
```javascript
function separateByTipo(desparasitaciones) {
  return {
    internas: desparasitaciones.filter(d => d.tipo === 'Interna'),
    externas: desparasitaciones.filter(d => d.tipo === 'Externa'),
    otras: desparasitaciones.filter(d => !d.tipo || (d.tipo !== 'Interna' && d.tipo !== 'Externa'))
  };
}
```

### Indicador de Estado
```javascript
function getEstadoDesparasitacion(desparasitacion) {
  if (!desparasitacion.proxima_fecha) {
    return { status: 'sin_programar', color: 'gray', text: 'Sin programar' };
  }

  const hoy = new Date();
  const proxima = new Date(desparasitacion.proxima_fecha);
  const diffDays = Math.ceil((proxima - hoy) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return { status: 'vencida', color: 'red', text: 'Vencida' };
  }
  if (diffDays <= 7) {
    return { status: 'proxima', color: 'orange', text: 'Próxima' };
  }
  return { status: 'al_dia', color: 'green', text: 'Al día' };
}
```

### Formulario de Registro Rápido
```javascript
function QuickDesparasitacionForm({ mascotaId, onSuccess }) {
  const [tipo, setTipo] = useState('Interna');
  const [producto, setProducto] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const hoy = new Date().toISOString().split('T')[0];
    const proxima = new Date();
    proxima.setMonth(proxima.getMonth() + 3);
    const proximaStr = proxima.toISOString().split('T')[0];

    const response = await fetch(`http://localhost:4000/api/desparasitaciones/${mascotaId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        tipo,
        producto,
        fecha: hoy,
        proxima_fecha: proximaStr
      })
    });

    if (response.ok) {
      const data = await response.json();
      onSuccess(data.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
        <option value="Interna">Interna</option>
        <option value="Externa">Externa</option>
      </select>
      <input 
        type="text" 
        placeholder="Producto (ej: Drontal Plus)" 
        value={producto}
        onChange={(e) => setProducto(e.target.value)}
        required
      />
      <button type="submit">Registrar</button>
    </form>
  );
}
```

---

**Última actualización**: Enero 2025  
**Versión**: 1.0 - Arquitectura en capas (Repository, Service, Controller)
