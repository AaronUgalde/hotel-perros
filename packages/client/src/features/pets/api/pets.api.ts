// features/pets/api/pets.api.ts
import api from '../../../lib/api';
import type {
  Pet,
  CreatePetData,
  UpdatePetData,
  PetResponse,
  PetsListResponse,
  CatalogResponse
} from '../types';

const ENDPOINT = '/pets';

export const petsApi = {
  /**
   * Obtener todas las mascotas del usuario autenticado
   */
  getAll: async (): Promise<Pet[]> => {
    const { data } = await api.get(ENDPOINT);
    return data.data;
  },

  /**
   * Obtener todas las mascotas (solo admin)
   */
  getAllAdmin: async (): Promise<Pet[]> => {
    const { data } = await api.get(`${ENDPOINT}/all`);
    return data.data;
  },

  /**
   * Obtener una mascota por ID
   */
  getById: async (id: number): Promise<Pet> => {
    const { data } = await api.get(`${ENDPOINT}/${id}`);
    return data.data;
  },

  /**
   * Crear nueva mascota
   */
  create: async (petData: CreatePetData): Promise<Pet> => {
    const { data } = await api.post(ENDPOINT, petData);
    return data.data;
  },

  /**
   * Crear mascota con detalles completos (vacunas, enfermedades, documentos)
   */
  createWithDetails: async (petData: any, files?: File[]): Promise<any> => {
    const formData = new FormData();
    
    // Agregar datos JSON
    formData.append('data', JSON.stringify(petData));
    
    // Agregar archivos
    if (files && files.length > 0) {
      files.forEach(file => {
        formData.append('documentos', file);
      });
    }
    
    const { data } = await api.post(`${ENDPOINT}/with-details`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data.data;
  },

  /**
   * Actualizar mascota
   */
  update: async (id: number, petData: UpdatePetData): Promise<Pet> => {
    const { data } = await api.put(`${ENDPOINT}/${id}`, petData);
    return data.data;
  },

  /**
   * Eliminar mascota
   */
  delete: async (id: number): Promise<void> => {
    await api.delete(`${ENDPOINT}/${id}`);
  },

  // ============= CATÁLOGOS =============

  /**
   * Obtener especies
   */
  getEspecies: async (): Promise<any[]> => {
    const { data } = await api.get(`${ENDPOINT}/catalogs/especies`);
    return data.data;
  },

  /**
   * Obtener razas por especie
   */
  getRazas: async (especieId: number): Promise<any[]> => {
    const { data } = await api.get(`${ENDPOINT}/catalogs/razas/${especieId}`);
    return data.data;
  },

  /**
   * Obtener sexos
   */
  getSexos: async (): Promise<any[]> => {
    const { data } = await api.get(`${ENDPOINT}/catalogs/sexos`);
    return data.data;
  },

  /**
   * Obtener colores
   */
  getColores: async (): Promise<any[]> => {
    const { data } = await api.get(`${ENDPOINT}/catalogs/colores`);
    return data.data;
  },

  /**
   * Obtener patrones de pelo
   */
  getPatronesPelo: async (): Promise<any[]> => {
    const { data } = await api.get(`${ENDPOINT}/catalogs/patron_pelo`);
    return data.data;
  },

  /**
   * Obtener orígenes
   */
  getOrigenes: async (): Promise<any[]> => {
    const { data } = await api.get(`${ENDPOINT}/catalogs/origen_mascota`);
    return data.data;
  },

  /**
   * Obtener funciones
   */
  getFunciones: async (): Promise<any[]> => {
    const { data } = await api.get(`${ENDPOINT}/catalogs/funcion_mascota`);
    return data.data;
  },

  // ============= VACUNAS =============

  /**
   * Obtener catálogo de vacunas por especie
   */
  getVacunasByEspecie: async (especieId: number): Promise<any[]> => {
    const { data } = await api.get(`/pet-vaccinations/vacunas/${especieId}`);
    return data.data;
  },

  /**
   * Obtener vacunas de una mascota
   */
  getVacunasMascota: async (mascotaId: number): Promise<any[]> => {
    const { data } = await api.get(`/pet-vaccinations/${mascotaId}`);
    return data.data;
  },

  /**
   * Agregar vacuna a mascota
   */
  addVacuna: async (mascotaId: number, vacunaData: any): Promise<any> => {
    const { data } = await api.post(`/pet-vaccinations/${mascotaId}`, vacunaData);
    return data.data;
  },

  // ============= ENFERMEDADES =============

  /**
   * Obtener catálogo de enfermedades por especie
   */
  getEnfermedadesByEspecie: async (especieId: number): Promise<any[]> => {
    const { data } = await api.get(`/diseases/enfermedades/${especieId}`);
    return data.data;
  },

  /**
   * Obtener enfermedades de una mascota
   */
  getEnfermedadesMascota: async (mascotaId: number): Promise<any[]> => {
    const { data } = await api.get(`/diseases/${mascotaId}`);
    return data.data;
  },

  /**
   * Agregar enfermedad a mascota
   */
  addEnfermedad: async (mascotaId: number, enfermedadData: any): Promise<any> => {
    const { data } = await api.post(`/diseases/${mascotaId}`, enfermedadData);
    return data.data;
  },

  // ============= ALERGIAS =============

  /**
   * Obtener catálogo de alergias
   */
  getAlergiasOptions: async (): Promise<any[]> => {
    const { data } = await api.get(`/alergias/catalogo`);
    return data.data;
  },

  /**
   * Obtener alergias de una mascota
   */
  getAlergiasMascota: async (mascotaId: number): Promise<any[]> => {
    const { data } = await api.get(`/alergias/${mascotaId}`);
    return data.data;
  },

  /**
   * Agregar alergia a mascota
   */
  addAlergia: async (mascotaId: number, alergiaData: any): Promise<any> => {
    const { data } = await api.post(`/alergias/${mascotaId}`, alergiaData);
    return data.data;
  },

  /**
   * Eliminar alergia de mascota
   */
  deleteAlergia: async (mascotaId: number, alergiaId: number): Promise<void> => {
    await api.delete(`/alergias/${mascotaId}/${alergiaId}`);
  },

  // ============= DESPARASITACIONES =============

  /**
   * Obtener desparasitaciones de una mascota
   */
  getDesparasitacionesMascota: async (mascotaId: number): Promise<any[]> => {
    const { data } = await api.get(`/desparasitaciones/${mascotaId}`);
    return data.data;
  },

  /**
   * Agregar desparasitación a mascota
   */
  addDesparasitacion: async (mascotaId: number, desparasitacionData: any): Promise<any> => {
    const { data } = await api.post(`/desparasitaciones/${mascotaId}`, desparasitacionData);
    return data.data;
  },

  /**
   * Eliminar desparasitación
   */
  deleteDesparasitacion: async (mascotaId: number, desparasitacionId: number): Promise<void> => {
    await api.delete(`/desparasitaciones/${mascotaId}/${desparasitacionId}`);
  },

  // ============= DOCUMENTOS =============

  /**
   * Obtener tipos de documentos
   */
  getTiposDocumentos: async (): Promise<any[]> => {
    const { data } = await api.get(`/documents/tipos_documentos`);
    return data.data;
  },

  /**
   * Obtener documentos de una mascota
   */
  getDocumentosMascota: async (mascotaId: number): Promise<any[]> => {
    const { data } = await api.get(`/documents/${mascotaId}`);
    return data.data;
  },

  /**
   * Subir documento
   */
  uploadDocumento: async (mascotaId: number, file: File, tipoDocumentoId?: number): Promise<any> => {
    const formData = new FormData();
    formData.append('file', file);
    if (tipoDocumentoId) {
      formData.append('tipo_documento_id', String(tipoDocumentoId));
    }

    const { data } = await api.post(`/documents/${mascotaId}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data.data;
  },

  /**
   * Eliminar documento
   */
  deleteDocumento: async (documentoId: number): Promise<void> => {
    await api.delete(`/documents/${documentoId}`);
  },

  /**
   * Obtener URL de descarga de documento
   */
  getDocumentoDownloadUrl: (documentoId: number): string => {
    return `${api.defaults.baseURL}/documents/download/${documentoId}`;
  },
};