// features/pets/pages/PetFormWithDetailsPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { petsApi } from '../api';
import type { CreatePetData } from '../types';
import { Button } from '../../../components/ui/Button';
import { ArrowLeft, Save, Plus, X, Upload } from 'lucide-react';

interface Vacuna {
  vacuna_id?: number;
  nombre_vacuna?: string;
  fecha_aplicacion?: string;
  vigencia_hasta?: string;
  veterinario?: string;
  notas?: string;
}

interface Enfermedad {
  enfermedad_id: number;
  fecha_diagnostico?: string;
  observaciones?: string;
  tratamiento?: string;
}

interface Alergia {
  alergia_id: number;
  severidad?: string;
}

interface Desparasitacion {
  tipo?: string;
  producto?: string;
  fecha?: string;
  proxima_fecha?: string;
}

interface Documento {
  tipo_documento_id?: number;
  file?: File;
}

export const PetFormWithDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isEditing = !!id && id !== 'new';

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingCatalogs, setLoadingCatalogs] = useState(true);

  // Catálogos
  const [especies, setEspecies] = useState<any[]>([]);
  const [razas, setRazas] = useState<any[]>([]);
  const [sexos, setSexos] = useState<any[]>([]);
  const [colores, setColores] = useState<any[]>([]);
  const [patronesPelo, setPatronesPelo] = useState<any[]>([]);
  const [origenes, setOrigenes] = useState<any[]>([]);
  const [funciones, setFunciones] = useState<any[]>([]);
  const [vacunas, setVacunas] = useState<any[]>([]);
  const [enfermedades, setEnfermedades] = useState<any[]>([]);
  const [alergias, setAlergias] = useState<any[]>([]);
  const [tiposDocumento, setTiposDocumento] = useState<any[]>([]);

  // Form data
  const [formData, setFormData] = useState<CreatePetData>({
    nombre: '',
    especie_id: 0,
    sexo_id: 0,
    fecha_nacimiento: '',
  });

  // Arrays dinámicos
  const [vacunasData, setVacunasData] = useState<Vacuna[]>([]);
  const [enfermedadesData, setEnfermedadesData] = useState<Enfermedad[]>([]);
  const [alergiasData, setAlergiasData] = useState<Alergia[]>([]);
  const [desparasitacionesData, setDesparasitacionesData] = useState<Desparasitacion[]>([]);
  const [documentosData, setDocumentosData] = useState<Documento[]>([]);
