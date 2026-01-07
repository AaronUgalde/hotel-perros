import { body, param, query } from 'express-validator';

export const createCitaServicioValidator = [
  body('reservacion_id')
    .isInt()
    .withMessage('Reservación ID debe ser un número entero'),
  
  body('servicio_id')
    .isInt()
    .withMessage('Servicio ID debe ser un número entero'),
  
  body('empleado_id')
    .optional()
    .isInt()
    .withMessage('Empleado ID debe ser un número entero'),
  
  body('fecha_hora_inicio')
    .isISO8601()
    .withMessage('Fecha/hora de inicio debe ser válida (formato ISO8601)'),
  
  body('fecha_hora_fin')
    .isISO8601()
    .withMessage('Fecha/hora de fin debe ser válida (formato ISO8601)'),
  
  body('notas')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Las notas no pueden exceder 500 caracteres'),
  
  // Validación personalizada: fecha_hora_fin debe ser después de fecha_hora_inicio
  body('fecha_hora_fin').custom((value, { req }) => {
    const inicio = new Date(req.body.fecha_hora_inicio);
    const fin = new Date(value);
    if (fin <= inicio) {
      throw new Error('La fecha/hora de fin debe ser posterior a la fecha/hora de inicio');
    }
    return true;
  }),
];

export const updateCitaServicioValidator = [
  body('reservacion_id')
    .optional()
    .isInt()
    .withMessage('Reservación ID debe ser un número entero'),
  
  body('servicio_id')
    .optional()
    .isInt()
    .withMessage('Servicio ID debe ser un número entero'),
  
  body('empleado_id')
    .optional()
    .isInt()
    .withMessage('Empleado ID debe ser un número entero'),
  
  body('fecha_hora_inicio')
    .optional()
    .isISO8601()
    .withMessage('Fecha/hora de inicio debe ser válida (formato ISO8601)'),
  
  body('fecha_hora_fin')
    .optional()
    .isISO8601()
    .withMessage('Fecha/hora de fin debe ser válida (formato ISO8601)'),
  
  body('notas')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Las notas no pueden exceder 500 caracteres'),
  
  // Validación personalizada: si ambas fechas están presentes, verificar orden
  body('fecha_hora_fin').optional().custom((value, { req }) => {
    if (req.body.fecha_hora_inicio) {
      const inicio = new Date(req.body.fecha_hora_inicio);
      const fin = new Date(value);
      if (fin <= inicio) {
        throw new Error('La fecha/hora de fin debe ser posterior a la fecha/hora de inicio');
      }
    }
    return true;
  }),
];

export const citaServicioIdValidator = [
  param('id').isInt().withMessage('ID de cita inválido'),
];

export const reservacionIdValidator = [
  param('reservacionId').isInt().withMessage('ID de reservación inválido'),
];

export const empleadoIdValidator = [
  param('empleadoId').isInt().withMessage('ID de empleado inválido'),
];

export const dateRangeValidator = [
  query('fechaInicio')
    .notEmpty()
    .withMessage('Fecha de inicio es requerida')
    .isISO8601()
    .withMessage('Fecha de inicio debe ser válida (formato ISO8601)'),
  
  query('fechaFin')
    .notEmpty()
    .withMessage('Fecha de fin es requerida')
    .isISO8601()
    .withMessage('Fecha de fin debe ser válida (formato ISO8601)'),
];
