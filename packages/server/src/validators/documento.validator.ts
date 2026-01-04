import { param, body } from 'express-validator';

export const mascotaIdValidator = [
  param('mascotaId').isInt().withMessage('ID de mascota inválido'),
];

export const documentoIdValidator = [
  param('documentoId').isInt().withMessage('ID de documento inválido'),
];

export const uploadDocumentValidator = [
  param('mascotaId').isInt().withMessage('ID de mascota inválido'),
  body('tipo_documento_id').optional().isInt().withMessage('Tipo de documento ID debe ser un número entero'),
];
