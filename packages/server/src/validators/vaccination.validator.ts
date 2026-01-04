// src/validators/vaccination.validator.ts
import { body, param } from 'express-validator';

/**
 * Validación para crear vacunación
 */
export const createVaccinationValidator = [
  param('mascotaId')
    .isInt({ min: 1 })
    .withMessage('ID de mascota inválido'),
  body('vacuna_id')
    .optional()
    .isInt()
    .withMessage('ID de vacuna debe ser un número entero'),
  body('nombre_vacuna')
    .optional()
    .isString()
    .trim()
    .withMessage('Nombre de vacuna debe ser texto'),
  body('fecha_aplicacion')
    .optional()
    .isISO8601()
    .withMessage('Fecha de aplicación debe ser una fecha válida (ISO8601)'),
  body('vigencia_hasta')
    .optional()
    .isISO8601()
    .withMessage('Vigencia hasta debe ser una fecha válida (ISO8601)'),
  body('veterinario')
    .optional()
    .isString()
    .trim()
    .withMessage('Veterinario debe ser texto'),
  body('notas')
    .optional()
    .isString()
    .trim()
    .withMessage('Notas deben ser texto'),
];

/**
 * Validación para actualizar vacunación
 */
export const updateVaccinationValidator = [
  param('mascotaId')
    .isInt({ min: 1 })
    .withMessage('ID de mascota inválido'),
  param('vacunaId')
    .isInt({ min: 1 })
    .withMessage('ID de vacunación inválido'),
  body('vacuna_id')
    .optional()
    .isInt()
    .withMessage('ID de vacuna debe ser un número entero'),
  body('nombre_vacuna')
    .optional()
    .isString()
    .trim()
    .withMessage('Nombre de vacuna debe ser texto'),
  body('fecha_aplicacion')
    .optional()
    .isISO8601()
    .withMessage('Fecha de aplicación debe ser una fecha válida (ISO8601)'),
  body('vigencia_hasta')
    .optional()
    .isISO8601()
    .withMessage('Vigencia hasta debe ser una fecha válida (ISO8601)'),
  body('veterinario')
    .optional()
    .isString()
    .trim()
    .withMessage('Veterinario debe ser texto'),
  body('notas')
    .optional()
    .isString()
    .trim()
    .withMessage('Notas deben ser texto'),
];

/**
 * Validación para parámetros de ruta
 */
export const vaccinationParamsValidator = [
  param('mascotaId')
    .isInt({ min: 1 })
    .withMessage('ID de mascota inválido'),
  param('vacunaId')
    .isInt({ min: 1 })
    .withMessage('ID de vacunación inválido'),
];

/**
 * Validación para catálogo de vacunas
 */
export const especieIdValidator = [
  param('id_especie')
    .notEmpty()
    .withMessage('ID de especie es requerido')
    .isString()
    .isLength({ min: 1, max: 10 })
    .withMessage('ID de especie debe tener entre 1 y 10 caracteres'),
];
