import React, { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { TextArea } from '../../../components/ui/TextArea';
import { FileUpload } from '../../../components/ui/FileUpload';
import { FormSection } from '../../../components/ui/FormSection';
import { VaccineTable, type Vaccine } from '../../../components/ui/VaccineTable';
import { ChipSection } from '../../../components/ui/ChipSection';
import Select  from '../../../components/ui/Select';
import { Header } from '../../../components/layout/Header';
import { Footer } from '../../../components/layout/Footer';
import gatoRegistrar from '../../../assets/gato_registrar.png'

// Interfaces para tipos de datos
interface PetFormData {
  petName: string;
  species: string;
  breed: string;
  size: string;
  weight: string;
  sex: string;
  coatType: string;
  birthDate: string;
  lastDewormingDate: string;
  additionalNotes: string;
}

interface ChipData {
  hasChip: boolean;
  chipType: string;
  chipNumber: string;
}

interface FormFiles {
  sterilizationCert: File | null;
  vaccinationCert: File | null;
  photosArchive: File | null;
}

// Opciones para dropdowns
const formOptions = {
  species: [
    { value: 'perro', label: 'Perro' },
    { value: 'gato', label: 'Gato' }
  ],
  breeds: [
    { value: 'poodle', label: 'Poodle' },
    { value: 'labrador', label: 'Labrador' },
    { value: 'golden', label: 'Golden Retriever' }
  ],
  sizes: [
    { value: 'chico', label: 'Chico' },
    { value: 'mediano', label: 'Mediano' },
    { value: 'grande', label: 'Grande' }
  ],
  weights: [
    { value: '5kg', label: '5 kg' },
    { value: '10kg', label: '10 kg' },
    { value: '15kg', label: '15 kg' }
  ],
  sexes: [
    { value: 'macho', label: 'Macho' },
    { value: 'hembra', label: 'Hembra' }
  ],
  coatTypes: [
    { value: 'ondulado', label: 'Ondulado' },
    { value: 'liso', label: 'Liso' },
    { value: 'rizado', label: 'Rizado' }
  ]
};

export const PetRegistrationForm: React.FC = () => {
  // Estados del formulario
  const [petData, setPetData] = useState<PetFormData>({
    petName: '',
    species: '',
    breed: '',
    size: '',
    weight: '',
    sex: '',
    coatType: '',
    birthDate: '',
    lastDewormingDate: '',
    additionalNotes: '',
  });

  const [chipData, setChipData] = useState<ChipData>({
    hasChip: false,
    chipType: '',
    chipNumber: '',
  });

  const [vaccines, setVaccines] = useState<Vaccine[]>([]);

  const [files, setFiles] = useState<FormFiles>({
    sterilizationCert: null,
    vaccinationCert: null,
    photosArchive: null,
  });

  // Handlers para actualizar datos
  const handlePetDataChange = (field: keyof PetFormData, value: string) => {
    setPetData(prev => ({ ...prev, [field]: value }));
  };

  const handleChipDataChange = (data: Partial<ChipData>) => {
    setChipData(prev => ({ ...prev, ...data }));
  };

  const handleFileChange = (field: keyof FormFiles, file: File | null) => {
    setFiles(prev => ({ ...prev, [field]: file }));
  };

  // Handlers para vacunas
  const handleAddVaccine = () => {
    const newVaccine: Vaccine = {
      id: Date.now().toString(),
      name: '',
      inoculationDate: '',
      validityDate: '',
      vetId: '',
    };
    setVaccines(prev => [...prev, newVaccine]);
  };

  const handleUpdateVaccine = (id: string, field: keyof Vaccine, value: string) => {
    setVaccines(prev =>
      prev.map(vaccine =>
        vaccine.id === id ? { ...vaccine, [field]: value } : vaccine
      )
    );
  };

  const handleRemoveVaccine = (id: string) => {
    setVaccines(prev => prev.filter(vaccine => vaccine.id !== id));
  };

  // Handler para envío del formulario
  const handleSubmit = () => {
    const formData = {
      petData,
      chipData,
      vaccines,
      files,
    };
    
    console.log('Datos del formulario:', formData);
    alert('Mascota registrada con éxito!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

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
          <FormSection 
            title="Datos indispensables de su perro"
            className="h-fit"
          >
            <Input
              label="Nombre del animal"
              value={petData.petName}
              onChange={(value) => handlePetDataChange('petName', value)}
              placeholder="Ingrese el nombre del perro"
              required
            />

            <label className="block">
  <span className="text-sm font-medium">Raza del animal</span>
  <Select
    options={formOptions.breeds}
    value={petData.breed}
    onChange={(value) => handlePetDataChange('breed', value as string)}
    placeholder="Seleccionar raza"
    variant="outline"
    size="md"
    className="mt-1"
  />
</label>

<label className="block mt-4">
  <span className="text-sm font-medium">Tamaño del animal</span>
  <Select
    options={formOptions.sizes}
    value={petData.size}
    onChange={(value) => handlePetDataChange('size', value as string)}
    placeholder="Seleccionar tamaño"
    variant="outline"
    size="md"
    className="mt-1"
  />
</label>

<label className="block mt-4">
  <span className="text-sm font-medium">Peso</span>
  <Select
    options={formOptions.weights}
    value={petData.weight}
    onChange={(value) => handlePetDataChange('weight', value as string)}
    placeholder="Seleccionar peso"
    variant="outline"
    size="md"
    className="mt-1"
  />
</label>

<label className="block mt-4">
  <span className="text-sm font-medium">Sexo</span>
  <Select
    options={formOptions.sexes}
    value={petData.sex}
    onChange={(value) => handlePetDataChange('sex', value as string)}
    placeholder="Seleccionar sexo"
    variant="outline"
    size="md"
    className="mt-1"
  />
</label>

<label className="block mt-4">
  <span className="text-sm font-medium">Tipo de pelo</span>
  <Select
    options={formOptions.coatTypes}
    value={petData.coatType}
    onChange={(value) => handlePetDataChange('coatType', value as string)}
    placeholder="Seleccionar tipo de pelo"
    variant="outline"
    size="md"
    className="mt-1"
  />
</label>


            <Input
              label="Fecha de nacimiento"
              type="date"
              value={petData.birthDate}
              onChange={(value) => handlePetDataChange('birthDate', value)}
            />

            <Input
              label="Fecha última desparasitación"
              type="date"
              value={petData.lastDewormingDate}
              onChange={(value) => handlePetDataChange('lastDewormingDate', value)}
            />

            <FileUpload
              label="Fotos de su mascota en un archivo PDF"
              description="Agregar un archivo PDF con 3 fotos de su perro lateral y de frente"
              accept=".pdf"
              maxSize={10}
              onChange={(file) => handleFileChange('photosArchive', file)}
            />
          </FormSection>

          {/* Sección derecha */}
          <div className="space-y-6">
            {/* Certificado de esterilización */}
            <FormSection
              title="Certificado esterilización de su mascota"
              description="Si no tiene el certificado de esterilización puede descargar el certificado en nuestras instalaciones con un costo extra."
            >
              <FileUpload
                label="Certificado de esterilización"
                accept=".pdf"
                maxSize={5}
                onChange={(file) => handleFileChange('sterilizationCert', file)}
              />

              <ChipSection
                chipData={chipData}
                onChipDataChange={handleChipDataChange}
              />

              <TextArea
                label="Notas adicionales sobre su mascota"
                value={petData.additionalNotes}
                onChange={(value) => handlePetDataChange('additionalNotes', value)}
                placeholder="Agregue información adicional sobre su mascota..."
                rows={3}
                maxLength={500}
              />
            </FormSection>

            {/* Certificado de vacunación */}
            <FormSection
              title="Certificado de vacunación escaneado en PDF"
              description="Descargue aquí el certificado de vacunación"
            >
              <FileUpload
                label="Certificado de vacunación"
                accept=".pdf"
                maxSize={5}
                onChange={(file) => handleFileChange('vaccinationCert', file)}
              />

              <VaccineTable
                vaccines={vaccines}
                onAddVaccine={handleAddVaccine}
                onUpdateVaccine={handleUpdateVaccine}
                onRemoveVaccine={handleRemoveVaccine}
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