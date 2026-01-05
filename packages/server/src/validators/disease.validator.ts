// src/validators/disease.validator.ts
import { body, param } from 'express-validator';

/**
 * Validación para registrar enfermedad
 */
export const createDiseaseValidator = [
  param('mascotaId')
    .isInt({ min: 1 })
    .withMessage('ID de mascota inválido'),
  body('enfermedad_id')
    .isInt()
    .withMessage('ID de enfermedad es requerido y debe ser un número entero'),
  body('fecha_diagnostico')
    .optional()
    .isISO8601()
    .withMessage('Fecha de diagnóstico debe ser una fecha válida (ISO8601)'),
  body('observaciones')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Observaciones deben ser texto (máximo 500 caracteres)'),
  body('tratamiento')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Tratamiento debe ser texto (máximo 500 caracteres)'),
];

/**
 * Validación para actualizar enfermedad
 */
export const updateDiseaseValidator = [
  param('mascotaId')
    .isInt({ min: 1 })
    .withMessage('ID de mascota inválido'),
  param('enfermedadId')
    .isInt({ min: 1 })
    .withMessage('ID de enfermedad inválido'),
  body('enfermedad_id')
    .optional()
    .isInt()
    .withMessage('ID de enfermedad debe ser un número entero'),
  body('fecha_diagnostico')
    .optional()
    .isISO8601()
    .withMessage('Fecha de diagnóstico debe ser una fecha válida (ISO8601)'),
  body('observaciones')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Observaciones deben ser texto (máximo 500 caracteres)'),
  body('tratamiento')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Tratamiento debe ser texto (máximo 500 caracteres)'),
];

/**
 * Validación para parámetros de ruta
 */
export const diseaseParamsValidator = [
  param('mascotaId')
    .isInt({ min: 1 })
    .withMessage('ID de mascota inválido'),
  param('enfermedadId')
    .isInt({ min: 1 })
    .withMessage('ID de enfermedad inválido'),
];

/**
 * Validación para catálogo de enfermedades
 */
export const especieIdValidator = [
  param('id_especie')
    .notEmpty()
    .withMessage('ID de especie es requerido')
    .isString()
    .isLength({ min: 1, max: 10 })
    .withMessage('ID de especie debe tener entre 1 y 10 caracteres'),
];
