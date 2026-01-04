import { documentoRepository, Documento } from '../repositories/documento.repository';

export class DocumentoService {
  // Catálogos
  async getTiposDocumento() {
    return await documentoRepository.getTiposDocumento();
  }

  // CRUD Documentos
  async getByMascota(mascotaId: number, propietarioId: number, tipoDocumentoId?: number) {
    // Verificar que la mascota pertenece al propietario
    const isOwner = await documentoRepository.verifyMascotaOwnership(mascotaId, propietarioId);
    if (!isOwner) {
      throw new Error('Mascota no encontrada o no pertenece al propietario');
    }

    return await documentoRepository.findByMascota(mascotaId, tipoDocumentoId);
  }

  async getById(documentoId: number, propietarioId: number) {
    const documento = await documentoRepository.findById(documentoId);
    
    if (!documento) {
      throw new Error('Documento no encontrado');
    }

    if (documento.propietario_id !== propietarioId) {
      throw new Error('No autorizado');
    }

    return documento;
  }

  async create(
    mascotaId: number,
    propietarioId: number,
    fileData: {
      originalname: string;
      path: string;
    },
    tipoDocumentoId?: number
  ): Promise<Documento> {
    // Verificar que la mascota pertenece al propietario
    const isOwner = await documentoRepository.verifyMascotaOwnership(mascotaId, propietarioId);
    if (!isOwner) {
      // Borrar archivo subido si la verificación falla
      documentoRepository.deletePhysicalFile(fileData.path);
      throw new Error('Mascota no encontrada o no pertenece al propietario');
    }

    try {
      return await documentoRepository.create({
        mascota_id: mascotaId,
        tipo_documento_id: tipoDocumentoId || null,
        nombre_archivo: fileData.originalname,
        ruta_archivo: fileData.path,
      });
    } catch (error) {
      // Si falla la inserción, borrar el archivo
      documentoRepository.deletePhysicalFile(fileData.path);
      throw error;
    }
  }

  async delete(documentoId: number, propietarioId: number): Promise<void> {
    // Verificar propiedad y obtener ruta del archivo
    const documento = await this.getById(documentoId, propietarioId);

    // Borrar registro de BD
    const deleted = await documentoRepository.delete(documentoId);
    if (!deleted) {
      throw new Error('Error al eliminar documento');
    }

    // Borrar archivo físico
    documentoRepository.deletePhysicalFile(documento.ruta_archivo);
  }
}

export const documentoService = new DocumentoService();
