// src/controllers/alergia.controller.ts
import { Request, Response, NextFunction } from 'express';
import { alergiaService } from '../services/alergia.service';

export class AlergiaController {
  /**
   * GET /api/alergias/:mascotaId
   * Listar alergias de una mascota
   */
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const mascotaId = parseInt(req.params.mascotaId);
      const propietarioId = req.user!.propietario_id;
      const rolId = req.user!.rol_id;

      const alergias = await alergiaService.getAllByPet(mascotaId, propietarioId, rolId);

      res.json({ 
        success: true, 
        data: alergias 
      });
    } catch (error: any) {
      if (error.message === 'Mascota no encontrada o no pertenece al propietario') {
        res.status(404).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }

  /**
   * POST /api/alergias/:mascotaId
   * Agregar alergia a mascota
   */
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const mascotaId = parseInt(req.params.mascotaId);
      const propietarioId = req.user!.propietario_id;

      const alergia = await alergiaService.create(
        {
          mascota_id: mascotaId,
          ...req.body
        },
        propietarioId
      );

      res.status(201).json({ 
        success: true, 
        data: alergia,
        message: 'Alergia agregada exitosamente'
      });
    } catch (error: any) {
      if (error.message === 'Mascota no encontrada o no pertenece al propietario') {
        res.status(404).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }

  /**
   * DELETE /api/alergias/:mascotaId/:alergiaId
   * Eliminar alergia de mascota
   */
  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const mascotaId = parseInt(req.params.mascotaId);
      const alergiaId = parseInt(req.params.alergiaId);
      const propietarioId = req.user!.propietario_id;

      await alergiaService.delete(mascotaId, alergiaId, propietarioId);

      res.json({ 
        success: true, 
        message: 'Alergia eliminada exitosamente' 
      });
    } catch (error: any) {
      if (error.message === 'Mascota no encontrada o no pertenece al propietario') {
        res.status(404).json({ success: false, error: error.message });
        return;
      }
      if (error.message === 'Alergia no encontrada') {
        res.status(404).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }

  /**
   * GET /api/alergias/catalogo
   * Obtener catálogo completo de alergias
   */
  async getCatalogo(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const alergias = await alergiaService.getAllAlergias();

      res.json({ 
        success: true, 
        data: { alergias } 
      });
    } catch (error) {
      next(error);
    }
  }
}

export const alergiaController = new AlergiaController();
