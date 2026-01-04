# Rutas de Documentos (Document Routes)

Base URL: `/api/documents`

## Descripción General
Estas rutas manejan la subida, descarga, listado y eliminación de documentos asociados a mascotas. Permite gestionar archivos como certificados veterinarios, cartillas de vacunación, resultados de laboratorio, fotos, etc.

---

## Endpoints de Catálogos (Públicos - No Requieren Autenticación)

### 1. Obtener Tipos de Documentos
**GET** `/api/documents/tipos_documentos`

Obtiene el catálogo de tipos de documentos disponibles.

#### Requiere Autenticación
❌ No

#### Response Success (200)
```json
{
  "success": true,
  "data": {
    "tipos_documentos": [
      {
        "tipo_documento_id": "number",
        "nombre": "string",
        "descripcion": "string"
      }
    ]
  }
}
```

**Ejemplos de tipos**: Certificado veterinario, Cartilla de vacunación, Resultado de laboratorio, Fotografía, Pedigree, etc.

---

## Endpoints CRUD de Documentos (Requieren Autenticación)

### 2. Listar Documentos de una Mascota
**GET** `/api/documents/:mascotaId`

Obtiene todos los documentos asociados a una mascota específica del propietario autenticado.

#### Requiere Autenticación
✅ Sí

#### Headers
```
Authorization: Bearer {token}
```

#### URL Parameters
- `mascotaId` (number, requerido): ID de la mascota

#### Query Parameters
- `tipo_documento_id` (number, opcional): Filtrar por tipo de documento

#### Response Success (200)
```json
{
  "success": true,
  "data": [
    {
      "documento_id": "number",
      "mascota_id": "number",
      "tipo_documento_id": "number",
      "nombre_archivo": "string",
      "ruta_archivo": "string",
      "fecha_subida": "string (ISO date)"
    }
  ]
}
```

**Nota**: Los documentos están ordenados por fecha de subida más reciente primero.

#### Response Error (404)
```json
{
  "success": false,
  "error": "Mascota no encontrada o no pertenece al propietario"
}
```

---

### 3. Subir Documento
**POST** `/api/documents/:mascotaId/upload`

Sube un nuevo documento para una mascota específica.

#### Requiere Autenticación
✅ Sí

#### Headers
```
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

#### URL Parameters
- `mascotaId` (number, requerido): ID de la mascota

#### Form Data (multipart/form-data)
- `file` (File, requerido): Archivo a subir
- `tipo_documento_id` (number, opcional): Tipo de documento

#### Validaciones
- El archivo es requerido (campo: `file`)
- La mascota debe pertenecer al propietario autenticado
- Si la validación falla, el archivo subido se elimina automáticamente

#### Response Success (201)
```json
{
  "success": true,
  "data": {
    "documento_id": "number",
    "mascota_id": "number",
    "tipo_documento_id": "number",
    "nombre_archivo": "string",
    "ruta_archivo": "string",
    "fecha_subida": "string (ISO date)"
  }
}
```

#### Response Error (400)
```json
{
  "success": false,
  "error": "Archivo requerido (campo: file)"
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

### 4. Descargar Documento
**GET** `/api/documents/download/:documentoId`

Descarga un documento específico.

#### Requiere Autenticación
✅ Sí

#### Headers
```
Authorization: Bearer {token}
```

#### URL Parameters
- `documentoId` (number, requerido): ID del documento

#### Response Success (200)
- Devuelve el archivo directamente como descarga
- Content-Type según el tipo de archivo
- Content-Disposition: attachment

#### Response Error (404)
```json
{
  "success": false,
  "error": "Documento no encontrado"
}
```

```json
{
  "success": false,
  "error": "Archivo no encontrado en servidor"
}
```

#### Response Error (403)
```json
{
  "success": false,
  "error": "No autorizado"
}
```

---

### 5. Eliminar Documento
**DELETE** `/api/documents/:documentoId`

Elimina un documento del sistema (registro de BD y archivo físico).

#### Requiere Autenticación
✅ Sí

#### Headers
```
Authorization: Bearer {token}
```

#### URL Parameters
- `documentoId` (number, requerido): ID del documento a eliminar

#### Response Success (200)
```json
{
  "success": true,
  "message": "Documento eliminado exitosamente"
}
```

**Nota**: Se eliminan tanto el registro en la base de datos como el archivo físico del servidor.

#### Response Error (404)
```json
{
  "success": false,
  "error": "Documento no encontrado"
}
```

#### Response Error (403)
```json
{
  "success": false,
  "error": "No autorizado"
}
```

---

## Ejemplos de Uso

### Listar Documentos de una Mascota
```javascript
const response = await fetch('http://localhost:3000/api/documents/123', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

const data = await response.json();
console.log('Documentos:', data.data);
```

### Listar Solo Certificados Veterinarios
```javascript
const response = await fetch('http://localhost:3000/api/documents/123?tipo_documento_id=1', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

### Subir un Documento
```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('tipo_documento_id', '1'); // Certificado veterinario

const response = await fetch('http://localhost:3000/api/documents/123/upload', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  body: formData
});

const data = await response.json();
console.log('Documento subido:', data.data);
```

### Subir Documento con cURL
```bash
curl -X POST http://localhost:3000/api/documents/123/upload \
  -H "Authorization: Bearer {token}" \
  -F "file=@/path/to/certificado.pdf" \
  -F "tipo_documento_id=1"
```

### Descargar un Documento
```javascript
// En el navegador
window.open(`http://localhost:3000/api/documents/download/456?token=${token}`, '_blank');

// Con fetch
const response = await fetch('http://localhost:3000/api/documents/download/456', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

const blob = await response.blob();
const url = window.URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'documento.pdf';
a.click();
```

### Eliminar un Documento
```javascript
const response = await fetch('http://localhost:3000/api/documents/456', {
  method: 'DELETE',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

const data = await response.json();
console.log(data.message); // "Documento eliminado exitosamente"
```

---

## Diccionario de Campos

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `documento_id` | number | Identificador único del documento |
| `mascota_id` | number | ID de la mascota asociada |
| `tipo_documento_id` | number | Tipo de documento (certificado, cartilla, foto, etc.) |
| `nombre_archivo` | string | Nombre original del archivo subido |
| `ruta_archivo` | string | Ruta del archivo en el servidor |
| `fecha_subida` | date | Fecha y hora cuando se subió el documento |

---

## Configuración de Almacenamiento

### Directorio de Subida
- **Variable de entorno**: `UPLOAD_DIR`
- **Valor por defecto**: `./uploads`
- El directorio se crea automáticamente si no existe

### Nombre de Archivos
Los archivos se renombran automáticamente para evitar conflictos:
```
{timestamp}-{random}{extension}
```

**Ejemplo**: `1704567890123-987654321.pdf`

### Tipos de Archivos Soportados
- **PDFs**: Certificados, resultados de laboratorio
- **Imágenes**: JPG, PNG, GIF (fotos de mascotas, rayos X)
- **Documentos**: DOC, DOCX (informes veterinarios)
- **Cualquier tipo**: No hay restricciones en el backend

---

## Notas Importantes

### Seguridad
- ✅ Solo el propietario de la mascota puede subir documentos
- ✅ Solo el propietario puede ver/descargar documentos de sus mascotas
- ✅ Solo el propietario puede eliminar documentos
- ✅ Se verifica la propiedad en cada operación

### Manejo de Errores
- Si falla la subida, el archivo se elimina automáticamente
- Si falla la creación del registro, el archivo se limpia
- Si se elimina un documento, se borra tanto el registro como el archivo físico
- Si el archivo físico no existe, se advierte pero no falla la operación

### Almacenamiento
- Los archivos se almacenan en el sistema de archivos del servidor
- **No se usa almacenamiento en nube** (S3, etc.)
- El directorio debe tener permisos de escritura
- Se recomienda hacer backups regulares del directorio `uploads`

### Limitaciones
- **Sin límite de tamaño configurado** en el código actual
- Se recomienda agregar límite con Multer:
  ```typescript
  const upload = multer({ 
    storage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10 MB
  });
  ```

### Tipos de Documentos Comunes
1. **Certificado Veterinario**: Certificados de salud, vacunación
2. **Cartilla de Vacunación**: Registro de vacunas aplicadas
3. **Resultado de Laboratorio**: Análisis de sangre, orina, etc.
4. **Fotografía**: Fotos de la mascota
5. **Pedigree**: Certificado de pureza de raza
6. **Receta Médica**: Prescripciones veterinarias
7. **Factura**: Comprobantes de servicios veterinarios

### Filtrado por Tipo
Útil para organizar documentos por categoría:
```javascript
// Ver solo certificados
GET /api/documents/123?tipo_documento_id=1

// Ver solo fotos
GET /api/documents/123?tipo_documento_id=4

// Ver todos
GET /api/documents/123
```

### Ordenamiento
Los documentos se retornan ordenados por `fecha_subida DESC` (más recientes primero).

---

## Casos de Uso Comunes

### 1. Galería de Fotos de Mascota
```javascript
// Subir foto
const formData = new FormData();
formData.append('file', photoFile);
formData.append('tipo_documento_id', '4'); // Fotografía

await fetch(`/api/documents/${mascotaId}/upload`, {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${token}` },
  body: formData
});

// Listar solo fotos
const photos = await fetch(`/api/documents/${mascotaId}?tipo_documento_id=4`, {
  headers: { 'Authorization': `Bearer ${token}` }
});
```

### 2. Cartilla de Vacunación Digital
```javascript
// Subir cada certificado de vacuna
for (const vaccine of vaccines) {
  const formData = new FormData();
  formData.append('file', vaccine.file);
  formData.append('tipo_documento_id', '2'); // Cartilla de vacunación
  
  await uploadDocument(mascotaId, formData);
}

// Ver todas las vacunas
const cartilla = await fetch(`/api/documents/${mascotaId}?tipo_documento_id=2`);
```

### 3. Historial Médico Completo
```javascript
// Obtener todos los documentos médicos
const allDocs = await fetch(`/api/documents/${mascotaId}`);

// Organizar por tipo
const organized = {
  certificados: allDocs.filter(d => d.tipo_documento_id === 1),
  laboratorios: allDocs.filter(d => d.tipo_documento_id === 3),
  recetas: allDocs.filter(d => d.tipo_documento_id === 6)
};
```

---

## Mejoras Recomendadas

### 1. Agregar Límite de Tamaño
```typescript
const upload = multer({ 
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
    files: 1
  }
});
```

### 2. Validar Tipos de Archivo
```typescript
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de archivo no permitido'));
    }
  }
});
```

### 3. Generar Thumbnails para Imágenes
Para mejorar el rendimiento al mostrar galerías de fotos.

### 4. Almacenamiento en la Nube
Migrar a S3, Google Cloud Storage o similar para:
- Mejor escalabilidad
- Backups automáticos
- CDN para descargas rápidas

---

## Códigos de Estado HTTP

| Código | Descripción |
|--------|-------------|
| `200` | OK - Operación exitosa |
| `201` | Created - Documento subido exitosamente |
| `400` | Bad Request - Archivo no proporcionado |
| `401` | Unauthorized - No autenticado o token inválido |
| `403` | Forbidden - No tiene permisos para este documento |
| `404` | Not Found - Documento o mascota no encontrada |
| `500` | Internal Server Error - Error del servidor |

---

**Última actualización**: Enero 2025
