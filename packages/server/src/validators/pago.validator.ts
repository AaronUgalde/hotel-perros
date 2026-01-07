import { body, param } from 'express-validator';

export const createPagoValidator = [
  body('reservacion_id').isInt().withMessage('Reservación ID debe ser un número entero'),
  body('monto').isFloat({ min: 0.01 }).withMessage('Monto debe ser un número positivo mayor a 0'),
  body('metodo_pago')
    .isIn(['efectivo', 'tarjeta_credito', 'tarjeta_debito', 'transferencia', 'paypal'])
    .withMessage('Método de pago no válido'),
  body('estado_pago')
    .optional()
    .isIn(['pendiente', 'procesando', 'completado', 'rechazado', 'cancelado'])
    .withMessage('Estado de pago no válido'),
];

export const updatePagoValidator = [
  body('monto')
    .optional()
    .isFloat({ min: 0.01 })
    .withMessage('Monto debe ser un número positivo mayor a 0'),
  body('metodo_pago')
    .optional()
    .isIn(['efectivo', 'tarjeta_credito', 'tarjeta_debito', 'transferencia', 'paypal'])
    .withMessage('Método de pago no válido'),
  body('estado_pago')
    .optional()
    .isIn(['pendiente', 'procesando', 'completado', 'rechazado', 'cancelado'])
    .withMessage('Estado de pago no válido'),
];

export const pagoIdValidator = [
  param('id').isInt().withMessage('ID de pago inválido'),
];

export const reservacionIdValidator = [
  param('reservacionId').isInt().withMessage('ID de reservación inválido'),
];
