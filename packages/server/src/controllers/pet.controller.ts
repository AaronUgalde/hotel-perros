import { Request, Response, NextFunction } from 'express';
import { petService } from '../services/pet.service';

export class PetController {
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const pets = await petService.getAllByOwner(req.user!.propietario_id);
      res.json({ success: true, data: pets });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const pet = await petService.getById(
        parseInt(req.params.id),
        req.user!.propietario_id
      );
      res.json({ success: true, data: pet });
    } catch (error: any) {
      if (error.message === 'Mascota no encontrada') {
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

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const pet = await petService.create(req.body, req.user!.propietario_id);
      res.status(201).json({ success: true, data: pet });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const pet = await petService.update(
        parseInt(req.params.id),
        req.body,
        req.user!.propietario_id
      );
      res.json({ success: true, data: pet });
    } catch (error: any) {
      if (error.message === 'No autorizado') {
        res.status(403).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await petService.delete(parseInt(req.params.id), req.user!.propietario_id);
      res.json({ success: true, message: 'Mascota eliminada' });
    } catch (error: any) {
      if (error.message === 'No autorizado') {
        res.status(403).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }

  // Catálogos
  async getSexos(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const sexos = await petService.getSexos();
      res.json({ success: true, data: { sexos } });
    } catch (error) {
      next(error);
    }
  }

  async getPatronPelo(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const patron_pelo = await petService.getPatronPelo();
      res.json({ success: true, data: { patron_pelo } });
    } catch (error) {
      next(error);
    }
  }

  async getOrigenMascota(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const origen_mascota = await petService.getOrigenMascota();
      res.json({ success: true, data: { origen_mascota } });
    } catch (error) {
      next(error);
    }
  }

  async getFuncionMascota(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const funcion_mascota = await petService.getFuncionMascota();
      res.json({ success: true, data: { funcion_mascota } });
    } catch (error) {
      next(error);
    }
  }

  async getColores(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const colores = await petService.getColores();
      res.json({ success: true, data: { colores } });
    } catch (error) {
      next(error);
    }
  }

  async getEspecies(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const especies = await petService.getEspecies();
      res.json({ success: true, data: { especies } });
    } catch (error) {
      next(error);
    }
  }

  async getRazasByEspecie(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const razas = await petService.getRazasByEspecie(req.params.id_especie);
      res.json({ success: true, data: { razas } });
    } catch (error) {
      next(error);
    }
  }
}

export const petController = new PetController();