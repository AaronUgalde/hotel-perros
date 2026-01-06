// src/controllers/habitacion.controller.ts
import { Request, Response, NextFunction } from 'express';
import { habitacionService } from '../services/habitacion.service';

export class HabitacionController {
  /**
   * GET /api/habitaciones
   * Listar todas las habitaciones
   */
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const includeInactive = req.query.includeInactive === 'true';
      const habitaciones = await habitacionService.getAll(includeInactive);

      res.json({ 
        success: true, 
        data: habitaciones 
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/habitaciones/:habitacionId
   * Obtener una habitación específica
   */
  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const habitacionId = parseInt(req.params.habitacionId);

      const habitacion = await habitacionService.getById(habitacionId);

      res.json({ 
        success: true, 
        data: habitacion 
      });
    } catch (error: any) {
      if (error.message === 'Habitación no encontrada') {
        res.status(404).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }

  /**
   * GET /api/habitaciones/especie/:especieId
   * Obtener habitaciones por especie
   */
  async getByEspecie(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const especieId = parseInt(req.params.especieId);

      const habitaciones = await habitacionService.getByEspecie(especieId);

      res.json({ 
        success: true, 
        data: habitaciones 
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/habitaciones
   * Crear nueva habitación
   */
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const habitacion = await habitacionService.create(req.body);

      res.status(201).json({ 
        success: true, 
        data: habitacion,
        message: 'Habitación creada exitosamente'
      });
    } catch (error: any) {
      if (error.message === 'Ya existe una habitación con ese nombre/número') {
        res.status(409).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }

  /**
   * PUT /api/habitaciones/:habitacionId
   * Actualizar habitación existente
   */
  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const habitacionId = parseInt(req.params.habitacionId);

      const habitacion = await habitacionService.update(habitacionId, req.body);

      res.json({ 
        success: true, 
        data: habitacion,
        message: 'Habitación actualizada exitosamente'
      });
    } catch (error: any) {
      if (error.message === 'Habitación no encontrada' || 
          error.message === 'Habitación no encontrada o nada que actualizar') {
        res.status(404).json({ success: false, error: error.message });
        return;
      }
      if (error.message === 'Ya existe otra habitación con ese nombre/número') {
        res.status(409).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }

  /**
   * PATCH /api/habitaciones/:habitacionId/deactivate
   * Desactivar habitación (soft delete)
   */
  async softDelete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const habitacionId = parseInt(req.params.habitacionId);

      await habitacionService.softDelete(habitacionId);

      res.json({ 
        success: true, 
        message: 'Habitación desactivada exitosamente' 
      });
    } catch (error: any) {
      if (error.message === 'Habitación no encontrada') {
        res.status(404).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }

  /**
   * DELETE /api/habitaciones/:habitacionId
   * Eliminar habitación permanentemente
   */
  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const habitacionId = parseInt(req.params.habitacionId);

      await habitacionService.delete(habitacionId);

      res.json({ 
        success: true, 
        message: 'Habitación eliminada exitosamente' 
      });
    } catch (error: any) {
      if (error.message === 'Habitación no encontrada') {
        res.status(404).json({ success: false, error: error.message });
        return;
      }
      if (error.message === 'No se puede eliminar la habitación porque tiene reservaciones asociadas') {
        res.status(409).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }
}

export const habitacionController = new HabitacionController();
