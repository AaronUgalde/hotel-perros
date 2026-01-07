// src/validators/desparasitacion.validator.ts
import { body, param } from 'express-validator';

/**
 * Validación para registrar desparasitación
 */
export const createDesparasitacionValidator = [
  param('mascotaId')
    .isInt({ min: 1 })
    .withMessage('ID de mascota inválido'),
  body('tipo')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 50 })
    .withMessage('El tipo debe ser texto (máximo 50 caracteres)'),
  body('producto')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 100 })
    .withMessage('El producto debe ser texto (máximo 100 caracteres)'),
  body('fecha')
    .optional()
    .isISO8601()
    .withMessage('La fecha debe ser una fecha válida (ISO8601)'),
  body('proxima_fecha')
    .optional()
    .isISO8601()
    .withMessage('La próxima fecha debe ser una fecha válida (ISO8601)'),
];

/**
 * Validación para actualizar desparasitación
 */
export const updateDesparasitacionValidator = [
  param('mascotaId')
    .isInt({ min: 1 })
    .withMessage('ID de mascota inválido'),
  param('desparasitacionId')
    .isInt({ min: 1 })
    .withMessage('ID de desparasitación inválido'),
  body('tipo')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 50 })
    .withMessage('El tipo debe ser texto (máximo 50 caracteres)'),
  body('producto')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 100 })
    .withMessage('El producto debe ser texto (máximo 100 caracteres)'),
  body('fecha')
    .optional()
    .isISO8601()
    .withMessage('La fecha debe ser una fecha válida (ISO8601)'),
  body('proxima_fecha')
    .optional()
    .isISO8601()
    .withMessage('La próxima fecha debe ser una fecha válida (ISO8601)'),
];

/**
 * Validación para parámetros de ruta
 */
export const desparasitacionParamsValidator = [
  param('mascotaId')
    .isInt({ min: 1 })
    .withMessage('ID de mascota inválido'),
  param('desparasitacionId')
    .isInt({ min: 1 })
    .withMessage('ID de desparasitación inválido'),
];
