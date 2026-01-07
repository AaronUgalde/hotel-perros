import { body, param, query } from 'express-validator';

export const createEmpleadoValidator = [
  body('nombre')
    .notEmpty()
    .withMessage('Nombre es requerido')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('El nombre debe tener entre 2 y 100 caracteres'),
  
  body('especialidad')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('La especialidad no puede exceder 50 caracteres'),
];

export const updateEmpleadoValidator = [
  body('nombre')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('El nombre debe tener entre 2 y 100 caracteres'),
  
  body('especialidad')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('La especialidad no puede exceder 50 caracteres'),
];

export const empleadoIdValidator = [
  param('id').isInt().withMessage('ID de empleado inválido'),
];

export const especialidadQueryValidator = [
  query('especialidad')
    .notEmpty()
    .withMessage('Especialidad es requerida para la búsqueda')
    .trim(),
];
