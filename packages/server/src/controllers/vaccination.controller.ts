// src/controllers/vaccination.controller.ts
import { Request, Response, NextFunction } from 'express';
import { vaccinationService } from '../services/vaccination.service';

export class VaccinationController {
  /**
   * GET /api/pet-vaccinations/:mascotaId
   * Listar vacunaciones de una mascota
   */
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const mascotaId = parseInt(req.params.mascotaId);
      const propietarioId = req.user!.propietario_id;
      const rolId = req.user!.rol_id;

      const vaccinations = await vaccinationService.getAllByPet(
        mascotaId, 
        propietarioId,
        rolId
      );

      res.json({ 
        success: true, 
        data: vaccinations 
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
   * GET /api/pet-vaccinations/:mascotaId/:vacunaId
   * Obtener una vacunación específica
   */
  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const vacunaId = parseInt(req.params.vacunaId);
      const mascotaId = parseInt(req.params.mascotaId);
      const propietarioId = req.user!.propietario_id;

      const vaccination = await vaccinationService.getById(
        vacunaId,
        mascotaId,
        propietarioId
      );

      res.json({ 
        success: true, 
        data: vaccination 
      });
    } catch (error: any) {
      if (error.message === 'Mascota no encontrada o no pertenece al propietario') {
        res.status(404).json({ success: false, error: error.message });
        return;
      }
      if (error.message === 'Vacunación no encontrada') {
        res.status(404).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }

  /**
   * POST /api/pet-vaccinations/:mascotaId
   * Crear nueva vacunación
   */
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const mascotaId = parseInt(req.params.mascotaId);
      const propietarioId = req.user!.propietario_id;

      const vaccination = await vaccinationService.create(
        {
          mascota_id: mascotaId,
          ...req.body
        },
        propietarioId
      );

      res.status(201).json({ 
        success: true, 
        data: vaccination,
        message: 'Vacunación registrada exitosamente'
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
   * PUT /api/pet-vaccinations/:mascotaId/:vacunaId
   * Actualizar vacunación
   */
  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const vacunaId = parseInt(req.params.vacunaId);
      const mascotaId = parseInt(req.params.mascotaId);
      const propietarioId = req.user!.propietario_id;

      const vaccination = await vaccinationService.update(
        vacunaId,
        mascotaId,
        req.body,
        propietarioId
      );

      res.json({ 
        success: true, 
        data: vaccination,
        message: 'Vacunación actualizada exitosamente'
      });
    } catch (error: any) {
      if (error.message === 'Mascota no encontrada o no pertenece al propietario') {
        res.status(404).json({ success: false, error: error.message });
        return;
      }
      if (error.message === 'Vacunación no encontrada o nada que actualizar') {
        res.status(404).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }

  /**
   * DELETE /api/pet-vaccinations/:mascotaId/:vacunaId
   * Eliminar vacunación
   */
  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const vacunaId = parseInt(req.params.vacunaId);
      const mascotaId = parseInt(req.params.mascotaId);
      const propietarioId = req.user!.propietario_id;

      await vaccinationService.delete(
        vacunaId,
        mascotaId,
        propietarioId
      );

      res.json({ 
        success: true, 
        message: 'Vacunación eliminada exitosamente' 
      });
    } catch (error: any) {
      if (error.message === 'Mascota no encontrada o no pertenece al propietario') {
        res.status(404).json({ success: false, error: error.message });
        return;
      }
      if (error.message === 'Vacunación no encontrada') {
        res.status(404).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }

  /**
   * GET /api/pet-vaccinations/vacunas/:id_especie
   * Obtener catálogo de vacunas por especie
   */
  async getVacunasByEspecie(
    req: Request, 
    res: Response, 
    next: NextFunction
  ): Promise<void> {
    try {
      const especieId = req.params.id_especie;
      
      const vacunas = await vaccinationService.getVacunasByEspecie(especieId);

      res.json({ 
        success: true, 
        data: { vacunas } 
      });
    } catch (error) {
      next(error);
    }
  }
}

export const vaccinationController = new VaccinationController();
