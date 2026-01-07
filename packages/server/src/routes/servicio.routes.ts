// src/routes/servicio.routes.ts
import { Router } from 'express';
import { servicioController } from '../controllers/servicio.controller';
import { requireAuth } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import {
  createServicioValidator,
  updateServicioValidator,
  servicioParamsValidator,
} from '../validators/servicio.validator';

const router = Router();

// ========================================
// RUTAS DE SERVICIOS
// ========================================

/**
 * GET /
 * Listar todos los servicios disponibles
 */
router.get(
  '/',
  servicioController.getAll.bind(servicioController)
);

/**
 * GET /:servicioId
 * Obtener un servicio específico
 */
router.get(
  '/:servicioId',
  servicioParamsValidator,
  validate,
  servicioController.getById.bind(servicioController)
);

/**
 * POST /
 * Crear nuevo servicio (requiere autenticación)
 */
router.post(
  '/',
  requireAuth,
  createServicioValidator,
  validate,
  servicioController.create.bind(servicioController)
);

/**
 * PUT /:servicioId
 * Actualizar servicio existente (requiere autenticación)
 */
router.put(
  '/:servicioId',
  requireAuth,
  updateServicioValidator,
  validate,
  servicioController.update.bind(servicioController)
);

/**
 * DELETE /:servicioId
 * Eliminar servicio (requiere autenticación)
 */
router.delete(
  '/:servicioId',
  requireAuth,
  servicioParamsValidator,
  validate,
  servicioController.delete.bind(servicioController)
);

export default router;
