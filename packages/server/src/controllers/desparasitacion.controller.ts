// src/controllers/desparasitacion.controller.ts
import { Request, Response, NextFunction } from 'express';
import { desparasitacionService } from '../services/desparasitacion.service';

export class DesparasitacionController {
  /**
   * GET /api/desparasitaciones/:mascotaId
   * Listar desparasitaciones de una mascota
   */
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const mascotaId = parseInt(req.params.mascotaId);
      const propietarioId = req.user!.propietario_id;
      const rolId = req.user!.rol_id;

      const desparasitaciones = await desparasitacionService.getAllByPet(
        mascotaId, 
        propietarioId,
        rolId
      );

      res.json({ 
        success: true, 
        data: desparasitaciones 
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
   * GET /api/desparasitaciones/:mascotaId/:desparasitacionId
   * Obtener una desparasitación específica
   */
  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const desparasitacionId = parseInt(req.params.desparasitacionId);
      const mascotaId = parseInt(req.params.mascotaId);
      const propietarioId = req.user!.propietario_id;

      const desparasitacion = await desparasitacionService.getById(
        desparasitacionId,
        mascotaId,
        propietarioId
      );

      res.json({ 
        success: true, 
        data: desparasitacion 
      });
    } catch (error: any) {
      if (error.message === 'Mascota no encontrada o no pertenece al propietario') {
        res.status(404).json({ success: false, error: error.message });
        return;
      }
      if (error.message === 'Desparasitación no encontrada') {
        res.status(404).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }

  /**
   * POST /api/desparasitaciones/:mascotaId
   * Registrar nueva desparasitación
   */
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const mascotaId = parseInt(req.params.mascotaId);
      const propietarioId = req.user!.propietario_id;

      const desparasitacion = await desparasitacionService.create(
        {
          mascota_id: mascotaId,
          ...req.body
        },
        propietarioId
      );

      res.status(201).json({ 
        success: true, 
        data: desparasitacion,
        message: 'Desparasitación registrada exitosamente'
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
   * PUT /api/desparasitaciones/:mascotaId/:desparasitacionId
   * Actualizar desparasitación
   */
  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const desparasitacionId = parseInt(req.params.desparasitacionId);
      const mascotaId = parseInt(req.params.mascotaId);
      const propietarioId = req.user!.propietario_id;

      const desparasitacion = await desparasitacionService.update(
        desparasitacionId,
        mascotaId,
        req.body,
        propietarioId
      );

      res.json({ 
        success: true, 
        data: desparasitacion,
        message: 'Desparasitación actualizada exitosamente'
      });
    } catch (error: any) {
      if (error.message === 'Mascota no encontrada o no pertenece al propietario') {
        res.status(404).json({ success: false, error: error.message });
        return;
      }
      if (error.message === 'Desparasitación no encontrada o nada que actualizar') {
        res.status(404).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }

  /**
   * DELETE /api/desparasitaciones/:mascotaId/:desparasitacionId
   * Eliminar desparasitación
   */
  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const desparasitacionId = parseInt(req.params.desparasitacionId);
      const mascotaId = parseInt(req.params.mascotaId);
      const propietarioId = req.user!.propietario_id;

      await desparasitacionService.delete(
        desparasitacionId,
        mascotaId,
        propietarioId
      );

      res.json({ 
        success: true, 
        message: 'Desparasitación eliminada exitosamente' 
      });
    } catch (error: any) {
      if (error.message === 'Mascota no encontrada o no pertenece al propietario') {
        res.status(404).json({ success: false, error: error.message });
        return;
      }
      if (error.message === 'Desparasitación no encontrada') {
        res.status(404).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }
}

export const desparasitacionController = new DesparasitacionController();
