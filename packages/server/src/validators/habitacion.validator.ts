// src/validators/habitacion.validator.ts
import { body, param } from 'express-validator';

/**
 * Validación para crear habitación
 */
export const createHabitacionValidator = [
  body('nombre_numero')
    .notEmpty()
    .withMessage('El nombre/número de la habitación es requerido')
    .isString()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('El nombre/número debe tener entre 1 y 50 caracteres'),
  body('descripcion')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 200 })
    .withMessage('La descripción debe tener máximo 200 caracteres'),
  body('capacidad_kg')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('La capacidad debe ser un número mayor o igual a 0')
    .custom((value) => {
      if (value !== undefined && value !== null) {
        const decimals = (value.toString().split('.')[1] || '').length;
        if (decimals > 2) {
          throw new Error('La capacidad debe tener máximo 2 decimales');
        }
      }
      return true;
    }),
  body('max_altura')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('La altura máxima debe ser un número mayor o igual a 0')
    .custom((value) => {
      if (value !== undefined && value !== null) {
        const decimals = (value.toString().split('.')[1] || '').length;
        if (decimals > 2) {
          throw new Error('La altura máxima debe tener máximo 2 decimales');
        }
      }
      return true;
    }),
  body('max_largo')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El largo máximo debe ser un número mayor o igual a 0')
    .custom((value) => {
      if (value !== undefined && value !== null) {
        const decimals = (value.toString().split('.')[1] || '').length;
        if (decimals > 2) {
          throw new Error('El largo máximo debe tener máximo 2 decimales');
        }
      }
      return true;
    }),
  body('precio_noche')
    .notEmpty()
    .withMessage('El precio por noche es requerido')
    .isFloat({ min: 0 })
    .withMessage('El precio por noche debe ser un número mayor o igual a 0')
    .custom((value) => {
      const decimals = (value.toString().split('.')[1] || '').length;
      if (decimals > 2) {
        throw new Error('El precio por noche debe tener máximo 2 decimales');
      }
      return true;
    }),
  body('activa')
    .optional()
    .isBoolean()
    .withMessage('El campo activa debe ser un valor booleano'),
  body('especie_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('El ID de especie debe ser un número entero válido'),
];

/**
 * Validación para actualizar habitación
 */
export const updateHabitacionValidator = [
  param('habitacionId')
    .isInt({ min: 1 })
    .withMessage('ID de habitación inválido'),
  body('nombre_numero')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('El nombre/número debe tener entre 1 y 50 caracteres'),
  body('descripcion')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 200 })
    .withMessage('La descripción debe tener máximo 200 caracteres'),
  body('capacidad_kg')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('La capacidad debe ser un número mayor o igual a 0')
    .custom((value) => {
      if (value !== undefined && value !== null) {
        const decimals = (value.toString().split('.')[1] || '').length;
        if (decimals > 2) {
          throw new Error('La capacidad debe tener máximo 2 decimales');
        }
      }
      return true;
    }),
  body('max_altura')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('La altura máxima debe ser un número mayor o igual a 0')
    .custom((value) => {
      if (value !== undefined && value !== null) {
        const decimals = (value.toString().split('.')[1] || '').length;
        if (decimals > 2) {
          throw new Error('La altura máxima debe tener máximo 2 decimales');
        }
      }
      return true;
    }),
  body('max_largo')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El largo máximo debe ser un número mayor o igual a 0')
    .custom((value) => {
      if (value !== undefined && value !== null) {
        const decimals = (value.toString().split('.')[1] || '').length;
        if (decimals > 2) {
          throw new Error('El largo máximo debe tener máximo 2 decimales');
        }
      }
      return true;
    }),
  body('precio_noche')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El precio por noche debe ser un número mayor o igual a 0')
    .custom((value) => {
      if (value !== undefined && value !== null) {
        const decimals = (value.toString().split('.')[1] || '').length;
        if (decimals > 2) {
          throw new Error('El precio por noche debe tener máximo 2 decimales');
        }
      }
      return true;
    }),
  body('activa')
    .optional()
    .isBoolean()
    .withMessage('El campo activa debe ser un valor booleano'),
  body('especie_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('El ID de especie debe ser un número entero válido'),
];

/**
 * Validación para parámetros de ruta
 */
export const habitacionParamsValidator = [
  param('habitacionId')
    .isInt({ min: 1 })
    .withMessage('ID de habitación inválido'),
];

/**
 * Validación para parámetros de especie
 */
export const especieParamsValidator = [
  param('especieId')
    .isInt({ min: 1 })
    .withMessage('ID de especie inválido'),
];
