import { body } from 'express-validator';

export const updateOwnerValidator = [
  body('nombre').optional().isString().trim(),
  body('primer_apellido').optional().isString().trim(),
  body('segundo_apellido').optional().isString().trim(),
];

export const registerCompleteValidator = [
  body('propietario').isObject(),
  body('propietario.correo_electronico').isEmail(),
  body('propietario.password').isLength({ min: 6 }),
  body('telefonos').isArray({ min: 1 }),
  body('direcciones').optional().isArray(),
];