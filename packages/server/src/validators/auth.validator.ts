// src/validators/auth.validator.ts
import { body } from 'express-validator';

export const registerValidator = [
  body('email')
    .isEmail()
    .withMessage('Email inválido')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('nombre')
    .optional()
    .isString()
    .trim(),
  body('primer_apellido')
    .optional()
    .isString()
    .trim(),
  body('segundo_apellido')
    .optional()
    .isString()
    .trim(),
];

export const loginValidator = [
  body('password')
    .notEmpty()
    .withMessage('La contraseña es requerida'),
];