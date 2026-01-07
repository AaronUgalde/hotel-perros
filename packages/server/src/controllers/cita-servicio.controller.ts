import { Request, Response, NextFunction } from 'express';
import { citaServicioService } from '../services/cita-servicio.service';

export class CitaServicioController {
  // Obtener todas las citas del propietario
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const citas = await citaServicioService.getAllByOwner(req.user!.propietario_id);
      res.json({ success: true, data: citas });
    } catch (error) {
      next(error);
    }
  }

  // Obtener citas por reservación
  async getByReservacion(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const citas = await citaServicioService.getByReservacion(
        parseInt(req.params.reservacionId),
        req.user!.propietario_id
      );
      res.json({ success: true, data: citas });
    } catch (error: any) {
      if (error.message === 'No autorizado') {
        res.status(403).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }

  // Obtener cita por ID
  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const cita = await citaServicioService.getById(
        parseInt(req.params.id),
        req.user!.propietario_id
      );
      res.json({ success: true, data: cita });
    } catch (error: any) {
      if (error.message === 'Cita no encontrada') {
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

  // Crear cita de servicio
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const cita = await citaServicioService.create(req.body, req.user!.propietario_id);
      res.status(201).json({ success: true, data: cita });
    } catch (error: any) {
      if (error.message.includes('No autorizado') || 
          error.message.includes('no está disponible') ||
          error.message.includes('debe ser posterior')) {
        res.status(400).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }

  // Actualizar cita de servicio
  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const cita = await citaServicioService.update(
        parseInt(req.params.id),
        req.body,
        req.user!.propietario_id
      );
      res.json({ success: true, data: cita });
    } catch (error: any) {
      if (error.message === 'No autorizado') {
        res.status(403).json({ success: false, error: error.message });
        return;
      }
      if (error.message.includes('no está disponible') ||
          error.message.includes('debe ser posterior')) {
        res.status(400).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }

  // Eliminar cita de servicio
  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await citaServicioService.delete(parseInt(req.params.id), req.user!.propietario_id);
      res.json({ success: true, message: 'Cita eliminada' });
    } catch (error: any) {
      if (error.message === 'No autorizado') {
        res.status(403).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }

  // Obtener citas por empleado
  async getByEmpleado(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const citas = await citaServicioService.getByEmpleado(parseInt(req.params.empleadoId));
      res.json({ success: true, data: citas });
    } catch (error) {
      next(error);
    }
  }

  // Obtener citas por rango de fechas
  async getByDateRange(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { fechaInicio, fechaFin } = req.query;
      const citas = await citaServicioService.getByDateRange(
        fechaInicio as string,
        fechaFin as string
      );
      res.json({ success: true, data: citas });
    } catch (error: any) {
      if (error.message.includes('debe ser posterior')) {
        res.status(400).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }
}

export const citaServicioController = new CitaServicioController();
