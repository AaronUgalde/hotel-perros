# 🎨 Implementación Frontend - Crear Mascota Completa

## 📦 Usando FormData en JavaScript/TypeScript

### Ejemplo Completo con React

```typescript
import { useState } from 'react';

interface PetData {
  nombre: string;
  especie_id: number;
  sexo_id: number;
  fecha_nacimiento: string;
  // ... otros campos
}

interface VacunaData {
  vacuna_id?: number;
  nombre_vacuna?: string;
  fecha_aplicacion?: string;
  vigencia_hasta?: string;
  veterinario?: string;
  notas?: string;
}

interface EnfermedadData {
  enfermedad_id: number;
  fecha_diagnostico?: string;
  observaciones?: string;
  tratamiento?: string;
}

interface DocumentoData {
  tipo_documento_id: number | null;
  file: File;
}

const CrearMascotaForm = () => {
  const [pet, setPet] = useState<PetData>({
    nombre: '',
    especie_id: 1,
    sexo_id: 1,
    fecha_nacimiento: ''
  });
  const [vacunas, setVacunas] = useState<VacunaData[]>([]);
  const [enfermedades, setEnfermedades] = useState<EnfermedadData[]>([]);
  const [documentos, setDocumentos] = useState<DocumentoData[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      // 1. Preparar el objeto JSON con toda la info (excepto archivos)
      const data = {
        pet,
        vacunas,
        enfermedades,
        documentos: documentos.map(doc => ({
          tipo_documento_id: doc.tipo_documento_id
        }))
      };

      // 2. Agregar el JSON como string en el campo "data"
      formData.append('data', JSON.stringify(data));

      // 3. Agregar cada archivo
      documentos.forEach(doc => {
        formData.append('documentos', doc.file);
      });

      // 4. Enviar la petición
      const response = await fetch('/api/pets/with-details', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
          // NO incluir 'Content-Type', el navegador lo configura automáticamente
        },
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        alert('Mascota creada exitosamente!');
        console.log('Mascota:', result.data.mascota);
        console.log('Vacunas:', result.data.vacunas);
        console.log('Enfermedades:', result.data.enfermedades);
        console.log('Documentos:', result.data.documentos);
        // Redirigir o limpiar formulario
      } else {
        alert('Error: ' + result.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al crear mascota');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, tipoDocumentoId: number) => {
    const files = Array.from(e.target.files || []);
    const newDocs = files.map(file => ({
      tipo_documento_id: tipoDocumentoId,
      file
    }));
    setDocumentos([...documentos, ...newDocs]);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Formulario de mascota */}
      <input
        type="text"
        value={pet.nombre}
        onChange={(e) => setPet({...pet, nombre: e.target.value})}
        placeholder="Nombre"
        required
      />

      <input
        type="date"
        value={pet.fecha_nacimiento}
        onChange={(e) => setPet({...pet, fecha_nacimiento: e.target.value})}
        required
      />

      {/* Subir archivos */}
      <div>
        <label>Certificado de Vacunación (tipo_documento_id: 1)</label>
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => handleFileChange(e, 1)}
          multiple
        />
      </div>

      <div>
        <label>Foto de Perfil (tipo_documento_id: 2)</label>
        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={(e) => handleFileChange(e, 2)}
        />
      </div>

      {/* Mostrar archivos seleccionados */}
      <div>
        <h3>Archivos seleccionados: {documentos.length}</h3>
        {documentos.map((doc, idx) => (
          <div key={idx}>
            📄 {doc.file.name} ({(doc.file.size / 1024).toFixed(2)} KB)
            <button onClick={() => setDocumentos(documentos.filter((_, i) => i !== idx))}>
              Eliminar
            </button>
          </div>
        ))}
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Creando...' : 'Crear Mascota'}
      </button>
    </form>
  );
};

export default CrearMascotaForm;
```

## 🎯 Ejemplo con Axios


```typescript
import axios from 'axios';

const crearMascotaConAxios = async (pet, vacunas, enfermedades, archivos) => {
  const formData = new FormData();

  // Datos JSON
  const data = {
    pet,
    vacunas,
    enfermedades,
    documentos: archivos.map(f => ({ tipo_documento_id: f.tipo }))
  };
  
  formData.append('data', JSON.stringify(data));

  // Archivos
  archivos.forEach(archivo => {
    formData.append('documentos', archivo.file);
  });

  try {
    const response = await axios.post('/api/pets/with-details', formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        // Axios configura 'Content-Type' automáticamente para FormData
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        console.log(`Upload: ${percentCompleted}%`);
      }
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error:', error.response.data);
    }
    throw error;
  }
};
```

## 📱 Ejemplo con React Hook Form

```typescript
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const CrearMascotaRHF = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
