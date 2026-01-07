import { Request, Response, NextFunction } from 'express';
import { empleadoService } from '../services/empleado.service';

export class EmpleadoController {
  // Obtener todos los empleados
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const empleados = await empleadoService.getAll();
      res.json({ success: true, data: empleados });
    } catch (error) {
      next(error);
    }
  }

  // Obtener empleado por ID
  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const empleado = await empleadoService.getById(parseInt(req.params.id));
      res.json({ success: true, data: empleado });
    } catch (error: any) {
      if (error.message === 'Empleado no encontrado') {
        res.status(404).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }

  // Crear empleado
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const empleado = await empleadoService.create(req.body);
      res.status(201).json({ success: true, data: empleado });
    } catch (error: any) {
      if (error.message.includes('requerido') || error.message.includes('vacío')) {
        res.status(400).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }

  // Actualizar empleado
  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const empleado = await empleadoService.update(
        parseInt(req.params.id),
        req.body
      );
      res.json({ success: true, data: empleado });
    } catch (error: any) {
      if (error.message === 'Empleado no encontrado') {
        res.status(404).json({ success: false, error: error.message });
        return;
      }
      if (error.message.includes('vacío')) {
        res.status(400).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }

  // Eliminar empleado
  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await empleadoService.delete(parseInt(req.params.id));
      res.json({ success: true, message: 'Empleado eliminado' });
    } catch (error: any) {
      if (error.message === 'Empleado no encontrado') {
        res.status(404).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }

  // Buscar por especialidad
  async findByEspecialidad(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const empleados = await empleadoService.findByEspecialidad(req.query.especialidad as string);
      res.json({ success: true, data: empleados });
    } catch (error) {
      next(error);
    }
  }

  // Obtener citas de un empleado
  async getCitas(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const citas = await empleadoService.getCitas(parseInt(req.params.id));
      res.json({ success: true, data: citas });
    } catch (error: any) {
      if (error.message === 'Empleado no encontrado') {
        res.status(404).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }
}

export const empleadoController = new EmpleadoController();
