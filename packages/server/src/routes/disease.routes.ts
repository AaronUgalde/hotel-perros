// src/routes/disease.routes.ts
import { Router } from 'express';
import { diseaseController } from '../controllers/disease.controller';
import { requireAuth } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import {
  createDiseaseValidator,
  updateDiseaseValidator,
  diseaseParamsValidator,
  especieIdValidator,
} from '../validators/disease.validator';

const router = Router();

// ========================================
// CATÁLOGOS (Públicos - Sin Auth)
// ========================================
// IMPORTANTE: Las rutas específicas deben ir ANTES de las rutas con parámetros dinámicos

/**
 * GET /enfermedades/:id_especie
 * Obtener catálogo de enfermedades disponibles por especie
 */
router.get(
  '/enfermedades/:id_especie',
  especieIdValidator,
  validate,
  diseaseController.getEnfermedadesByEspecie.bind(diseaseController)
);

// ========================================
// RUTAS DE ENFERMEDADES (Requieren Auth)
// ========================================

/**
 * GET /:mascotaId
 * Listar todas las enfermedades de una mascota
 */
router.get(
  '/:mascotaId',
  requireAuth,
  diseaseController.getAll.bind(diseaseController)
);

/**
 * GET /:mascotaId/:enfermedadId
 * Obtener una enfermedad específica
 */
router.get(
  '/:mascotaId/:enfermedadId',
  requireAuth,
  diseaseParamsValidator,
  validate,
  diseaseController.getById.bind(diseaseController)
);

/**
 * POST /:mascotaId
 * Registrar nueva enfermedad para una mascota
 */
router.post(
  '/:mascotaId',
  requireAuth,
  createDiseaseValidator,
  validate,
  diseaseController.create.bind(diseaseController)
);

/**
 * PUT /:mascotaId/:enfermedadId
 * Actualizar una enfermedad existente
 */
router.put(
  '/:mascotaId/:enfermedadId',
  requireAuth,
  updateDiseaseValidator,
  validate,
  diseaseController.update.bind(diseaseController)
);

/**
 * DELETE /:mascotaId/:enfermedadId
 * Eliminar una enfermedad
 */
router.delete(
  '/:mascotaId/:enfermedadId',
  requireAuth,
  diseaseParamsValidator,
  validate,
  diseaseController.delete.bind(diseaseController)
);

export default router;
