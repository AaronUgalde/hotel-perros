// src/routes/desparasitacion.routes.ts
import { Router } from 'express';
import { desparasitacionController } from '../controllers/desparasitacion.controller';
import { requireAuth } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import {
  createDesparasitacionValidator,
  updateDesparasitacionValidator,
  desparasitacionParamsValidator,
} from '../validators/desparasitacion.validator';

const router = Router();

// ========================================
// RUTAS DE DESPARASITACIONES (Requieren Auth)
// ========================================

/**
 * GET /:mascotaId
 * Listar todas las desparasitaciones de una mascota
 */
router.get(
  '/:mascotaId',
  requireAuth,
  desparasitacionController.getAll.bind(desparasitacionController)
);

/**
 * GET /:mascotaId/:desparasitacionId
 * Obtener una desparasitación específica
 */
router.get(
  '/:mascotaId/:desparasitacionId',
  requireAuth,
  desparasitacionParamsValidator,
  validate,
  desparasitacionController.getById.bind(desparasitacionController)
);

/**
 * POST /:mascotaId
 * Registrar nueva desparasitación para una mascota
 */
router.post(
  '/:mascotaId',
  requireAuth,
  createDesparasitacionValidator,
  validate,
  desparasitacionController.create.bind(desparasitacionController)
);

/**
 * PUT /:mascotaId/:desparasitacionId
 * Actualizar una desparasitación existente
 */
router.put(
  '/:mascotaId/:desparasitacionId',
  requireAuth,
  updateDesparasitacionValidator,
  validate,
  desparasitacionController.update.bind(desparasitacionController)
);

/**
 * DELETE /:mascotaId/:desparasitacionId
 * Eliminar una desparasitación
 */
router.delete(
  '/:mascotaId/:desparasitacionId',
  requireAuth,
  desparasitacionParamsValidator,
  validate,
  desparasitacionController.delete.bind(desparasitacionController)
);

export default router;
