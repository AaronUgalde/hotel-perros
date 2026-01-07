import { Request, Response, NextFunction } from 'express';
import { pagoService } from '../services/pago.service';

export class PagoController {
  // Obtener todos los pagos del propietario
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const pagos = await pagoService.getAllByOwner(req.user!.propietario_id);
      res.json({ success: true, data: pagos });
    } catch (error) {
      next(error);
    }
  }

  // Obtener pago por ID
  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const pago = await pagoService.getById(
        parseInt(req.params.id),
        req.user!.propietario_id
      );
      res.json({ success: true, data: pago });
    } catch (error: any) {
      if (error.message === 'Pago no encontrado') {
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

  // Obtener pagos por reservación
  async getByReservacion(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await pagoService.getByReservacion(
        parseInt(req.params.reservacionId),
        req.user!.propietario_id
      );
      res.json({ success: true, data: result });
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

  // Crear pago
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const pago = await pagoService.create(req.body, req.user!.propietario_id);
      res.status(201).json({ success: true, data: pago });
    } catch (error: any) {
      if (error.message.includes('No autorizado') || 
          error.message.includes('no encontrada') ||
          error.message.includes('excede el saldo')) {
        res.status(400).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }

  // Actualizar pago
  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const pago = await pagoService.update(
        parseInt(req.params.id),
        req.body,
        req.user!.propietario_id
      );
      res.json({ success: true, data: pago });
    } catch (error: any) {
      if (error.message === 'No autorizado') {
        res.status(403).json({ success: false, error: error.message });
        return;
      }
      if (error.message.includes('excede el saldo')) {
        res.status(400).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }

  // Eliminar pago
  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await pagoService.delete(parseInt(req.params.id), req.user!.propietario_id);
      res.json({ success: true, message: 'Pago eliminado' });
    } catch (error: any) {
      if (error.message === 'No autorizado') {
        res.status(403).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }

  // Catálogos (públicos - sin auth)
  async getMetodosPago(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const metodos = await pagoService.getMetodosPago();
      res.json({ success: true, data: { metodosPago: metodos } });
    } catch (error) {
      next(error);
    }
  }

  async getEstadosPago(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const estados = await pagoService.getEstadosPago();
      res.json({ success: true, data: { estadosPago: estados } });
    } catch (error) {
      next(error);
    }
  }
}

export const pagoController = new PagoController();
