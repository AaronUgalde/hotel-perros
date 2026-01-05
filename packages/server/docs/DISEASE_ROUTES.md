# Rutas de Enfermedades (Disease Routes)

Base URL: `/api/diseases`

## Descripción General
Estas rutas manejan el historial médico de enfermedades diagnosticadas en las mascotas. Permiten registrar, consultar, actualizar y eliminar enfermedades, así como acceder a catálogos de enfermedades disponibles por especie.

---

## Endpoints CRUD (Requieren Autenticación)

### 1. Obtener Todas las Enfermedades de una Mascota
**GET** `/api/diseases/:mascotaId`

Obtiene el historial completo de enfermedades diagnosticadas de una mascota específica, ordenado por fecha de diagnóstico (más reciente primero).

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
      "enfermedad_mascota_id": 1,
      "mascota_id": 5,
      "enfermedad_id": 3,
      "fecha_diagnostico": "2024-01-15",
      "observaciones": "Presenta síntomas desde hace 3 días",
      "tratamiento": "Antibiótico por 7 días - 250mg cada 12 horas"
    },
    {
      "enfermedad_mascota_id": 2,
      "mascota_id": 5,
      "enfermedad_id": 7,
      "fecha_diagnostico": "2023-11-20",
      "observaciones": "Infección leve",
      "tratamiento": "Pomada tópica por 5 días"
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

### 2. Obtener Enfermedad Específica
**GET** `/api/diseases/:mascotaId/:enfermedadId`

Obtiene los detalles de una enfermedad diagnosticada específica.

#### Requiere Autenticación
✅ Sí

#### Headers
```
Authorization: Bearer {token}
```

#### URL Parameters
- `mascotaId` (number, requerido): ID de la mascota
- `enfermedadId` (number, requerido): ID del diagnóstico de enfermedad

#### Response Success (200)
```json
{
  "success": true,
  "data": {
    "enfermedad_mascota_id": 1,
    "mascota_id": 5,
    "enfermedad_id": 3,
    "fecha_diagnostico": "2024-01-15",
    "observaciones": "Presenta síntomas desde hace 3 días. Fiebre alta, letargo.",
    "tratamiento": "Antibiótico por 7 días - 250mg cada 12 horas. Reposo absoluto."
  }
}
```

#### Response Error (404)
```json
{
  "success": false,
  "error": "Enfermedad no encontrada"
}
```

---

### 3. Registrar Nueva Enfermedad
**POST** `/api/diseases/:mascotaId`

Registra una nueva enfermedad diagnosticada para una mascota.

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
  "enfermedad_id": 3,
  "fecha_diagnostico": "2024-01-15",
  "observaciones": "Presenta síntomas desde hace 3 días. Fiebre alta (40°C), letargo, pérdida de apetito.",
  "tratamiento": "Antibiótico Amoxicilina 250mg cada 12 horas por 7 días. Reposo absoluto. Control en 3 días."
}
```

#### Campos del Request Body

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `enfermedad_id` | number | **Sí** | ID del catálogo de enfermedades |
| `fecha_diagnostico` | string (ISO date) | Opcional | Fecha del diagnóstico |
| `observaciones` | string (max 500) | Opcional | Síntomas, observaciones clínicas |
| `tratamiento` | string (max 500) | Opcional | Tratamiento prescrito y recomendaciones |

#### Validaciones
- `mascotaId`: Debe ser un número entero mayor a 0
- `enfermedad_id`: **Requerido**, debe ser un número entero
- `fecha_diagnostico`: Formato ISO 8601 (YYYY-MM-DD)
- `observaciones`: Máximo 500 caracteres
- `tratamiento`: Máximo 500 caracteres

#### Response Success (201)
```json
{
  "success": true,
  "data": {
    "enfermedad_mascota_id": 1,
    "mascota_id": 5,
    "enfermedad_id": 3,
    "fecha_diagnostico": "2024-01-15",
    "observaciones": "Presenta síntomas desde hace 3 días. Fiebre alta (40°C), letargo, pérdida de apetito.",
    "tratamiento": "Antibiótico Amoxicilina 250mg cada 12 horas por 7 días. Reposo absoluto. Control en 3 días."
  },
  "message": "Enfermedad registrada exitosamente"
}
```

#### Response Error (400)
```json
{
  "success": false,
  "errors": [
    {
      "field": "enfermedad_id",
      "message": "ID de enfermedad es requerido y debe ser un número entero"
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

### 4. Actualizar Enfermedad
**PUT** `/api/diseases/:mascotaId/:enfermedadId`

Actualiza la información de una enfermedad diagnosticada existente.

#### Requiere Autenticación
✅ Sí

#### Headers
```
Authorization: Bearer {token}
Content-Type: application/json
```

#### URL Parameters
- `mascotaId` (number, requerido): ID de la mascota
- `enfermedadId` (number, requerido): ID del diagnóstico a actualizar

#### Request Body
Todos los campos son opcionales. Solo envía los campos que deseas actualizar:

```json
{
  "observaciones": "Mejoría notable después de 3 días de tratamiento. Temperatura normal.",
  "tratamiento": "Continuar antibiótico 4 días más. Agregar probiótico."
}
```

#### Response Success (200)
```json
{
  "success": true,
  "data": {
    "enfermedad_mascota_id": 1,
    "mascota_id": 5,
    "enfermedad_id": 3,
    "fecha_diagnostico": "2024-01-15",
    "observaciones": "Mejoría notable después de 3 días de tratamiento. Temperatura normal.",
    "tratamiento": "Continuar antibiótico 4 días más. Agregar probiótico."
  },
  "message": "Enfermedad actualizada exitosamente"
}
```

#### Response Error (404)
```json
{
  "success": false,
  "error": "Enfermedad no encontrada o nada que actualizar"
}
```

---

### 5. Eliminar Enfermedad
**DELETE** `/api/diseases/:mascotaId/:enfermedadId`

Elimina un registro de enfermedad del sistema.

#### Requiere Autenticación
✅ Sí

#### Headers
```
Authorization: Bearer {token}
```

#### URL Parameters
- `mascotaId` (number, requerido): ID de la mascota
- `enfermedadId` (number, requerido): ID del diagnóstico a eliminar

#### Response Success (200)
```json
{
  "success": true,
  "message": "Enfermedad eliminada exitosamente"
}
```

#### Response Error (404)
```json
{
  "success": false,
  "error": "Enfermedad no encontrada"
}
```

---

## Endpoints de Catálogos (Públicos - No Requieren Autenticación)

### 6. Obtener Catálogo de Enfermedades por Especie
**GET** `/api/diseases/enfermedades/:id_especie`

Obtiene el catálogo de enfermedades comunes filtrado por especie (perro, gato, etc.).

#### Requiere Autenticación
❌ No

#### URL Parameters
- `id_especie` (string, requerido): ID de la especie (ej: "1" para perros, "2" para gatos)

#### Response Success (200)
```json
{
  "success": true,
  "data": {
    "enfermedades": [
      {
        "enfermedad_id": 1,
        "nombre": "Parvovirus Canino",
        "descripcion": "Infección viral grave que afecta principalmente a cachorros",
        "especie_id": 1
      },
      {
        "enfermedad_id": 2,
        "nombre": "Moquillo",
        "descripcion": "Enfermedad viral altamente contagiosa",
        "especie_id": 1
      },
      {
        "enfermedad_id": 3,
        "nombre": "Otitis",
        "descripcion": "Infección del oído externo o interno",
        "especie_id": 1
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

### Registrar Diagnóstico de Parvovirus
```javascript
const response = await fetch('http://localhost:4000/api/diseases/5', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  credentials: 'include',
  body: JSON.stringify({
    enfermedad_id: 1,
    fecha_diagnostico: '2024-01-15',
    observaciones: 'Cachorro de 3 meses. Vómitos, diarrea con sangre, deshidratación severa. Prueba PCR positiva.',
    tratamiento: 'Hospitalización. Fluidoterapia IV. Antibióticos (Enrofloxacino). Antieméticos. Probióticos. Aislamiento total.'
  })
});

const data = await response.json();
console.log('Enfermedad registrada:', data.data);
```

### Registrar Diagnóstico Básico
```javascript
const response = await fetch('http://localhost:4000/api/diseases/5', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  credentials: 'include',
  body: JSON.stringify({
    enfermedad_id: 3,
    fecha_diagnostico: '2024-02-10',
    observaciones: 'Otitis leve en oído derecho'
  })
});
```

### Consultar Historial de Enfermedades
```bash
curl -X GET http://localhost:4000/api/diseases/5 \
  -H "Authorization: Bearer YOUR_TOKEN" \
  --cookie "token=YOUR_JWT_TOKEN"
```

### Actualizar Evolución del Tratamiento
```javascript
const response = await fetch('http://localhost:4000/api/diseases/5/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  credentials: 'include',
  body: JSON.stringify({
    observaciones: 'Día 5: Mejoría significativa. Sin vómitos. Diarrea disminuyendo. Comienza a comer.',
    tratamiento: 'Continuar antibióticos 3 días más. Dieta blanda. Probióticos por 2 semanas.'
  })
});
```

### Obtener Catálogo de Enfermedades Caninas
```bash
# Sin autenticación (público)
curl http://localhost:4000/api/diseases/enfermedades/1
```

### Obtener Catálogo de Enfermedades Felinas
```bash
curl http://localhost:4000/api/diseases/enfermedades/2
```

---

## Diccionario de Campos

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `enfermedad_mascota_id` | number | Identificador único del diagnóstico |
| `mascota_id` | number | ID de la mascota diagnosticada |
| `enfermedad_id` | number | ID del catálogo de enfermedades |
| `fecha_diagnostico` | date | Fecha del diagnóstico (formato ISO: YYYY-MM-DD) |
| `observaciones` | string | Síntomas, signos clínicos, resultados de análisis (máx 500 caracteres) |
| `tratamiento` | string | Tratamiento prescrito, medicamentos, recomendaciones (máx 500 caracteres) |

---

## Notas Importantes

### Campo Requerido
- **`enfermedad_id`** es el único campo **obligatorio** al registrar una enfermedad
- Todos los demás campos son opcionales

### Observaciones
- Usa este campo para:
  - Describir síntomas observados
  - Anotar signos clínicos
  - Registrar resultados de análisis
  - Documentar evolución
- Máximo 500 caracteres

### Tratamiento
- Usa este campo para:
  - Medicamentos prescritos (dosis y frecuencia)
  - Procedimientos médicos
  - Recomendaciones de cuidados
  - Dieta especial
  - Instrucciones de seguimiento
- Máximo 500 caracteres

### Fechas
- `fecha_diagnostico`: Fecha cuando se diagnosticó
- Formato ISO 8601 (YYYY-MM-DD)
- Almacenadas como tipo `date` en PostgreSQL

### Historial
- Las enfermedades se ordenan por `fecha_diagnostico` descendente
- Los diagnósticos sin fecha aparecen al final
- No hay límite en la cantidad de diagnósticos por mascota

### Catálogos
- Las enfermedades del catálogo están organizadas por especie
- Cada especie tiene enfermedades comunes específicas
- Los catálogos son públicos

### Control de Acceso
- Solo el propietario de la mascota puede ver y gestionar enfermedades
- Verificación automática mediante JWT
- No es posible acceder a diagnósticos de mascotas de otros usuarios

### Actualización Parcial
- El endpoint PUT permite actualizaciones parciales
- Solo envía los campos que deseas modificar
- Los campos no enviados conservan su valor actual

### Eliminación
- La eliminación es permanente
- Considera usar observaciones para marcar como "resuelto" en lugar de eliminar
- Mantener historial es importante para salud a largo plazo

---

## Códigos de Estado HTTP

| Código | Descripción |
|--------|-------------|
| `200` | OK - Operación exitosa |
| `201` | Created - Enfermedad registrada exitosamente |
| `400` | Bad Request - Error de validación |
| `401` | Unauthorized - No autenticado |
| `403` | Forbidden - Sin permisos |
| `404` | Not Found - Mascota o enfermedad no encontrada |
| `500` | Internal Server Error - Error del servidor |

---

## Casos de Uso Comunes

### Diagnóstico Inicial
```json
{
  "enfermedad_id": 1,
  "fecha_diagnostico": "2024-01-15",
  "observaciones": "Diagnóstico confirmado mediante prueba de laboratorio",
  "tratamiento": "Plan de tratamiento completo iniciado"
}
```

### Seguimiento de Tratamiento
```json
{
  "observaciones": "Día 7: Recuperación completa. Sin síntomas. Alta médica.",
  "tratamiento": "Tratamiento completado exitosamente. Control en 1 mes."
}
```

### Enfermedad Crónica
```json
{
  "enfermedad_id": 15,
  "fecha_diagnostico": "2024-01-15",
  "observaciones": "Diabetes diagnosticada. Glucosa: 350 mg/dL",
  "tratamiento": "Insulina 5 UI dos veces al día. Dieta especial. Control de glucosa diario."
}
```

### Registro Sin Fecha
```json
{
  "enfermedad_id": 8,
  "observaciones": "Historial previo antes de adopción",
  "tratamiento": "Tratamiento completado por veterinario anterior"
}
```

---

## Integración con Frontend

### Indicador de Estado
```javascript
function getDiseaseStatus(disease) {
  if (!disease.tratamiento) {
    return { status: 'diagnosticada', color: 'orange', text: 'Sin tratamiento' };
  }
  
  if (disease.observaciones?.toLowerCase().includes('recuperad') || 
      disease.tratamiento?.toLowerCase().includes('completado')) {
    return { status: 'recuperada', color: 'green', text: 'Recuperada' };
  }
  
  return { status: 'en_tratamiento', color: 'blue', text: 'En tratamiento' };
}
```

### Agrupación por Año
```javascript
function groupByYear(diseases) {
  return diseases.reduce((acc, disease) => {
    const year = disease.fecha_diagnostico 
      ? new Date(disease.fecha_diagnostico).getFullYear()
      : 'Sin fecha';
    
    if (!acc[year]) acc[year] = [];
    acc[year].push(disease);
    return acc;
  }, {});
}
```

### Alertas de Enfermedades Graves
```javascript
const ENFERMEDADES_GRAVES = [1, 2, 5, 8]; // IDs de enfermedades críticas

function isGrave(disease) {
  return ENFERMEDADES_GRAVES.includes(disease.enfermedad_id);
}
```

---

**Última actualización**: Enero 2025  
**Versión**: 2.0 - Refactorizada con arquitectura en capas
