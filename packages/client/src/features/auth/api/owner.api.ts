// features/auth/api/owner.api.ts
import api from '../../../lib/api';

export interface TelefonoRegistro {
  numero: string;
  tipo_telefono_id: number;
  nombre_contacto: string;
  relacion_contacto: string;
  es_principal: boolean;
  notas?: string;
}

export interface DireccionRegistro {
  tipo_domicilio_id: number;
  calle: string;
  num_exterior: string;
  num_interior?: string;
  codigo_postal: string;
  colonia_id: number;
  estado_id: number;
  municipio_id: number;
  fecha_inicio: string;
  fecha_fin?: string | null;
  es_predeterminada: boolean;
  notas?: string;
}

export interface PropietarioCompleto {
  correo_electronico: string;
  password: string;
  nombre: string;
  primer_apellido: string;
  segundo_apellido?: string;
}

export interface RegistroCompletoData {
  propietario: PropietarioCompleto;
  telefonos: TelefonoRegistro[];
  direcciones?: DireccionRegistro[];
}

export interface CatalogoOwner {
  id: number;
  nombre: string;
}

export interface CodigoPostalInfo {
  colonias: CatalogoOwner[];
  municipio: string;
  municipio_id: number;
  estado: string;
  estado_id: number;
}

export const ownerApi = {
  /**
   * Registro completo de propietario con teléfonos y direcciones
   */
  registerComplete: async (data: RegistroCompletoData) => {
    const response = await api.post('/owners/register-complete', data);
    return response.data;
  },

  /**
   * Obtener tipos de teléfono
   */
  getTiposTelefono: async (): Promise<CatalogoOwner[]> => {
    const response = await api.get('/phones/tipos');
    return response.data.data.tipos_telefono.map((t: any) => ({
      id: t.tipo_telefono_id,
      nombre: t.nombre,
    }));
  },

  /**
   * Obtener tipos de domicilio
   */
  getTiposDomicilio: async (): Promise<CatalogoOwner[]> => {
    const response = await api.get('/directions/tipos');
    return response.data.data.tipos_domicilio.map((t: any) => ({
      id: t.tipo_domicilio_id,
      nombre: t.nombre,
    }));
  },

  /**
   * Buscar información por código postal
   */
  buscarCodigoPostal: async (cp: string): Promise<CodigoPostalInfo> => {
    const response = await api.get(`/directions/codigo-postal/${cp}`);
    return response.data.data;
  },

  /**
   * Obtener estados
   */
  getEstados: async (): Promise<CatalogoOwner[]> => {
    const response = await api.get('/directions/estados');
    return response.data.data.map((t: any) => ({
      id: t.id,
      nombre: t.nombre,
    }));
  },

  /**
   * Obtener municipios por estado
   */
  getMunicipios: async (estadoId: number): Promise<CatalogoOwner[]> => {
    const response = await api.get(`/directions/municipios/${estadoId}`);
    return response.data.municipios || response.data;
  },

  /**
   * Obtener colonias por municipio y código postal
   */
  getColonias: async (municipioId: number, codigoPostal: string): Promise<CatalogoOwner[]> => {
    const response = await api.get(`/directions/colonias/${municipioId}/${codigoPostal}`);
    return response.data.colonias || response.data;
  },
};
