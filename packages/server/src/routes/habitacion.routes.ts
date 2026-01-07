// src/routes/habitacion.routes.ts
import { Router } from 'express';
import { habitacionController } from '../controllers/habitacion.controller';
import { requireAuth } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import {
  createHabitacionValidator,
  updateHabitacionValidator,
  habitacionParamsValidator,
  especieParamsValidator,
} from '../validators/habitacion.validator';

const router = Router();

// ========================================
// RUTAS DE HABITACIONES
// ========================================

/**
 * GET /
 * Listar todas las habitaciones
 * Query params: ?includeInactive=true (opcional, para incluir inactivas)
 */
router.get(
  '/',
  habitacionController.getAll.bind(habitacionController)
);

/**
 * GET /especie/:especieId
 * Obtener habitaciones por especie
 */
router.get(
  '/especie/:especieId',
  especieParamsValidator,
  validate,
  habitacionController.getByEspecie.bind(habitacionController)
);

/**
 * GET /:habitacionId
 * Obtener una habitación específica
 */
router.get(
  '/:habitacionId',
  habitacionParamsValidator,
  validate,
  habitacionController.getById.bind(habitacionController)
);

/**
 * POST /
 * Crear nueva habitación (requiere autenticación)
 */
router.post(
  '/',
  requireAuth,
  createHabitacionValidator,
  validate,
  habitacionController.create.bind(habitacionController)
);

/**
 * PUT /:habitacionId
 * Actualizar habitación existente (requiere autenticación)
 */
router.put(
  '/:habitacionId',
  requireAuth,
  updateHabitacionValidator,
  validate,
  habitacionController.update.bind(habitacionController)
);

/**
 * PATCH /:habitacionId/deactivate
 * Desactivar habitación (soft delete) (requiere autenticación)
 */
router.patch(
  '/:habitacionId/deactivate',
  requireAuth,
  habitacionParamsValidator,
  validate,
  habitacionController.softDelete.bind(habitacionController)
);

/**
 * DELETE /:habitacionId
 * Eliminar habitación permanentemente (requiere autenticación)
 */
router.delete(
  '/:habitacionId',
  requireAuth,
  habitacionParamsValidator,
  validate,
  habitacionController.delete.bind(habitacionController)
);

export default router;
