import { body, param } from 'express-validator';

export const createTelefonoValidator = [
  body('numero').isString().notEmpty().withMessage('Número de teléfono es requerido'),
  body('tipo_telefono_id').optional().isInt().withMessage('Tipo de teléfono ID debe ser un número entero'),
  body('nombre_contacto').optional().isString().trim(),
  body('relacion_contacto').optional().isString().trim(),
  body('es_principal').optional().isBoolean().withMessage('Es principal debe ser verdadero o falso'),
  body('notas').optional().isString().trim(),
];

export const updateTelefonoValidator = [
  body('numero').optional().isString().notEmpty(),
  body('tipo_telefono_id').optional().isInt(),
  body('nombre_contacto').optional().isString().trim(),
  body('relacion_contacto').optional().isString().trim(),
  body('es_principal').optional().isBoolean(),
  body('notas').optional().isString().trim(),
];

export const telefonoIdValidator = [
  param('telefonoId').isInt().withMessage('ID de teléfono inválido'),
];
