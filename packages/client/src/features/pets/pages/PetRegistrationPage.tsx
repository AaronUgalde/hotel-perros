import React, { useState, useEffect } from 'react';
import { useAuth } from '../../auth/hooks/useAuth';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { TextArea } from '../../../components/ui/TextArea';
import { FileUpload } from '../../../components/ui/FileUpload';
import { FormSection } from '../../../components/ui/FormSection';
import { VaccineTable, type Vaccine } from '../../../components/ui/VaccineTable';
import { DiseaseTable, type Disease } from '../../../components/ui/DiseaseTable';
import Select from '../../../components/ui/Select';
import gatoRegistrar from '../../../assets/gato_registrar.png';
import {
  petService,
  documentService,
  vaccinationService,
  diseaseService,
} from '../../../services';

interface PetFormData {
  nombre: string;
  especie_id: string;
  raza_id: string;
  sexo_id: string;
  fecha_nacimiento: string;
  peso_kg: string;
  altura_cm: string;
  largo_cm: string;
  patron_pelo_id: string;
  color_principal_id: string;
  color_ojos_id: string;
  numero_chip: string;
  ruac: string;
  esterilizado: boolean;
  senas_particulares: string;
  origen_id: string;
  funcion_id: string;
  mestizo: boolean;
  url_database_chip: string;
  frecuency_chip: string;
}

interface SelectOption {
  value: string;
  label: string;
}

interface FormFiles {
  documentos: { file: File; tipo_documento_id: number }[];
}

export const PetRegistrationForm: React.FC = () => {
  const { user, isLoading } = useAuth();

  // Estados para opciones de los selects
  const [especies, setEspecies] = useState<SelectOption[]>([]);
  const [razas, setRazas] = useState<SelectOption[]>([]);
  const [sexos, setSexos] = useState<SelectOption[]>([]);
  const [patronesPelo, setPatronesPelo] = useState<SelectOption[]>([]);
  const [colores, setColores] = useState<SelectOption[]>([]);
  const [origenes, setOrigenes] = useState<SelectOption[]>([]);
  const [funciones, setFunciones] = useState<SelectOption[]>([]);
  const [tiposDocumentos, setTiposDocumentos] = useState<SelectOption[]>([]);
  const [vacunasDisponibles, setVacunasDisponibles] = useState<SelectOption[]>([]);
  const [enfermedadesDisponibles, setEnfermedadesDisponibles] = useState<SelectOption[]>([]);

  // Estado del formulario
  const [petData, setPetData] = useState<PetFormData>({
    nombre: '',
    especie_id: '',
    raza_id: '',
    sexo_id: '',
    fecha_nacimiento: '',
    peso_kg: '',
    altura_cm: '',
    largo_cm: '',
    patron_pelo_id: '',
    color_principal_id: '',
    color_ojos_id: '',
    numero_chip: '',
    ruac: '',
    esterilizado: false,
    senas_particulares: '',
    origen_id: '',
    funcion_id: '',
    mestizo: false,
    url_database_chip: '',
    frecuency_chip: '',
  });

  const [vaccines, setVaccines] = useState<Vaccine[]>([]);
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [files, setFiles] = useState<FormFiles>({
    documentos: [],
  });

  // Cargar catálogos al montar el componente
  useEffect(() => {
    loadCatalogs();
  }, []);

  // Cargar razas, vacunas y enfermedades cuando cambia la especie
  useEffect(() => {
    if (petData.especie_id) {
      loadRazas(parseInt(petData.especie_id));
      loadVacunas(parseInt(petData.especie_id));
      loadEnfermedades(parseInt(petData.especie_id));
    }
  }, [petData.especie_id]);

  const loadCatalogs = async () => {
    try {
      const [
        especiesData,
        sexosData,
        patronesPeloData,
        coloresData,
        origenesData,
        funcionesData,
        tiposDocData,
      ] = await Promise.all([
        petService.getEspecies(),
        petService.getSexos(),
        petService.getPatronesPelo(),
        petService.getColores(),
        petService.getOrigenMascota(),
        petService.getFuncionMascota(),
        documentService.getTiposDocumentos(),
      ]);

      console.log(patronesPelo)

      setEspecies(
        especiesData.map((e: any) => ({
          value: String(e.especie_id),
          label: e.nombre || e.nombre_especie,
        }))
      );
      setSexos(
        sexosData.map((s: any) => ({
          value: String(s.sexo_id),
          label: s.nombre || s.descripcion || s.nombre_sexo,
        }))
      );
      setPatronesPelo(
        patronesPeloData.map((p: any) => ({
          value: String(p.patron_id),
          label: p.nombre || p.descripcion,
        }))
      );
      setColores(
        coloresData.map((c: any) => ({
          value: String(c.color_id),
          label: c.nombre || c.nombre_color,
        }))
      );
      setOrigenes(
        origenesData.map((o: any) => ({
          value: String(o.origen_id),
          label: o.nombre || o.descripcion,
        }))
      );
      setFunciones(
        funcionesData.map((f: any) => ({
          value: String(f.funcion_id),
          label: f.nombre || f.descripcion,
        }))
      );
      setTiposDocumentos(
        tiposDocData.map((t: any) => ({
          value: String(t.tipo_documento_id),
          label: t.nombre || t.nombre_tipo,
        }))
      );
    } catch (error) {
      console.error('Error cargando catálogos:', error);
      alert('Error al cargar los catálogos. Por favor recargue la página.');
    }
  };

  const loadRazas = async (especieId: number) => {
    try {
      const razasData = await petService.getRazas(especieId);
      setRazas(
        razasData.map((r: any) => ({
          value: String(r.raza_id),
          label: r.nombre || r.nombre_raza,
        }))
      );
    } catch (error) {
      console.error('Error cargando razas:', error);
    }
  };

  const loadVacunas = async (especieId: number) => {
    try {
      const vacunasData = await vaccinationService.getVacunasPorEspecie(especieId);
      setVacunasDisponibles(
        vacunasData.map((v: any) => ({
          value: String(v.vacuna_id),
          label: v.nombre || v.nombre_vacuna,
        }))
      );
    } catch (error) {
      console.error('Error cargando vacunas:', error);
    }
  };

  const loadEnfermedades = async (especieId: number) => {
    try {
      const enfermedadesData = await diseaseService.getEnfermedadesPorEspecie(especieId);
      setEnfermedadesDisponibles(
        enfermedadesData.map((e: any) => ({
          value: String(e.enfermedad_id),
          label: e.nombre,
        }))
      );
    } catch (error) {
      console.error('Error cargando enfermedades:', error);
    }
  };

  const handlePetDataChange = (field: keyof PetFormData, value: string | boolean) => {
    console.log(patronesPelo)
    setPetData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddVaccine = () => {
    const newVaccine: Vaccine = {
      id: Date.now().toString(),
      vaccineId: '',
      name: '',
      inoculationDate: '',
      validityDate: '',
      vetId: '',
    };
    setVaccines((prev) => [...prev, newVaccine]);
  };

  const handleUpdateVaccine = (id: string, field: keyof Vaccine, value: string) => {
    setVaccines((prev) =>
      prev.map((vaccine) => (vaccine.id === id ? { ...vaccine, [field]: value } : vaccine))
    );
  };

  const handleRemoveVaccine = (id: string) => {
    setVaccines((prev) => prev.filter((vaccine) => vaccine.id !== id));
  };

  const handleAddDisease = () => {
    const newDisease: Disease = {
      id: Date.now().toString(),
      diseaseId: '',
      diseaseName: '',
      diagnosisDate: '',
      observations: '',
      treatment: '',
    };
    setDiseases((prev) => [...prev, newDisease]);
  };

  const handleUpdateDisease = (id: string, field: keyof Disease, value: string) => {
    setDiseases((prev) =>
      prev.map((disease) => (disease.id === id ? { ...disease, [field]: value } : disease))
    );
  };

  const handleRemoveDisease = (id: string) => {
    setDiseases((prev) => prev.filter((disease) => disease.id !== id));
  };

  const handleFileAdd = (file: File, tipo_documento_id: string) => {
    setFiles((prev) => ({
      ...prev,
      documentos: [...prev.documentos, { file, tipo_documento_id: parseInt(tipo_documento_id) }],
    }));
  };

  const handleSubmit = async () => {
    try {
      // Verificar que el usuario esté autenticado
      if (!user) {
        alert('Debe iniciar sesión para registrar una mascota');
        return;
      }

      // Validar campos obligatorios
      if (!petData.nombre || !petData.especie_id) {
        alert('Por favor complete los campos obligatorios (Nombre y Especie)');
        return;
      }

      // 1. Registrar la mascota
      const petPayload: any = {
        nombre: petData.nombre,
        especie_id: parseInt(petData.especie_id),
      };

      // Solo agregar campos opcionales si tienen valor (excluir '', null, undefined)
      if (petData.raza_id && petData.raza_id !== '') petPayload.raza_id = parseInt(petData.raza_id);
      if (petData.sexo_id && petData.sexo_id !== '') petPayload.sexo_id = parseInt(petData.sexo_id);
      if (petData.fecha_nacimiento && petData.fecha_nacimiento !== '') petPayload.fecha_nacimiento = petData.fecha_nacimiento;
      if (petData.peso_kg && petData.peso_kg !== '') petPayload.peso_kg = parseFloat(petData.peso_kg);
      if (petData.altura_cm && petData.altura_cm !== '') petPayload.altura_cm = parseFloat(petData.altura_cm);
      if (petData.largo_cm && petData.largo_cm !== '') petPayload.largo_cm = parseFloat(petData.largo_cm);
      if (petData.patron_pelo_id && petData.patron_pelo_id !== '') petPayload.patron_pelo_id = parseInt(petData.patron_pelo_id);
      if (petData.color_principal_id && petData.color_principal_id !== '') petPayload.color_principal_id = parseInt(petData.color_principal_id);
      if (petData.color_ojos_id && petData.color_ojos_id !== '') petPayload.color_ojos_id = parseInt(petData.color_ojos_id);
      if (petData.numero_chip && petData.numero_chip !== '') petPayload.numero_chip = petData.numero_chip;
      if (petData.ruac && petData.ruac !== '') petPayload.ruac = petData.ruac;
      if (petData.esterilizado !== undefined && petData.esterilizado !== null) petPayload.esterilizado = petData.esterilizado;
      if (petData.senas_particulares && petData.senas_particulares !== '') petPayload.senas_particulares = petData.senas_particulares;
      if (petData.origen_id && petData.origen_id !== '') petPayload.origen_id = parseInt(petData.origen_id);
      if (petData.funcion_id && petData.funcion_id !== '') petPayload.funcion_id = parseInt(petData.funcion_id);
      if (petData.mestizo !== undefined && petData.mestizo !== null) petPayload.mestizo = petData.mestizo;
      if (petData.url_database_chip && petData.url_database_chip !== '') petPayload.url_database_chip = petData.url_database_chip;
      if (petData.frecuency_chip && petData.frecuency_chip !== '') petPayload.frecuency_chip = parseFloat(petData.frecuency_chip);

      console.log('Usuario autenticado:', user);
      console.log('Payload a enviar:', petPayload);
      console.log('Payload JSON:', JSON.stringify(petPayload, null, 2));
      console.log('NOTA: El propietario_id se obtiene automáticamente del token en el backend');
      
      const petResponse = await petService.registrarMascota(petPayload);
      const mascotaId = petResponse.mascota_id;

      // 2. Subir documentos
      for (const doc of files.documentos) {
        await documentService.subirDocumento(mascotaId, doc.file, doc.tipo_documento_id);
      }

      // 3. Registrar vacunas
      for (const vaccine of vaccines) {
        if (vaccine.vaccineId || vaccine.inoculationDate) {
          await vaccinationService.agregarVacuna(mascotaId, {
            vacuna_id: vaccine.vaccineId ? parseInt(vaccine.vaccineId) : undefined,
            fecha_aplicacion: vaccine.inoculationDate || undefined,
            vigencia_hasta: vaccine.validityDate || undefined,
            veterinario: vaccine.vetId || undefined,
          });
        }
      }

      // 4. Registrar enfermedades
      for (const disease of diseases) {
        if (disease.diseaseId) {
          await diseaseService.agregarEnfermedad(mascotaId, {
            enfermedad_id: parseInt(disease.diseaseId),
            fecha_diagnostico: disease.diagnosisDate || undefined,
            observaciones: disease.observations || undefined,
            tratamiento: disease.treatment || undefined,
          });
        }
      }

      alert('¡Mascota registrada con éxito!');
      // Opcional: redireccionar o limpiar el formulario
      window.location.href = '/pets'; // O la ruta que corresponda
    } catch (error: any) {
      console.error('Error completo:', error);
      console.error('Response data:', error.response?.data);
      console.error('Response status:', error.response?.status);
      
      const errorMsg = error.response?.data?.error || 
                       error.response?.data?.errors?.[0]?.msg || 
                       error.response?.data?.message ||
                       error.message;
      
      alert(`Error al registrar la mascota: ${errorMsg}`);
    }
  };

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  // Verificar autenticación
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceso restringido</h2>
          <p className="text-gray-600 mb-4">Debe iniciar sesión para registrar una mascota</p>
          <Button
            variant="primary"
            onClick={() => window.location.href = '/login'}
          >
            Ir a iniciar sesión
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Título principal */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Registra a tu mascota</h1>
          <div className="flex justify-center">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <img src={gatoRegistrar} alt="" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sección izquierda - Datos básicos */}
          <FormSection title="Datos indispensables de su mascota" className="h-fit">
            <Input
              label="Nombre del animal *"
              value={petData.nombre}
              onChange={(value) => handlePetDataChange('nombre', value)}
              placeholder="Ingrese el nombre del animal"
              required
            />

            <label className="block mt-4">
              <span className="text-sm font-medium">Especie *</span>
              <Select
                options={especies}
                value={petData.especie_id}
                onChange={(value) => {
                  handlePetDataChange('especie_id', value as string);
                  handlePetDataChange('raza_id', '');
                }}
                placeholder="Seleccionar especie"
                variant="outline"
                size="md"
                className="mt-1"
              />
            </label>

            <label className="block mt-4">
              <span className="text-sm font-medium">Raza del animal</span>
              <Select
                options={razas}
                value={petData.raza_id}
                onChange={(value) => handlePetDataChange('raza_id', value as string)}
                placeholder="Seleccionar raza"
                variant="outline"
                size="md"
                className="mt-1"
                disabled={!petData.especie_id}
              />
            </label>

            <label className="block mt-4">
              <span className="text-sm font-medium flex items-center gap-2">
                ¿Es mestizo?
                <input
                  type="checkbox"
                  checked={petData.mestizo}
                  onChange={(e) => handlePetDataChange('mestizo', e.target.checked)}
                  className="rounded"
                />
              </span>
            </label>

            <label className="block mt-4">
              <span className="text-sm font-medium">Sexo</span>
              <Select
                options={sexos}
                value={petData.sexo_id}
                onChange={(value) => handlePetDataChange('sexo_id', value as string)}
                placeholder="Seleccionar sexo"
                variant="outline"
                size="md"
                className="mt-1"
              />
            </label>

            <Input
              label="Fecha de nacimiento"
              type="date"
              value={petData.fecha_nacimiento}
              onChange={(value) => handlePetDataChange('fecha_nacimiento', value)}
            />

            <label className="block mt-4">
              <span className="text-sm font-medium">Peso (kg)</span>
              <Input
                type="number"
                value={petData.peso_kg}
                onChange={(value) => handlePetDataChange('peso_kg', value)}
                placeholder="Peso en kilogramos"
                className="mt-1"
              />
            </label>

            <label className="block mt-4">
              <span className="text-sm font-medium">Altura (cm)</span>
              <Input
                type="number"
                value={petData.altura_cm}
                onChange={(value) => handlePetDataChange('altura_cm', value)}
                placeholder="Altura en centímetros"
                className="mt-1"
              />
            </label>

            <label className="block mt-4">
              <span className="text-sm font-medium">Largo (cm)</span>
              <Input
                type="number"
                value={petData.largo_cm}
                onChange={(value) => handlePetDataChange('largo_cm', value)}
                placeholder="Largo en centímetros"
                className="mt-1"
              />
            </label>

            <label className="block mt-4">
              <span className="text-sm font-medium">Patrón de pelo</span>
              <Select
                options={patronesPelo}
                value={petData.patron_pelo_id}
                onChange={(value) => handlePetDataChange('patron_pelo_id', value as string)}
                placeholder="Seleccionar patrón de pelo"
                variant="outline"
                size="md"
                className="mt-1"
              />
            </label>

            <label className="block mt-4">
              <span className="text-sm font-medium">Color principal</span>
              <Select
                options={colores}
                value={petData.color_principal_id}
                onChange={(value) =>
                  handlePetDataChange('color_principal_id', value as string)
                }
                placeholder="Seleccionar color principal"
                variant="outline"
                size="md"
                className="mt-1"
              />
            </label>

            <label className="block mt-4">
              <span className="text-sm font-medium">Color de ojos</span>
              <Select
                options={colores}
                value={petData.color_ojos_id}
                onChange={(value) => handlePetDataChange('color_ojos_id', value as string)}
                placeholder="Seleccionar color de ojos"
                variant="outline"
                size="md"
                className="mt-1"
              />
            </label>

            <label className="block mt-4">
              <span className="text-sm font-medium">Origen de la mascota</span>
              <Select
                options={origenes}
                value={petData.origen_id}
                onChange={(value) => handlePetDataChange('origen_id', value as string)}
                placeholder="Seleccionar origen"
                variant="outline"
                size="md"
                className="mt-1"
              />
            </label>

            <label className="block mt-4">
              <span className="text-sm font-medium">Función de la mascota</span>
              <Select
                options={funciones}
                value={petData.funcion_id}
                onChange={(value) => handlePetDataChange('funcion_id', value as string)}
                placeholder="Seleccionar función"
                variant="outline"
                size="md"
                className="mt-1"
              />
            </label>
          </FormSection>

          {/* Sección derecha */}
          <div className="space-y-6">
            {/* Chip y esterilización */}
            <FormSection title="Información de chip y esterilización">
              <Input
                label="Número de chip"
                value={petData.numero_chip}
                onChange={(value) => handlePetDataChange('numero_chip', value)}
                placeholder="Número de identificación del chip"
              />

              <Input
                label="URL de base de datos del chip"
                value={petData.url_database_chip}
                onChange={(value) => handlePetDataChange('url_database_chip', value)}
                placeholder="URL del registro del chip"
              />

              <Input
                label="Frecuencia del chip (kHz)"
                type="number"
                value={petData.frecuency_chip}
                onChange={(value) => handlePetDataChange('frecuency_chip', value)}
                placeholder="Frecuencia en kHz"
              />

              <Input
                label="RUAC (Registro Único de Animales de Compañía)"
                value={petData.ruac}
                onChange={(value) => handlePetDataChange('ruac', value)}
                placeholder="Número RUAC"
              />

              <label className="block mt-4">
                <span className="text-sm font-medium flex items-center gap-2">
                  ¿Está esterilizado?
                  <input
                    type="checkbox"
                    checked={petData.esterilizado}
                    onChange={(e) => handlePetDataChange('esterilizado', e.target.checked)}
                    className="rounded"
                  />
                </span>
              </label>
            </FormSection>

            {/* Señas particulares */}
            <FormSection title="Señas particulares">
              <TextArea
                label="Descripción de señas particulares"
                value={petData.senas_particulares}
                onChange={(value) => handlePetDataChange('senas_particulares', value)}
                placeholder="Describa cualquier característica distintiva de su mascota..."
                rows={4}
                maxLength={500}
              />
            </FormSection>

            {/* Documentos */}
            <FormSection title="Documentos de la mascota">
              <div className="space-y-4">
                {tiposDocumentos.map((tipo) => (
                  <FileUpload
                    key={tipo.value}
                    label={tipo.label}
                    accept=".pdf,.jpg,.jpeg,.png"
                    maxSize={10}
                    onChange={(file) => {
                      if (file) handleFileAdd(file, tipo.value);
                    }}
                  />
                ))}
              </div>
            </FormSection>

            {/* Vacunas */}
            <FormSection
              title="Registro de vacunación"
              description="Registre las vacunas de su mascota"
            >
              <VaccineTable
                vaccines={vaccines}
                vaccineOptions={vacunasDisponibles}
                onAddVaccine={handleAddVaccine}
                onUpdateVaccine={handleUpdateVaccine}
                onRemoveVaccine={handleRemoveVaccine}
              />
            </FormSection>

            {/* Enfermedades */}
            <FormSection
              title="Historial de enfermedades"
              description="Registre las enfermedades que ha padecido su mascota"
            >
              <DiseaseTable
                diseases={diseases}
                diseaseOptions={enfermedadesDisponibles}
                onAddDisease={handleAddDisease}
                onUpdateDisease={handleUpdateDisease}
                onRemoveDisease={handleRemoveDisease}
              />
            </FormSection>
          </div>
        </div>

        {/* Botón de registro */}
        <div className="flex justify-center mt-8">
          <Button
            variant="primary"
            size="lg"
            onClick={handleSubmit}
            className="px-12"
          >
            Registrar a mi mascota
          </Button>
        </div>
      </div>
    </div>
  );
};