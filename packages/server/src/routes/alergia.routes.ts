// src/routes/alergia.routes.ts
import { Router } from 'express';
import { alergiaController } from '../controllers/alergia.controller';
import { requireAuth } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import {
  createAlergiaValidator,
  deleteAlergiaValidator,
} from '../validators/alergia.validator';

const router = Router();

// ========================================
// CATÁLOGOS (Públicos - Sin Auth)
// ========================================

/**
 * GET /catalogo
 * Obtener catálogo completo de alergias
 */
router.get(
  '/catalogo',
  alergiaController.getCatalogo.bind(alergiaController)
);

// ========================================
// RUTAS DE ALERGIAS (Requieren Auth)
// ========================================

/**
 * GET /:mascotaId
 * Listar todas las alergias de una mascota
 */
router.get(
  '/:mascotaId',
  requireAuth,
  alergiaController.getAll.bind(alergiaController)
);

/**
 * POST /:mascotaId
 * Agregar alergia a una mascota
 */
router.post(
  '/:mascotaId',
  requireAuth,
  createAlergiaValidator,
  validate,
  alergiaController.create.bind(alergiaController)
);

/**
 * DELETE /:mascotaId/:alergiaId
 * Eliminar alergia de una mascota
 */
router.delete(
  '/:mascotaId/:alergiaId',
  requireAuth,
  deleteAlergiaValidator,
  validate,
  alergiaController.delete.bind(alergiaController)
);

export default router;
