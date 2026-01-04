import { Request, Response, NextFunction } from 'express';
import { direccionService } from '../services/direccion.service';

export class DireccionController {
  // Catálogos
  async getTiposDomicilio(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const tipos = await direccionService.getTiposDomicilio();
      res.json({ success: true, data: { tipos_domicilio: tipos } });
    } catch (error) {
      next(error);
    }
  }

  async getEstados(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const estados = await direccionService.getEstados();
      res.json({ success: true, data: estados });
    } catch (error) {
      next(error);
    }
  }

  async getMunicipiosByEstado(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const estadoId = parseInt(req.params.estadoId);
      const municipios = await direccionService.getMunicipiosByEstado(estadoId);
      res.json({ success: true, data: municipios });
    } catch (error) {
      next(error);
    }
  }

  async getColoniasByMunicipioAndCP(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const municipioId = parseInt(req.params.municipioId);
      const cp = req.params.cp;
      const colonias = await direccionService.getColoniasByMunicipioAndCP(municipioId, cp);
      res.json({ success: true, data: colonias });
    } catch (error) {
      next(error);
    }
  }

  async getInfoByCodigoPostal(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const cp = req.params.cp;
      const info = await direccionService.getInfoByCodigoPostal(cp);
      res.json({ success: true, data: info });
    } catch (error: any) {
      if (error.message === 'Código postal no encontrado') {
        res.status(404).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }

  // CRUD Direcciones
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const direcciones = await direccionService.getAllByOwner(req.user!.propietario_id);
      res.json({ success: true, data: direcciones });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const direccionId = parseInt(req.params.direccionId);
      const direccion = await direccionService.getById(direccionId, req.user!.propietario_id);
      res.json({ success: true, data: direccion });
    } catch (error: any) {
      if (error.message === 'Dirección no encontrada') {
        res.status(404).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const direccion = await direccionService.create(req.body, req.user!.propietario_id);
      res.status(201).json({ success: true, data: direccion });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const direccionId = parseInt(req.params.direccionId);
      const direccion = await direccionService.update(direccionId, req.body, req.user!.propietario_id);
      res.json({ success: true, data: direccion });
    } catch (error: any) {
      if (error.message === 'Nada que actualizar') {
        res.status(400).json({ success: false, error: error.message });
        return;
      }
      if (error.message === 'Dirección no encontrada') {
        res.status(404).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const direccionId = parseInt(req.params.direccionId);
      await direccionService.delete(direccionId, req.user!.propietario_id);
      res.json({ success: true, message: 'Dirección eliminada exitosamente' });
    } catch (error: any) {
      if (error.message === 'Dirección no encontrada') {
        res.status(404).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }
}

export const direccionController = new DireccionController();
