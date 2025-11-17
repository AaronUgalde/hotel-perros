// src/services/document.service.ts
import api from '../lib/api';

export interface TipoDocumento {
  tipo_documento_id: number;
  nombre_tipo: string;
}

export interface Documento {
  documento_id: number;
  mascota_id: number;
  tipo_documento_id: number;
  nombre_archivo: string;
  ruta_archivo: string;
  fecha_subida: string;
}

const documentService = {
  /**
   * Obtener tipos de documentos
   */
  async getTiposDocumentos(): Promise<TipoDocumento[]> {
    const response = await api.get('/pet-docs/tipos_documentos');
    return response.data.tipos_documentos || response.data;
  },

  /**
   * Subir documento para una mascota
   */
  async subirDocumento(
    mascotaId: number,
    file: File,
    tipoDocumentoId: number
  ): Promise<Documento> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('tipo_documento_id', tipoDocumentoId.toString());

    const response = await api.post(`/pet-docs/${mascotaId}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  /**
   * Listar documentos de una mascota
   */
  async getDocumentosMascota(
    mascotaId: number,
    tipoDocumentoId?: number
  ): Promise<Documento[]> {
    const params = tipoDocumentoId ? { tipo_documento_id: tipoDocumentoId } : {};
    const response = await api.get(`/pet-docs/${mascotaId}`, { params });
    return response.data;
  },

  /**
   * Eliminar documento
   */
  async eliminarDocumento(documentoId: number): Promise<void> {
    await api.delete(`/pet-docs/${documentoId}`);
  },

  /**
   * Descargar documento
   */
  getDocumentoUrl(documentoId: number): string {
    return `/pet-docs/download/${documentoId}`;
  },
};

export default documentService;
