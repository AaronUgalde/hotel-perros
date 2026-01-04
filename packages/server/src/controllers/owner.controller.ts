import { Request, Response, NextFunction } from 'express';
import { ownerService } from '../services/owner.service';

export class OwnerController {
  async getMe(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const propietario = await ownerService.getMe(req.user!.propietario_id);
      res.json({ success: true, data: { propietario } });
    } catch (error: any) {
      if (error.message === 'Propietario no encontrado') {
        res.status(404).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }

  async updateMe(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const propietario = await ownerService.updateMe(
        req.user!.propietario_id,
        req.body
      );
      res.json({ success: true, data: { propietario } });
    } catch (error: any) {
      if (error.message === 'Nada que actualizar') {
        res.status(400).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }

  async registerComplete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await ownerService.registerComplete(req.body);
      res.status(201).json({ 
        success: true, 
        data: result,
        message: 'Propietario registrado exitosamente' 
      });
    } catch (error: any) {
      if (error.code === '23505') {
        res.status(400).json({ 
          success: false, 
          error: 'El correo electrónico ya está registrado' 
        });
        return;
      }
      next(error);
    }
  }
}

export const ownerController = new OwnerController();