import { Request, Response, NextFunction } from 'express';
import { telefonoService } from '../services/telefono.service';

export class TelefonoController {
  // Catálogos
  async getTiposTelefono(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const tipos = await telefonoService.getTiposTelefono();
      res.json({ success: true, data: { tipos_telefono: tipos } });
    } catch (error) {
      next(error);
    }
  }

  // CRUD Teléfonos
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const telefonos = await telefonoService.getAllByOwner(req.user!.propietario_id);
      res.json({ success: true, data: telefonos });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const telefonoId = parseInt(req.params.telefonoId);
      const telefono = await telefonoService.getById(telefonoId, req.user!.propietario_id);
      res.json({ success: true, data: telefono });
    } catch (error: any) {
      if (error.message === 'Teléfono no encontrado') {
        res.status(404).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const telefono = await telefonoService.create(req.body, req.user!.propietario_id);
      res.status(201).json({ success: true, data: telefono });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const telefonoId = parseInt(req.params.telefonoId);
      const telefono = await telefonoService.update(telefonoId, req.body, req.user!.propietario_id);
      res.json({ success: true, data: telefono });
    } catch (error: any) {
      if (error.message === 'Nada que actualizar') {
        res.status(400).json({ success: false, error: error.message });
        return;
      }
      if (error.message === 'Teléfono no encontrado') {
        res.status(404).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const telefonoId = parseInt(req.params.telefonoId);
      await telefonoService.delete(telefonoId, req.user!.propietario_id);
      res.json({ success: true, message: 'Teléfono eliminado exitosamente' });
    } catch (error: any) {
      if (error.message === 'Teléfono no encontrado') {
        res.status(404).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }
}

export const telefonoController = new TelefonoController();
