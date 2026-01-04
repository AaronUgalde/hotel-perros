import { Request, Response, NextFunction } from 'express';
import { documentoService } from '../services/documento.service';
import path from 'path';

export class DocumentoController {
  // Catálogos
  async getTiposDocumento(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const tipos = await documentoService.getTiposDocumento();
      res.json({ success: true, data: { tipos_documentos: tipos } });
    } catch (error) {
      next(error);
    }
  }

  // CRUD Documentos
  async getByMascota(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const mascotaId = parseInt(req.params.mascotaId);
      const tipoDocumentoId = req.query.tipo_documento_id 
        ? parseInt(req.query.tipo_documento_id as string)
        : undefined;

      const documentos = await documentoService.getByMascota(
        mascotaId,
        req.user!.propietario_id,
        tipoDocumentoId
      );

      res.json({ success: true, data: documentos });
    } catch (error: any) {
      if (error.message === 'Mascota no encontrada o no pertenece al propietario') {
        res.status(404).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }

  async upload(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.file) {
        res.status(400).json({ success: false, error: 'Archivo requerido (campo: file)' });
        return;
      }

      const mascotaId = parseInt(req.params.mascotaId);
      const tipoDocumentoId = req.body.tipo_documento_id 
        ? parseInt(req.body.tipo_documento_id)
        : undefined;

      const documento = await documentoService.create(
        mascotaId,
        req.user!.propietario_id,
        {
          originalname: req.file.originalname,
          path: req.file.path,
        },
        tipoDocumentoId
      );

      res.status(201).json({ success: true, data: documento });
    } catch (error: any) {
      if (error.message === 'Mascota no encontrada o no pertenece al propietario') {
        res.status(404).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }

  async download(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const documentoId = parseInt(req.params.documentoId);
      const documento = await documentoService.getById(documentoId, req.user!.propietario_id);

      // Verificar que el archivo existe
      const fs = require('fs');
      if (!fs.existsSync(documento.ruta_archivo)) {
        res.status(404).json({ success: false, error: 'Archivo no encontrado en servidor' });
        return;
      }

      // Enviar archivo
      res.sendFile(path.resolve(documento.ruta_archivo));
    } catch (error: any) {
      if (error.message === 'Documento no encontrado') {
        res.status(404).json({ success: false, error: error.message });
        return;
      }
      if (error.message === 'No autorizado') {
        res.status(403).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const documentoId = parseInt(req.params.documentoId);
      await documentoService.delete(documentoId, req.user!.propietario_id);

      res.json({ success: true, message: 'Documento eliminado exitosamente' });
    } catch (error: any) {
      if (error.message === 'Documento no encontrado') {
        res.status(404).json({ success: false, error: error.message });
        return;
      }
      if (error.message === 'No autorizado') {
        res.status(403).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }
}

export const documentoController = new DocumentoController();
