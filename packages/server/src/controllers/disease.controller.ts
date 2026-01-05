// src/controllers/disease.controller.ts
import { Request, Response, NextFunction } from 'express';
import { diseaseService } from '../services/disease.service';

export class DiseaseController {
  /**
   * GET /api/diseases/:mascotaId
   * Listar enfermedades de una mascota
   */
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const mascotaId = parseInt(req.params.mascotaId);
      const propietarioId = req.user!.propietario_id;

      const diseases = await diseaseService.getAllByPet(
        mascotaId, 
        propietarioId
      );

      res.json({ 
        success: true, 
        data: diseases 
      });
    } catch (error: any) {
      if (error.message === 'Mascota no encontrada o no pertenece al propietario') {
        res.status(404).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }

  /**
   * GET /api/diseases/:mascotaId/:enfermedadId
   * Obtener una enfermedad específica
   */
  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const enfermedadId = parseInt(req.params.enfermedadId);
      const mascotaId = parseInt(req.params.mascotaId);
      const propietarioId = req.user!.propietario_id;

      const disease = await diseaseService.getById(
        enfermedadId,
        mascotaId,
        propietarioId
      );

      res.json({ 
        success: true, 
        data: disease 
      });
    } catch (error: any) {
      if (error.message === 'Mascota no encontrada o no pertenece al propietario') {
        res.status(404).json({ success: false, error: error.message });
        return;
      }
      if (error.message === 'Enfermedad no encontrada') {
        res.status(404).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }

  /**
   * POST /api/diseases/:mascotaId
   * Registrar nueva enfermedad
   */
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const mascotaId = parseInt(req.params.mascotaId);
      const propietarioId = req.user!.propietario_id;

      const disease = await diseaseService.create(
        {
          mascota_id: mascotaId,
          ...req.body
        },
        propietarioId
      );

      res.status(201).json({ 
        success: true, 
        data: disease,
        message: 'Enfermedad registrada exitosamente'
      });
    } catch (error: any) {
      if (error.message === 'Mascota no encontrada o no pertenece al propietario') {
        res.status(404).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }

  /**
   * PUT /api/diseases/:mascotaId/:enfermedadId
   * Actualizar enfermedad
   */
  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const enfermedadId = parseInt(req.params.enfermedadId);
      const mascotaId = parseInt(req.params.mascotaId);
      const propietarioId = req.user!.propietario_id;

      const disease = await diseaseService.update(
        enfermedadId,
        mascotaId,
        req.body,
        propietarioId
      );

      res.json({ 
        success: true, 
        data: disease,
        message: 'Enfermedad actualizada exitosamente'
      });
    } catch (error: any) {
      if (error.message === 'Mascota no encontrada o no pertenece al propietario') {
        res.status(404).json({ success: false, error: error.message });
        return;
      }
      if (error.message === 'Enfermedad no encontrada o nada que actualizar') {
        res.status(404).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }

  /**
   * DELETE /api/diseases/:mascotaId/:enfermedadId
   * Eliminar enfermedad
   */
  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const enfermedadId = parseInt(req.params.enfermedadId);
      const mascotaId = parseInt(req.params.mascotaId);
      const propietarioId = req.user!.propietario_id;

      await diseaseService.delete(
        enfermedadId,
        mascotaId,
        propietarioId
      );

      res.json({ 
        success: true, 
        message: 'Enfermedad eliminada exitosamente' 
      });
    } catch (error: any) {
      if (error.message === 'Mascota no encontrada o no pertenece al propietario') {
        res.status(404).json({ success: false, error: error.message });
        return;
      }
      if (error.message === 'Enfermedad no encontrada') {
        res.status(404).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }

  /**
   * GET /api/diseases/enfermedades/:id_especie
   * Obtener catálogo de enfermedades por especie
   */
  async getEnfermedadesByEspecie(
    req: Request, 
    res: Response, 
    next: NextFunction
  ): Promise<void> {
    try {
      const especieId = req.params.id_especie;
      
      const enfermedades = await diseaseService.getEnfermedadesByEspecie(especieId);

      res.json({ 
        success: true, 
        data: { enfermedades } 
      });
    } catch (error) {
      next(error);
    }
  }
}

export const diseaseController = new DiseaseController();
