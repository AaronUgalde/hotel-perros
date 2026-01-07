// src/controllers/servicio.controller.ts
import { Request, Response, NextFunction } from 'express';
import { servicioService } from '../services/servicio.service';

export class ServicioController {
  /**
   * GET /api/servicios
   * Listar todos los servicios disponibles
   */
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const servicios = await servicioService.getAll();

      res.json({ 
        success: true, 
        data: servicios 
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/servicios/:servicioId
   * Obtener un servicio específico
   */
  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const servicioId = parseInt(req.params.servicioId);

      const servicio = await servicioService.getById(servicioId);

      res.json({ 
        success: true, 
        data: servicio 
      });
    } catch (error: any) {
      if (error.message === 'Servicio no encontrado') {
        res.status(404).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }

  /**
   * POST /api/servicios
   * Crear nuevo servicio
   */
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const servicio = await servicioService.create(req.body);

      res.status(201).json({ 
        success: true, 
        data: servicio,
        message: 'Servicio creado exitosamente'
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /api/servicios/:servicioId
   * Actualizar servicio existente
   */
  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const servicioId = parseInt(req.params.servicioId);

      const servicio = await servicioService.update(servicioId, req.body);

      res.json({ 
        success: true, 
        data: servicio,
        message: 'Servicio actualizado exitosamente'
      });
    } catch (error: any) {
      if (error.message === 'Servicio no encontrado' || 
          error.message === 'Servicio no encontrado o nada que actualizar') {
        res.status(404).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }

  /**
   * DELETE /api/servicios/:servicioId
   * Eliminar servicio
   */
  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const servicioId = parseInt(req.params.servicioId);

      await servicioService.delete(servicioId);

      res.json({ 
        success: true, 
        message: 'Servicio eliminado exitosamente' 
      });
    } catch (error: any) {
      if (error.message === 'Servicio no encontrado') {
        res.status(404).json({ success: false, error: error.message });
        return;
      }
      if (error.message === 'No se puede eliminar el servicio porque está siendo usado en reservaciones') {
        res.status(409).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }
}

export const servicioController = new ServicioController();
