# Rutas de Mascotas (Pet Routes)

Base URL: `/api/pets`

## Descripción General
Estas rutas manejan las operaciones CRUD para mascotas, así como el acceso a catálogos relacionados con información de mascotas (especies, razas, colores, etc.).

---

## Endpoints CRUD (Requieren Autenticación)

### 1. Obtener Todas las Mascotas
**GET** `/api/pets`

Obtiene todas las mascotas del usuario autenticado.

#### Requiere Autenticación
✅ Sí

#### Headers
```
Authorization: Bearer {token}
```

#### Query Parameters
Ninguno

#### Response Success (200)
```json
{
  "success": true,
  "data": [
    {
      "mascota_id": "number",
      "propietario_id": "number",
      "nombre": "string",
      "especie_id": "number",
      "raza_id": "number",
      "sexo_id": "number",
      "fecha_nacimiento": "string (ISO date)",
      "peso_kg": "number",
      "altura_cm": "number",
      "largo_cm": "number",
      "patron_pelo_id": "number",
      "color_principal_id": "number",
      "color_ojos_id": "number",
      "numero_chip": "number",
      "ruac": "number",
      "esterilizado": "boolean",
      "senas_particulares": "string",
      "fecha_alta": "string (ISO date)",
      "origen_id": "number",
      "funcion_id": "number",
      "mestizo": "boolean",
      "url_database_chip": "number",
      "frecuency_chip": "number"
    }
  ]
}
```

---

### 2. Obtener Mascota por ID
**GET** `/api/pets/:id`

Obtiene los detalles de una mascota específica.

#### Requiere Autenticación
✅ Sí

#### Headers
```
Authorization: Bearer {token}
```

#### URL Parameters
- `id` (number, requerido): ID de la mascota

#### Response Success (200)
```json
{
  "success": true,
  "data": {
    "mascota_id": "number",
    "propietario_id": "number",
    "nombre": "string",
    "especie_id": "number",
    "raza_id": "number",
    "sexo_id": "number",
    "fecha_nacimiento": "string (ISO date)",
    "peso_kg": "number",
    "altura_cm": "number",
    "largo_cm": "number",
    "patron_pelo_id": "number",
    "color_principal_id": "number",
    "color_ojos_id": "number",
    "numero_chip": "number",
    "ruac": "number",
    "esterilizado": "boolean",
    "senas_particulares": "string",
    "fecha_alta": "string (ISO date)",
    "origen_id": "number",
    "funcion_id": "number",
    "mestizo": "boolean",
    "url_database_chip": "number",
    "frecuency_chip": "number"
  }
}
```

#### Response Error (404)
```json
{
  "success": false,
  "error": "Mascota no encontrada"
}
```

---

### 3. Crear Nueva Mascota (Simple)
**POST** `/api/pets`

Crea una nueva mascota asociada al usuario autenticado (sin vacunas, enfermedades ni documentos).

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
  "nombre": "string (requerido)",
  "especie_id": "number (requerido)",
  "sexo_id": "number (requerido)",
  "fecha_nacimiento": "string (ISO date, requerido)",
  "raza_id": "number (opcional)",
  "peso_kg": "number (opcional)",
  "altura_cm": "number (opcional)",
  "largo_cm": "number (opcional)",
  "patron_pelo_id": "number (opcional)",
  "color_principal_id": "number (opcional)",
  "color_ojos_id": "number (opcional)",
  "numero_chip": "number (opcional)",
  "ruac": "number (opcional)",
  "esterilizado": "boolean (opcional)",
  "senas_particulares": "string (opcional)",
  "fecha_alta": "string (ISO date, opcional)",
  "origen_id": "number (opcional)",
  "funcion_id": "number (opcional)",
  "mestizo": "boolean (opcional)",
  "url_database_chip": "number (opcional)",
  "frecuency_chip": "number (opcional)"
}
```

#### Validaciones
- `nombre`: String no vacío (requerido)
- `especie_id`: Integer válido (requerido)
- `sexo_id`: Integer válido (requerido)
- `fecha_nacimiento`: Formato ISO 8601 YYYY-MM-DD (requerido)
- `peso_kg`, `altura_cm`, `largo_cm`: Números positivos si se proporcionan
- `esterilizado`, `mestizo`: Valores booleanos (true/false)
- Todos los `*_id` deben existir en sus respectivos catálogos

#### Response Success (201)
```json
{
  "success": true,
  "data": {
    "mascota_id": "number",
    "propietario_id": "number",
    "nombre": "string",
    "especie_id": "number",
    "raza_id": "number",
    "sexo_id": "number",
    "fecha_nacimiento": "string (ISO date)",
    "peso_kg": "number",
    "altura_cm": "number",
    "largo_cm": "number",
    "patron_pelo_id": "number",
    "color_principal_id": "number",
    "color_ojos_id": "number",
    "numero_chip": "number",
    "ruac": "number",
    "esterilizado": "boolean",
    "senas_particulares": "string",
    "fecha_alta": "string (ISO date)",
    "origen_id": "number",
    "funcion_id": "number",
    "mestizo": "boolean",
    "url_database_chip": "number",
    "frecuency_chip": "number"
  }
}
```

#### Response Error (400)
```json
{
  "success": false,
  "error": "Mensaje de error de validación"
}
```

---

### 3.1. Crear Mascota con Detalles Completos
**POST** `/api/pets/with-details`

Crea una mascota con toda su información relacionada (vacunas, enfermedades y documentos) en una sola transacción atómica. Soporta subida de múltiples archivos.

#### Requiere Autenticación
✅ Sí

#### Headers
```
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

#### 🔥 IMPORTANTE: Usa form-data, NO JSON

Este endpoint usa `multipart/form-data` para soportar subida de archivos.

#### Body (form-data)

| Key | Type | Descripción | Requerido |
|-----|------|-------------|-----------|
| `data` | Text | JSON string con información de mascota, vacunas, enfermedades y metadata de documentos | ✅ Sí |
| `documentos` | File | Archivo a subir (repetir para múltiples archivos) | ❌ No |

#### Estructura del campo "data" (JSON string)

```json
{
  "pet": {
    "nombre": "string (requerido)",
    "especie_id": "number (requerido)",
    "sexo_id": "number (requerido)",
    "fecha_nacimiento": "string ISO date (requerido)",
    "raza_id": "number (opcional)",
    "peso_kg": "number (opcional)",
    "altura_cm": "number (opcional)",
    "largo_cm": "number (opcional)",
    "patron_pelo_id": "number (opcional)",
    "color_principal_id": "number (opcional)",
    "color_ojos_id": "number (opcional)",
    "numero_chip": "number (opcional)",
    "ruac": "number (opcional)",
    "esterilizado": "boolean (opcional)",
    "senas_particulares": "string (opcional)",
    "fecha_alta": "string ISO date (opcional)",
    "origen_id": "number (opcional)",
    "funcion_id": "number (opcional)",
    "mestizo": "boolean (opcional)",
    "url_database_chip": "number (opcional)",
    "frecuency_chip": "number (opcional)"
  },
  "vacunas": [
    {
      "vacuna_id": "number (opcional si existe nombre_vacuna)",
      "nombre_vacuna": "string (opcional si existe vacuna_id)",
      "fecha_aplicacion": "string ISO date (opcional)",
      "vigencia_hasta": "string ISO date (opcional)",
      "veterinario": "string (opcional)",
      "notas": "string (opcional)"
    }
  ],
  "enfermedades": [
    {
      "enfermedad_id": "number (requerido)",
      "fecha_diagnostico": "string ISO date (opcional)",
      "observaciones": "string (opcional)",
      "tratamiento": "string (opcional)"
    }
  ],
  "alergias": [
    {
      "alergia_id": "number (requerido)",
      "severidad": "string (opcional)"
    }
  ],
  "desparasitaciones": [
    {
      "tipo": "string (opcional)",
      "producto": "string (opcional)",
      "fecha": "string ISO date (opcional)",
      "proxima_fecha": "string ISO date (opcional)"
    }
  ],
  "documentos": [
    {
      "tipo_documento_id": "number (opcional)"
    }
  ]
}
```

#### 📸 Configuración en Postman

**Paso 1**: Selecciona Body → **form-data**

**Paso 2**: Agrega los campos:

```
KEY: data
TYPE: Text
VALUE: {"pet":{"nombre":"Rex","especie_id":1,"sexo_id":1,"fecha_nacimiento":"2020-05-15"},"vacunas":[{"vacuna_id":1,"fecha_aplicacion":"2024-01-15"}],"documentos":[{"tipo_documento_id":1}]}
```

**Paso 3**: Agrega archivos (uno por fila):

```
KEY: documentos
TYPE: File
VALUE: [Select File: certificado.pdf]

KEY: documentos
TYPE: File  
VALUE: [Select File: foto.jpg]
```

#### ⚠️ Notas Importantes

1. El **orden** de los archivos debe coincidir con el **orden** del array `documentos` en el JSON
2. Puedes subir hasta **10 archivos** por request
3. Los arrays `vacunas`, `enfermedades`, `alergias`, `desparasitaciones` y `documentos` son **opcionales**
4. Si no envías archivos, simplemente no agregues el campo `documentos` en form-data
5. El servidor guarda los archivos en el directorio `uploads` con nombres únicos

#### Ejemplo Completo para Postman

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Body (form-data):**

| Key | Type | Value |
|-----|------|-------|
| `data` | Text | `{"pet":{"nombre":"Rex","especie_id":1,"sexo_id":1,"fecha_nacimiento":"2020-05-15","peso_kg":25.5,"esterilizado":true},"vacunas":[{"vacuna_id":1,"nombre_vacuna":"Rabia","fecha_aplicacion":"2024-01-15","vigencia_hasta":"2025-01-15","veterinario":"Dr. García"}],"enfermedades":[{"enfermedad_id":3,"fecha_diagnostico":"2023-08-20","observaciones":"Alergia estacional"}],"alergias":[{"alergia_id":1,"severidad":"Alta"},{"alergia_id":8,"severidad":"Moderada"}],"desparasitaciones":[{"tipo":"Interna","producto":"Drontal Plus","fecha":"2024-12-15","proxima_fecha":"2025-03-15"}],"documentos":[{"tipo_documento_id":1},{"tipo_documento_id":2}]}` |
| `documentos` | File | certificado_vacunacion.pdf |
| `documentos` | File | foto_perfil.jpg |

#### Response Success (201)

```json
{
  "success": true,
  "message": "Mascota creada exitosamente con todos sus detalles",
  "data": {
    "mascota": {
      "mascota_id": 42,
      "propietario_id": 15,
      "nombre": "Rex",
      "especie_id": 1,
      "sexo_id": 1,
      "fecha_nacimiento": "2020-05-15T00:00:00.000Z",
      "peso_kg": 25.5,
      "esterilizado": true,
      "raza_id": null,
      "altura_cm": null,
      "largo_cm": null,
      "patron_pelo_id": null,
      "color_principal_id": null,
      "color_ojos_id": null,
      "numero_chip": null,
      "ruac": null,
      "senas_particulares": null,
      "fecha_alta": null,
      "origen_id": null,
      "funcion_id": null,
      "mestizo": null,
      "url_database_chip": null,
      "frecuency_chip": null
    },
    "vacunas": [
      {
        "vacuna_mascota_id": 101,
        "mascota_id": 42,
        "vacuna_id": 1,
        "nombre_vacuna": "Rabia",
        "fecha_aplicacion": "2024-01-15T00:00:00.000Z",
        "vigencia_hasta": "2025-01-15T00:00:00.000Z",
        "veterinario": "Dr. García",
        "notas": null
      }
    ],
    "enfermedades": [
      {
        "enfermedad_mascota_id": 55,
        "mascota_id": 42,
        "enfermedad_id": 3,
        "fecha_diagnostico": "2023-08-20T00:00:00.000Z",
        "observaciones": "Alergia estacional",
        "tratamiento": null
      }
    ],
    "alergias": [
      {
        "mascota_id": 42,
        "alergia_id": 1,
        "severidad": "Alta"
      },
      {
        "mascota_id": 42,
        "alergia_id": 8,
        "severidad": "Moderada"
      }
    ],
    "desparasitaciones": [
      {
        "desparasitacion_id": 33,
        "mascota_id": 42,
        "tipo": "Interna",
        "producto": "Drontal Plus",
        "fecha": "2024-12-15T00:00:00.000Z",
        "proxima_fecha": "2025-03-15T00:00:00.000Z"
      }
    ],
    "documentos": [
      {
        "documento_id": 88,
        "mascota_id": 42,
        "tipo_documento_id": 1,
        "nombre_archivo": "certificado_vacunacion.pdf",
        "ruta_archivo": "uploads/1736109234567-123456789.pdf",
        "fecha_subida": "2025-01-05T20:30:00.000Z"
      },
      {
        "documento_id": 89,
        "mascota_id": 42,
        "tipo_documento_id": 2,
        "nombre_archivo": "foto_perfil.jpg",
        "ruta_archivo": "uploads/1736109234890-987654321.jpg",
        "fecha_subida": "2025-01-05T20:30:00.000Z"
      }
    ]
  }
}
```

#### Casos de Uso en Postman

##### Caso 1: Solo mascota (sin archivos ni relaciones)
**Body (form-data):**
```
KEY: data
TYPE: Text
VALUE: {"pet":{"nombre":"Luna","especie_id":1,"sexo_id":2,"fecha_nacimiento":"2021-03-10"}}
```

##### Caso 2: Mascota con vacunas (sin archivos)
**Body (form-data):**
```
KEY: data
TYPE: Text
VALUE: {"pet":{"nombre":"Max","especie_id":1,"sexo_id":1,"fecha_nacimiento":"2019-07-20"},"vacunas":[{"vacuna_id":1,"fecha_aplicacion":"2024-01-10"}]}
```

##### Caso 3: Mascota completa con alergias, desparasitaciones y 3 archivos
**Body (form-data):**
```
KEY: data
TYPE: Text
VALUE: {"pet":{"nombre":"Rocky","especie_id":1,"sexo_id":1,"fecha_nacimiento":"2018-11-05"},"vacunas":[{"vacuna_id":1,"fecha_aplicacion":"2024-01-15"}],"enfermedades":[{"enfermedad_id":2,"fecha_diagnostico":"2023-06-10"}],"alergias":[{"alergia_id":1,"severidad":"Alta"}],"desparasitaciones":[{"tipo":"Interna","producto":"Drontal","fecha":"2024-12-01","proxima_fecha":"2025-03-01"}],"documentos":[{"tipo_documento_id":1},{"tipo_documento_id":2},{"tipo_documento_id":3}]}

KEY: documentos
TYPE: File
VALUE: certificado.pdf

KEY: documentos
TYPE: File
VALUE: historial_medico.pdf

KEY: documentos
TYPE: File
VALUE: foto.jpg
```

#### Response Error (400) - Validación Fallida
```json
{
  "success": false,
  "errors": [
    {
      "field": "pet.nombre",
      "message": "Nombre de mascota es requerido"
    }
  ]
}
```

#### Response Error (500) - Error en Transacción
```json
{
  "success": false,
  "error": "Error al crear mascota: [detalle del error]"
}
```

#### 💡 Ventajas de este Endpoint

1. ✅ **Una sola petición HTTP** - Más rápido y eficiente
2. ✅ **Transaccional** - Todo se crea o nada se crea (rollback automático)
3. ✅ **Subida directa de archivos** - No necesitas guardar archivos primero
4. ✅ **Menos código en frontend** - Simplifica la lógica del cliente
5. ✅ **Mejor UX** - El usuario no espera múltiples respuestas

---

### 4. Actualizar Mascota
**PUT** `/api/pets/:id`

Actualiza la información de una mascota existente.

#### Requiere Autenticación
✅ Sí

#### Headers
```
Authorization: Bearer {token}
Content-Type: application/json
```

#### URL Parameters
- `id` (number, requerido): ID de la mascota a actualizar

#### Request Body
Todos los campos son opcionales. Solo envía los campos que deseas actualizar:

```json
{
  "nombre": "string (opcional)",
  "especie_id": "number (opcional)",
  "raza_id": "number (opcional)",
  "sexo_id": "number (opcional)",
  "fecha_nacimiento": "string (ISO date, opcional)",
  "peso_kg": "number (opcional)",
  "altura_cm": "number (opcional)",
  "largo_cm": "number (opcional)",
  "patron_pelo_id": "number (opcional)",
  "color_principal_id": "number (opcional)",
  "color_ojos_id": "number (opcional)",
  "numero_chip": "number (opcional)",
  "ruac": "number (opcional)",
  "esterilizado": "boolean (opcional)",
  "senas_particulares": "string (opcional)",
  "fecha_alta": "string (ISO date, opcional)",
  "origen_id": "number (opcional)",
  "funcion_id": "number (opcional)",
  "mestizo": "boolean (opcional)",
  "url_database_chip": "number (opcional)",
  "frecuency_chip": "number (opcional)"
}
```

#### Response Success (200)
```json
{
  "success": true,
  "data": {
    "mascota_id": "number",
    "propietario_id": "number",
    "nombre": "string",
    "especie_id": "number",
    "raza_id": "number",
    "sexo_id": "number",
    "fecha_nacimiento": "string (ISO date)",
    "peso_kg": "number",
    "altura_cm": "number",
    "largo_cm": "number",
    "patron_pelo_id": "number",
    "color_principal_id": "number",
    "color_ojos_id": "number",
    "numero_chip": "number",
    "ruac": "number",
    "esterilizado": "boolean",
    "senas_particulares": "string",
    "fecha_alta": "string (ISO date)",
    "origen_id": "number",
    "funcion_id": "number",
    "mestizo": "boolean",
    "url_database_chip": "number",
    "frecuency_chip": "number"
  }
}
```

---

### 5. Eliminar Mascota
**DELETE** `/api/pets/:id`

Elimina una mascota del sistema.

#### Requiere Autenticación
✅ Sí

#### Headers
```
Authorization: Bearer {token}
```

#### URL Parameters
- `id` (number, requerido): ID de la mascota a eliminar

#### 📸 Ejemplo en Postman

**Method:** DELETE
**URL:** `http://localhost:3000/api/pets/123`
**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Response Success (200)
```json
{
  "success": true,
  "message": "Mascota eliminada exitosamente"
}
```

#### Response Error (404)
```json
{
  "success": false,
  "error": "Mascota no encontrada"
}
```

---

## Endpoints de Catálogos (Públicos - No Requieren Autenticación)

### 6. Obtener Sexos
**GET** `/api/pets/catalogs/sexos`

Obtiene el catálogo de sexos disponibles.

#### Requiere Autenticación
❌ No

#### Response Success (200)
```json
{
  "success": true,
  "data": {
    "sexos": [
      {
        "id": "number",
        "nombre": "string"
      }
    ]
  }
}
```

---

### 7. Obtener Patrones de Pelo
**GET** `/api/pets/catalogs/patron_pelo`

Obtiene el catálogo de patrones de pelo disponibles.

#### Requiere Autenticación
❌ No

#### Response Success (200)
```json
{
  "success": true,
  "data": {
    "patron_pelo": [
      {
        "id": "number",
        "nombre": "string"
      }
    ]
  }
}
```

---

### 8. Obtener Orígenes de Mascota
**GET** `/api/pets/catalogs/origen_mascota`

Obtiene el catálogo de orígenes de mascota (adoptado, comprado, rescatado, etc.).

#### Requiere Autenticación
❌ No

#### Response Success (200)
```json
{
  "success": true,
  "data": {
    "origen_mascota": [
      {
        "id": "number",
        "nombre": "string"
      }
    ]
  }
}
```

---

### 9. Obtener Funciones de Mascota
**GET** `/api/pets/catalogs/funcion_mascota`

Obtiene el catálogo de funciones de mascota (compañía, guardia, trabajo, etc.).

#### Requiere Autenticación
❌ No

#### Response Success (200)
```json
{
  "success": true,
  "data": {
    "funcion_mascota": [
      {
        "id": "number",
        "nombre": "string"
      }
    ]
  }
}
```

---

### 10. Obtener Colores
**GET** `/api/pets/catalogs/colores`

Obtiene el catálogo de colores disponibles para mascotas.

#### Requiere Autenticación
❌ No

#### Response Success (200)
```json
{
  "success": true,
  "data": {
    "colores": [
      {
        "id": "number",
        "nombre": "string"
      }
    ]
  }
}
```

---

### 11. Obtener Especies
**GET** `/api/pets/catalogs/especies`

Obtiene el catálogo de especies disponibles (perro, gato, etc.).

#### Requiere Autenticación
❌ No

#### Response Success (200)
```json
{
  "success": true,
  "data": {
    "especies": [
      {
        "id": "number",
        "nombre": "string"
      }
    ]
  }
}
```

---

### 12. Obtener Razas por Especie
**GET** `/api/pets/catalogs/razas/:id_especie`

Obtiene el catálogo de razas filtrado por una especie específica.

#### Requiere Autenticación
❌ No

#### URL Parameters
- `id_especie` (number, requerido): ID de la especie

#### Response Success (200)
```json
{
  "success": true,
  "data": {
    "razas": [
      {
        "id": "number",
        "nombre": "string",
        "especie_id": "number"
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

### Crear una Mascota Completa
```javascript
const response = await fetch('http://localhost:3000/api/pets', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    nombre: 'Rex',
    especie_id: 1,
    raza_id: 15,
    sexo_id: 1,
    fecha_nacimiento: '2021-05-15',
    peso_kg: 25.5,
    altura_cm: 60,
    largo_cm: 80,
    patron_pelo_id: 1,
    color_principal_id: 2,
    color_ojos_id: 3,
    numero_chip: 123456789,
    ruac: 987654321,
    esterilizado: true,
    senas_particulares: 'Mancha blanca en el pecho',
    fecha_alta: '2025-01-01',
    origen_id: 1,
    funcion_id: 2,
    mestizo: false,
    url_database_chip: 111222,
    frecuency_chip: 134200
  })
});

const data = await response.json();
console.log('Mascota creada:', data.data);
```

### Crear una Mascota con Campos Mínimos
```javascript
const response = await fetch('http://localhost:3000/api/pets', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    nombre: 'Max',
    especie_id: 1,
    sexo_id: 1,
    fecha_nacimiento: '2022-03-10'
  })
});

const data = await response.json();
```

### Obtener Razas de Perros (id_especie = 1)
```bash
curl http://localhost:3000/api/pets/catalogs/razas/1
```

### Actualizar Peso y Medidas
```javascript
const response = await fetch('http://localhost:3000/api/pets/123', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    peso_kg: 27.3,
    altura_cm: 62,
    largo_cm: 82
  })
});
```

### Actualizar Estado de Esterilización
```javascript
const response = await fetch('http://localhost:3000/api/pets/123', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    esterilizado: true,
    fecha_alta: '2025-01-15'
  })
});
```

---

## Diccionario de Campos

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `mascota_id` | number | Identificador único de la mascota |
| `propietario_id` | number | ID del propietario de la mascota |
| `nombre` | string | Nombre de la mascota |
| `especie_id` | number | ID de la especie (perro, gato, etc.) |
| `raza_id` | number | ID de la raza específica |
| `sexo_id` | number | ID del sexo (macho, hembra) |
| `fecha_nacimiento` | date | Fecha de nacimiento en formato ISO (YYYY-MM-DD) |
| `peso_kg` | number | Peso en kilogramos |
| `altura_cm` | number | Altura en centímetros |
| `largo_cm` | number | Largo en centímetros |
| `patron_pelo_id` | number | ID del patrón de pelo (liso, rizado, etc.) |
| `color_principal_id` | number | ID del color principal del pelaje |
| `color_ojos_id` | number | ID del color de ojos |
| `numero_chip` | number | Número del microchip de identificación |
| `ruac` | number | Registro Único de Animales de Compañía |
| `esterilizado` | boolean | Indica si la mascota está esterilizada |
| `senas_particulares` | string | Descripción de señas particulares o características únicas |
| `fecha_alta` | date | Fecha de registro en el sistema |
| `origen_id` | number | ID del origen (adoptado, comprado, rescatado, etc.) |
| `funcion_id` | number | ID de la función (compañía, guardia, trabajo, etc.) |
| `mestizo` | boolean | Indica si es un animal mestizo o de raza pura |
| `url_database_chip` | number | URL de la base de datos del chip |
| `frecuency_chip` | number | Frecuencia del chip en Hz |

---

## Notas Importantes

### Campos Requeridos
Solo 4 campos son obligatorios al crear una mascota:
- `nombre` (string)
- `especie_id` (number)
- `sexo_id` (number)
- `fecha_nacimiento` (date ISO)

Todos los demás campos son opcionales y pueden agregarse posteriormente mediante actualización.

### Medidas Físicas
- `peso_kg`: Peso en kilogramos (acepta decimales, ej: 25.5)
- `altura_cm`: Altura a la cruz en centímetros
- `largo_cm`: Largo del cuerpo en centímetros

### Identificación
- `numero_chip`: Código numérico del microchip
- `ruac`: Registro Único de Animales de Compañía (México)
- `url_database_chip` y `frecuency_chip`: Información técnica del chip

### Fechas
- `fecha_nacimiento`: Se usa para calcular la edad actual de la mascota
- `fecha_alta`: Fecha en que la mascota se registró en el sistema

### Catálogos
- Todas las rutas de catálogos son públicas (no requieren autenticación)
- Los catálogos están ordenados alfabéticamente por nombre
- Las razas están filtradas por especie para mostrar solo opciones relevantes

### Validaciones
- Los campos numéricos (`peso_kg`, `altura_cm`, `largo_cm`) solo aceptan valores positivos
- Los campos booleanos (`esterilizado`, `mestizo`) solo aceptan `true` o `false`
- Las fechas deben estar en formato ISO 8601 (YYYY-MM-DD)
- Todos los IDs de relaciones deben existir en sus respectivos catálogos

### Actualización Parcial
- El endpoint PUT permite actualizaciones parciales
- Solo envía los campos que deseas modificar
- No es necesario enviar todos los campos en cada actualización
- Los campos no enviados conservan su valor actual

### Seguridad
- Todas las operaciones CRUD requieren autenticación
- Cada usuario solo puede ver y modificar sus propias mascotas
- El `propietario_id` se asigna automáticamente desde el token de autenticación

---

## Códigos de Estado HTTP

| Código | Descripción |
|--------|-------------|
| `200` | OK - Operación exitosa |
| `201` | Created - Mascota creada exitosamente |
| `400` | Bad Request - Error en los datos enviados |
| `401` | Unauthorized - No autenticado o token inválido |
| `403` | Forbidden - No tiene permisos para esta mascota |
| `404` | Not Found - Mascota no encontrada |
| `500` | Internal Server Error - Error del servidor |

---

## 🧪 Guía de Pruebas en Postman

### Configuración Inicial

1. **Crear un Environment en Postman**
   - Variable `base_url`: `http://localhost:3000/api`
   - Variable `token`: Tu JWT token (obtenido del login)

2. **Agregar Headers Globales**
   - `Authorization`: `Bearer {{token}}`

### Flujo Completo de Prueba

#### 1️⃣ Obtener Token de Autenticación
```
POST {{base_url}}/auth/login
Body (JSON):
{
  "email": "tu@email.com",
  "password": "tuPassword"
}
```
Copia el token de la respuesta y actualiza tu variable `{{token}}`.

#### 2️⃣ Consultar Catálogos (No requieren auth)

**Obtener especies:**
```
GET {{base_url}}/pets/catalogs/especies
```

**Obtener sexos:**
```
GET {{base_url}}/pets/catalogs/sexos
```

**Obtener razas de perros (especie_id = 1):**
```
GET {{base_url}}/pets/catalogs/razas/1
```

#### 3️⃣ Crear Mascota Simple

```
POST {{base_url}}/pets
Headers:
  Authorization: Bearer {{token}}
  Content-Type: application/json
Body:
{
  "nombre": "Luna",
  "especie_id": 1,
  "sexo_id": 2,
  "fecha_nacimiento": "2021-03-10"
}
```

#### 4️⃣ Crear Mascota Completa con Archivos

**IMPORTANTE: Cambiar Body a form-data**

```
POST {{base_url}}/pets/with-details
Headers:
  Authorization: Bearer {{token}}
Body (form-data):
  
KEY: data
TYPE: Text
VALUE:
{
  "pet": {
    "nombre": "Rex",
    "especie_id": 1,
    "sexo_id": 1,
    "fecha_nacimiento": "2020-05-15",
    "peso_kg": 25.5,
    "esterilizado": true,
    "senas_particulares": "Mancha blanca en el pecho"
  },
  "vacunas": [
    {
      "vacuna_id": 1,
      "nombre_vacuna": "Rabia",
      "fecha_aplicacion": "2024-01-15",
      "vigencia_hasta": "2025-01-15",
      "veterinario": "Dr. García",
      "notas": "Primera dosis anual"
    }
  ],
  "enfermedades": [
    {
      "enfermedad_id": 3,
      "fecha_diagnostico": "2023-08-20",
      "observaciones": "Alergia estacional leve",
      "tratamiento": "Antihistamínicos según prescripción"
    }
  ],
  "documentos": [
    {
      "tipo_documento_id": 1
    },
    {
      "tipo_documento_id": 2
    }
  ]
}

KEY: documentos
TYPE: File
VALUE: [Select File: certificado.pdf]

KEY: documentos
TYPE: File
VALUE: [Select File: foto.jpg]
```

#### 5️⃣ Listar Mis Mascotas

```
GET {{base_url}}/pets
Headers:
  Authorization: Bearer {{token}}
```

#### 6️⃣ Obtener Detalle de una Mascota

```
GET {{base_url}}/pets/42
Headers:
  Authorization: Bearer {{token}}
```

#### 7️⃣ Actualizar Mascota

```
PUT {{base_url}}/pets/42
Headers:
  Authorization: Bearer {{token}}
  Content-Type: application/json
Body:
{
  "peso_kg": 27.3,
  "altura_cm": 62,
  "esterilizado": true
}
```

#### 8️⃣ Eliminar Mascota

```
DELETE {{base_url}}/pets/42
Headers:
  Authorization: Bearer {{token}}
```

### 📋 Collection de Postman (Importar)

Puedes importar esta collection completa en Postman:

```json
{
  "info": {
    "name": "Hotel Perros - Pet Routes",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Mascotas",
      "item": [
        {
          "name": "Listar Mascotas",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{token}}"
              }
            ],
            "url": {
              "raw": "{{base_url}}/pets",
              "host": ["{{base_url}}"],
              "path": ["pets"]
            }
          }
        },
        {
          "name": "Crear Mascota Simple",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{token}}"
              },
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"nombre\": \"Luna\",\n  \"especie_id\": 1,\n  \"sexo_id\": 2,\n  \"fecha_nacimiento\": \"2021-03-10\"\n}"
            },
            "url": {
              "raw": "{{base_url}}/pets",
              "host": ["{{base_url}}"],
              "path": ["pets"]
            }
          }
        },
        {
          "name": "Crear Mascota Completa (con archivos)",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{token}}"
              }
            ],
            "body": {
              "mode": "formdata",
              "formdata": [
                {
                  "key": "data",
                  "value": "{\"pet\":{\"nombre\":\"Rex\",\"especie_id\":1,\"sexo_id\":1,\"fecha_nacimiento\":\"2020-05-15\"},\"vacunas\":[{\"vacuna_id\":1,\"fecha_aplicacion\":\"2024-01-15\"}],\"documentos\":[{\"tipo_documento_id\":1}]}",
                  "type": "text"
                },
                {
                  "key": "documentos",
                  "type": "file",
                  "src": []
                }
              ]
            },
            "url": {
              "raw": "{{base_url}}/pets/with-details",
              "host": ["{{base_url}}"],
              "path": ["pets", "with-details"]
            }
          }
        },
        {
          "name": "Actualizar Mascota",
          "request": {
            "method": "PUT",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{token}}"
              },
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"peso_kg\": 27.3,\n  \"esterilizado\": true\n}"
            },
            "url": {
              "raw": "{{base_url}}/pets/:id",
              "host": ["{{base_url}}"],
              "path": ["pets", ":id"],
              "variable": [
                {
                  "key": "id",
                  "value": "42"
                }
              ]
            }
          }
        }
      ]
    },
    {
      "name": "Catálogos",
      "item": [
        {
          "name": "Obtener Especies",
          "request": {
            "method": "GET",
            "url": {
              "raw": "{{base_url}}/pets/catalogs/especies",
              "host": ["{{base_url}}"],
              "path": ["pets", "catalogs", "especies"]
            }
          }
        },
        {
          "name": "Obtener Sexos",
          "request": {
            "method": "GET",
            "url": {
              "raw": "{{base_url}}/pets/catalogs/sexos",
              "host": ["{{base_url}}"],
              "path": ["pets", "catalogs", "sexos"]
            }
          }
        },
        {
          "name": "Obtener Razas por Especie",
          "request": {
            "method": "GET",
            "url": {
              "raw": "{{base_url}}/pets/catalogs/razas/:id_especie",
              "host": ["{{base_url}}"],
              "path": ["pets", "catalogs", "razas", ":id_especie"],
              "variable": [
                {
                  "key": "id_especie",
                  "value": "1"
                }
              ]
            }
          }
        }
      ]
    }
  ]
}
```

### 🐛 Errores Comunes en Postman

#### Error: "Cannot read property 'propietario_id' of undefined"
**Causa:** Token inválido o expirado
**Solución:** Vuelve a hacer login y actualiza el token

#### Error: "Unexpected field 'documentos'"
**Causa:** El middleware multer no está configurado correctamente
**Solución:** Verifica que la ruta tenga `upload.array('documentos', 10)`

#### Error: "Invalid JSON in 'data' field"
**Causa:** El campo `data` no es un JSON válido
**Solución:** Usa un validador JSON online para verificar el formato

#### Error: "ENOENT: no such file or directory"
**Causa:** La carpeta `uploads` no existe
**Solución:** Crea la carpeta manualmente o reinicia el servidor

#### Error: 413 - Payload Too Large
**Causa:** Los archivos son muy grandes
**Solución:** Reduce el tamaño de los archivos o ajusta el límite en el servidor

### 💡 Tips de Postman

1. **Usa Pre-request Scripts para generar datos dinámicos:**
```javascript
pm.environment.set("timestamp", new Date().toISOString().split('T')[0]);
```

2. **Usa Tests para validar respuestas:**
```javascript
pm.test("Status code is 201", function () {
    pm.response.to.have.status(201);
});

pm.test("Response has mascota_id", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data.mascota).to.have.property('mascota_id');
});
```

3. **Guarda el mascota_id automáticamente:**
```javascript
var jsonData = pm.response.json();
pm.environment.set("last_pet_id", jsonData.data.mascota.mascota_id);
```

4. **Usa {{last_pet_id}} en las siguientes requests**

---

**Última actualización**: Enero 2025
