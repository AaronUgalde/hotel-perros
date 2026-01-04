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

### 3. Crear Nueva Mascota
**POST** `/api/pets`

Crea una nueva mascota asociada al usuario autenticado.

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

**Última actualización**: Enero 2025
