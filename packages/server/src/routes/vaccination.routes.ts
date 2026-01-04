// src/routes/vaccination.routes.ts
import { Router } from 'express';
import { vaccinationController } from '../controllers/vaccination.controller';
import { requireAuth } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import {
  createVaccinationValidator,
  updateVaccinationValidator,
  vaccinationParamsValidator,
  especieIdValidator,
} from '../validators/vaccination.validator';

const router = Router();

// ========================================
// CATÁLOGOS (Públicos - Sin Auth)
// ========================================
// IMPORTANTE: Las rutas específicas deben ir ANTES de las rutas con parámetros dinámicos

/**
 * GET /vacunas/:id_especie
 * Obtener catálogo de vacunas disponibles por especie
 */
router.get(
  '/vacunas/:id_especie',
  especieIdValidator,
  validate,
  vaccinationController.getVacunasByEspecie.bind(vaccinationController)
);

// ========================================
// RUTAS DE VACUNACIONES (Requieren Auth)
// ========================================

/**
 * GET /:mascotaId
 * Listar todas las vacunaciones de una mascota
 */
router.get(
  '/:mascotaId',
  requireAuth,
  vaccinationController.getAll.bind(vaccinationController)
);

/**
 * GET /:mascotaId/:vacunaId
 * Obtener una vacunación específica
 */
router.get(
  '/:mascotaId/:vacunaId',
  requireAuth,
  vaccinationParamsValidator,
  validate,
  vaccinationController.getById.bind(vaccinationController)
);

/**
 * POST /:mascotaId
 * Crear nueva vacunación para una mascota
 */
router.post(
  '/:mascotaId',
  requireAuth,
  createVaccinationValidator,
  validate,
  vaccinationController.create.bind(vaccinationController)
);

/**
 * PUT /:mascotaId/:vacunaId
 * Actualizar una vacunación existente
 */
router.put(
  '/:mascotaId/:vacunaId',
  requireAuth,
  updateVaccinationValidator,
  validate,
  vaccinationController.update.bind(vaccinationController)
);

/**
 * DELETE /:mascotaId/:vacunaId
 * Eliminar una vacunación
 */
router.delete(
  '/:mascotaId/:vacunaId',
  requireAuth,
  vaccinationParamsValidator,
  validate,
  vaccinationController.delete.bind(vaccinationController)
);

export default router;
