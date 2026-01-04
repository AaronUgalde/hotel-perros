import { body, param } from 'express-validator';

export const createDireccionValidator = [
  body('tipo_domicilio_id').isInt().withMessage('Tipo de domicilio ID debe ser un número entero'),
  body('calle').optional().isString().trim(),
  body('num_exterior').optional().isString().trim(),
  body('num_interior').optional().isString().trim(),
  body('colonia_id').optional().isInt().withMessage('Colonia ID debe ser un número entero'),
  body('estado_id').optional().isInt().withMessage('Estado ID debe ser un número entero'),
  body('municipio_id').optional().isInt().withMessage('Municipio ID debe ser un número entero'),
  body('codigo_postal').optional().isString().trim().isLength({ min: 5, max: 5 }).withMessage('Código postal debe tener 5 dígitos'),
  body('notas').optional().isString().trim(),
  body('es_predeterminada').optional().isBoolean().withMessage('Es predeterminada debe ser verdadero o falso'),
  body('fecha_inicio').optional().isISO8601().withMessage('Fecha de inicio debe ser una fecha válida'),
  body('fecha_fin').optional().isISO8601().withMessage('Fecha fin debe ser una fecha válida'),
];

export const updateDireccionValidator = [
  body('tipo_domicilio_id').optional().isInt(),
  body('calle').optional().isString().trim(),
  body('num_exterior').optional().isString().trim(),
  body('num_interior').optional().isString().trim(),
  body('colonia_id').optional().isInt(),
  body('estado_id').optional().isInt(),
  body('municipio_id').optional().isInt(),
  body('codigo_postal').optional().isString().trim().isLength({ min: 5, max: 5 }),
  body('notas').optional().isString().trim(),
  body('es_predeterminada').optional().isBoolean(),
  body('fecha_inicio').optional().isISO8601(),
  body('fecha_fin').optional().isISO8601(),
];

export const direccionIdValidator = [
  param('direccionId').isInt().withMessage('ID de dirección inválido'),
];

export const estadoIdValidator = [
  param('estadoId').isInt().withMessage('ID de estado inválido'),
];

export const municipioIdValidator = [
  param('municipioId').isInt().withMessage('ID de municipio inválido'),
];

export const codigoPostalValidator = [
  param('cp').isString().trim().isLength({ min: 5, max: 5 }).withMessage('Código postal debe tener 5 dígitos'),
];
