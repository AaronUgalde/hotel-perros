// src/services/owner.service.ts
import api from '../lib/api';

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

const ownerService = {
  /**
   * Registro completo de propietario con teléfonos y direcciones
   */
  async registerComplete(data: RegistroCompletoData) {
    const response = await api.post('/owners/register-complete', data);
    return response.data;
  },

  /**
   * Obtener tipos de teléfono
   */
  async getTiposTelefono(): Promise<CatalogoOwner[]> {
    const response = await api.get('/phones/tipos');
    return response.data.tipos || response.data;
  },

  /**
   * Obtener tipos de domicilio
   */
  async getTiposDomicilio(): Promise<CatalogoOwner[]> {
    const response = await api.get('/directions/tipos');
    return response.data.tipos || response.data;
  },

  /**
   * Buscar información por código postal
   */
  async buscarCodigoPostal(cp: string): Promise<CodigoPostalInfo> {
    const response = await api.get(`/directions/codigo-postal/${cp}`);
    return response.data;
  },

  /**
   * Obtener estados
   */
  async getEstados(): Promise<CatalogoOwner[]> {
    const response = await api.get('/directions/estados');
    return response.data.estados || response.data;
  },

  /**
   * Obtener municipios por estado
   */
  async getMunicipios(estadoId: number): Promise<CatalogoOwner[]> {
    const response = await api.get(`/directions/municipios/${estadoId}`);
    return response.data.municipios || response.data;
  },

  /**
   * Obtener colonias por municipio y código postal
   */
  async getColonias(municipioId: number, codigoPostal: string): Promise<CatalogoOwner[]> {
    const response = await api.get(`/directions/colonias/${municipioId}/${codigoPostal}`);
    return response.data.colonias || response.data;
  },
};

export default ownerService;
