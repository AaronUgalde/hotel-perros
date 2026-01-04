import { db } from '../config/database';
import fs from 'fs';

export interface Documento {
  documento_id: number;
  mascota_id: number;
  tipo_documento_id: number | null;
  nombre_archivo: string;
  ruta_archivo: string;
  fecha_subida: Date;
}

export interface TipoDocumento {
  tipo_documento_id: number;
  nombre: string;
  descripcion: string | null;
}

export class DocumentoRepository {
  // Catálogos
  async getTiposDocumento(): Promise<TipoDocumento[]> {
    const query = `SELECT * FROM tipos_documentos ORDER BY nombre`;
    const result = await db.query(query);
    return result.rows;
  }

  // CRUD Documentos
  async findByMascota(mascotaId: number, tipoDocumentoId?: number): Promise<Documento[]> {
    let query = `
      SELECT 
        documento_id, 
        mascota_id,
        tipo_documento_id, 
        nombre_archivo, 
        ruta_archivo, 
        fecha_subida
      FROM documentos_mascotas
      WHERE mascota_id = $1
    `;
    
    const values: any[] = [mascotaId];

    if (tipoDocumentoId !== undefined) {
      query += ' AND tipo_documento_id = $2';
      values.push(tipoDocumentoId);
    }

    query += ' ORDER BY fecha_subida DESC';
    
    const result = await db.query(query, values);
    return result.rows;
  }

  async findById(documentoId: number): Promise<(Documento & { propietario_id: number }) | null> {
    const query = `
      SELECT 
        dm.documento_id,
        dm.mascota_id,
        dm.tipo_documento_id,
        dm.nombre_archivo,
        dm.ruta_archivo,
        dm.fecha_subida,
        m.propietario_id
      FROM documentos_mascotas dm
      JOIN mascotas m ON dm.mascota_id = m.mascota_id
      WHERE dm.documento_id = $1
    `;
    const result = await db.query(query, [documentoId]);
    return result.rows[0] || null;
  }

  async create(data: {
    mascota_id: number;
    tipo_documento_id: number | null;
    nombre_archivo: string;
    ruta_archivo: string;
  }): Promise<Documento> {
    const query = `
      INSERT INTO documentos_mascotas 
        (mascota_id, tipo_documento_id, nombre_archivo, ruta_archivo)
      VALUES ($1, $2, $3, $4)
      RETURNING 
        documento_id, 
        mascota_id, 
        tipo_documento_id, 
        nombre_archivo, 
        ruta_archivo, 
        fecha_subida
    `;

    const result = await db.query(query, [
      data.mascota_id,
      data.tipo_documento_id,
      data.nombre_archivo,
      data.ruta_archivo,
    ]);

    return result.rows[0];
  }

  async delete(documentoId: number): Promise<boolean> {
    const query = `
      DELETE FROM documentos_mascotas 
      WHERE documento_id = $1
      RETURNING documento_id
    `;
    const result = await db.query(query, [documentoId]);
    return (result.rowCount || 0) > 0;
  }

  // Utilidades
  async verifyMascotaOwnership(mascotaId: number, propietarioId: number): Promise<boolean> {
    const query = `
      SELECT mascota_id 
      FROM mascotas 
      WHERE mascota_id = $1 AND propietario_id = $2
    `;
    const result = await db.query(query, [mascotaId, propietarioId]);
    return result.rowCount! > 0;
  }

  deletePhysicalFile(rutaArchivo: string): void {
    if (rutaArchivo && fs.existsSync(rutaArchivo)) {
      try {
        fs.unlinkSync(rutaArchivo);
      } catch (error) {
        console.warn('No se pudo borrar archivo físico:', error);
      }
    }
  }
}

export const documentoRepository = new DocumentoRepository();
