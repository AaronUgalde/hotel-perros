// src/validators/alergia.validator.ts
import { body, param } from 'express-validator';

/**
 * Validación para agregar alergia a mascota
 */
export const createAlergiaValidator = [
  param('mascotaId')
    .isInt({ min: 1 })
    .withMessage('ID de mascota inválido'),
  body('alergia_id')
    .isInt()
    .withMessage('ID de alergia es requerido y debe ser un número entero'),
  body('severidad')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 50 })
    .withMessage('La severidad debe ser texto (máximo 50 caracteres)'),
];

/**
 * Validación para parámetros de eliminación
 */
export const deleteAlergiaValidator = [
  param('mascotaId')
    .isInt({ min: 1 })
    .withMessage('ID de mascota inválido'),
  param('alergiaId')
    .isInt({ min: 1 })
    .withMessage('ID de alergia inválido'),
];
