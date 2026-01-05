import { body } from 'express-validator';

export const updateOwnerValidator = [
  body('nombre').optional().isString().trim(),
  body('primer_apellido').optional().isString().trim(),
  body('segundo_apellido').optional().isString().trim(),
];

export const registerCompleteValidator = [
  body('propietario').isObject(),
  body('propietario.correo_electronico').isEmail().withMessage('Email inválido'),
  body('propietario.password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('propietario.nombre')
    .trim()
    .notEmpty().withMessage('El nombre es requerido')
    .isLength({ max: 80 }).withMessage('El nombre no puede exceder 80 caracteres'),
  body('propietario.primer_apellido')
    .trim()
    .notEmpty().withMessage('El primer apellido es requerido')
    .isLength({ max: 80 }).withMessage('El primer apellido no puede exceder 80 caracteres'),
  body('propietario.segundo_apellido')
    .optional()
    .trim()
    .isLength({ max: 80 }).withMessage('El segundo apellido no puede exceder 80 caracteres'),
  body('telefonos').isArray({ min: 1 }).withMessage('Debe incluir al menos un teléfono'),
  body('direcciones').optional().isArray(),
];