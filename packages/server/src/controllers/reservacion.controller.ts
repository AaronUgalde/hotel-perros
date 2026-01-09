import { Request, Response, NextFunction } from 'express';
import { reservacionService } from '../services/reservacion.service';

export class ReservacionController {
  // Obtener todas las reservaciones (admin ve todas, usuario ve solo las suyas)
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const isAdmin = req.user!.rol_id === 2;
      
      if (isAdmin) {
        // Admin ve todas las reservaciones
        const reservaciones = await reservacionService.getAll();
        res.json({ success: true, data: reservaciones });
      } else {
        // Usuario regular solo ve las suyas
        const reservaciones = await reservacionService.getAllByOwner(req.user!.propietario_id);
        res.json({ success: true, data: reservaciones });
      }
    } catch (error) {
      next(error);
    }
  }

  // Obtener reservación por ID (admin puede ver cualquiera, usuario solo las suyas)
  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const reservacion = await reservacionService.getById(
        parseInt(req.params.id),
        req.user!.propietario_id,
        req.user!.rol_id
      );
      
      res.json({ success: true, data: reservacion });
    } catch (error: any) {
      if (error.message === 'Reservación no encontrada') {
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

  // Crear reservación
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const reservacion = await reservacionService.create(req.body, req.user!.propietario_id);
      res.status(201).json({ success: true, data: reservacion });
    } catch (error: any) {
      if (error.message.includes('No autorizado') || error.message.includes('no está disponible')) {
        res.status(400).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }

  // Actualizar reservación
  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const reservacion = await reservacionService.update(
        parseInt(req.params.id),
        req.body,
        req.user!.propietario_id,
        req.user!.rol_id
      );
      res.json({ success: true, data: reservacion });
    } catch (error: any) {
      if (error.message === 'No autorizado') {
        res.status(403).json({ success: false, error: error.message });
        return;
      }
      if (error.message.includes('no está disponible')) {
        res.status(400).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }

  // Eliminar reservación
  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await reservacionService.delete(parseInt(req.params.id), req.user!.propietario_id, req.user!.rol_id);
      res.json({ success: true, message: 'Reservación eliminada' });
    } catch (error: any) {
      if (error.message === 'No autorizado') {
        res.status(403).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }

  // Agregar servicio a reservación
  async addServicio(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const servicio = await reservacionService.addServicio(
        parseInt(req.params.id),
        req.body,
        req.user!.propietario_id,
        req.user!.rol_id
      );
      res.status(201).json({ success: true, data: servicio });
    } catch (error: any) {
      if (error.message === 'No autorizado') {
        res.status(403).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }

  // Eliminar servicio de reservación
  async removeServicio(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await reservacionService.removeServicio(
        parseInt(req.params.servicioId),
        req.user!.propietario_id,
        req.user!.rol_id
      );
      res.json({ success: true, message: 'Servicio eliminado de la reservación' });
    } catch (error: any) {
      if (error.message === 'No autorizado') {
        res.status(403).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }

  // Catálogos
  async getEstadosReservacion(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const estados = await reservacionService.getEstadosReservacion();
      res.json({ success: true, data: { estados } });
    } catch (error) {
      next(error);
    }
  }

  async getHabitaciones(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const habitaciones = await reservacionService.getHabitaciones();
      res.json({ success: true, data: { habitaciones } });
    } catch (error) {
      next(error);
    }
  }

  async getServicios(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const servicios = await reservacionService.getServicios();
      res.json({ success: true, data: { servicios } });
    } catch (error) {
      next(error);
    }
  }
}

export const reservacionController = new ReservacionController();
