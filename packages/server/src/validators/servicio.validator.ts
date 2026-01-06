// src/validators/servicio.validator.ts
import { body, param } from 'express-validator';

/**
 * Validación para crear servicio
 */
export const createServicioValidator = [
  body('nombre')
    .notEmpty()
    .withMessage('El nombre del servicio es requerido')
    .isString()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('El nombre debe tener entre 1 y 100 caracteres'),
  body('descripcion')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 500 })
    .withMessage('La descripción debe tener máximo 500 caracteres'),
  body('precio_unitario')
    .notEmpty()
    .withMessage('El precio unitario es requerido')
    .isFloat({ min: 0 })
    .withMessage('El precio unitario debe ser un número mayor o igual a 0')
    .custom((value) => {
      // Validar que tenga máximo 2 decimales
      const decimals = (value.toString().split('.')[1] || '').length;
      if (decimals > 2) {
        throw new Error('El precio unitario debe tener máximo 2 decimales');
      }
      return true;
    }),
];

/**
 * Validación para actualizar servicio
 */
export const updateServicioValidator = [
  param('servicioId')
    .isInt({ min: 1 })
    .withMessage('ID de servicio inválido'),
  body('nombre')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('El nombre debe tener entre 1 y 100 caracteres'),
  body('descripcion')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 500 })
    .withMessage('La descripción debe tener máximo 500 caracteres'),
  body('precio_unitario')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El precio unitario debe ser un número mayor o igual a 0')
    .custom((value) => {
      if (value !== undefined) {
        const decimals = (value.toString().split('.')[1] || '').length;
        if (decimals > 2) {
          throw new Error('El precio unitario debe tener máximo 2 decimales');
        }
      }
      return true;
    }),
];

/**
 * Validación para parámetros de ruta
 */
export const servicioParamsValidator = [
  param('servicioId')
    .isInt({ min: 1 })
    .withMessage('ID de servicio inválido'),
];
