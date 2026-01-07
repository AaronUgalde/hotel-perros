import { body, param } from 'express-validator';

export const createReservacionValidator = [
  body('mascota_id').isInt().withMessage('Mascota ID debe ser un número entero'),
  body('habitacion_id').isInt().withMessage('Habitación ID debe ser un número entero'),
  body('fecha_inicio').isISO8601().withMessage('Fecha de inicio debe ser una fecha válida'),
  body('fecha_fin').isISO8601().withMessage('Fecha de fin debe ser una fecha válida'),
  
  // Campos opcionales con validación
  body('estado_id').optional().isInt().withMessage('Estado ID debe ser un número entero'),
  body('monto_total_hospedaje').optional().isFloat({ min: 0 }).withMessage('Monto debe ser un número positivo'),
  body('notas_especiales').optional().trim(),
  
  // Validación personalizada: fecha_fin debe ser después de fecha_inicio
  body('fecha_fin').custom((value, { req }) => {
    const fechaInicio = new Date(req.body.fecha_inicio);
    const fechaFin = new Date(value);
    if (fechaFin <= fechaInicio) {
      throw new Error('La fecha de fin debe ser posterior a la fecha de inicio');
    }
    return true;
  }),
];

export const updateReservacionValidator = [
  body('mascota_id').optional().isInt().withMessage('Mascota ID debe ser un número entero'),
  body('habitacion_id').optional().isInt().withMessage('Habitación ID debe ser un número entero'),
  body('fecha_inicio').optional().isISO8601().withMessage('Fecha de inicio debe ser una fecha válida'),
  body('fecha_fin').optional().isISO8601().withMessage('Fecha de fin debe ser una fecha válida'),
  body('estado_id').optional().isInt().withMessage('Estado ID debe ser un número entero'),
  body('monto_total_hospedaje').optional().isFloat({ min: 0 }).withMessage('Monto debe ser un número positivo'),
  body('notas_especiales').optional().trim(),
  
  // Validación personalizada: si ambas fechas están presentes, verificar orden
  body('fecha_fin').optional().custom((value, { req }) => {
    if (req.body.fecha_inicio) {
      const fechaInicio = new Date(req.body.fecha_inicio);
      const fechaFin = new Date(value);
      if (fechaFin <= fechaInicio) {
        throw new Error('La fecha de fin debe ser posterior a la fecha de inicio');
      }
    }
    return true;
  }),
];

export const addServicioValidator = [
  body('servicio_id').isInt().withMessage('Servicio ID debe ser un número entero'),
  body('cantidad').optional().isInt({ min: 1 }).withMessage('Cantidad debe ser un número entero positivo'),
  body('precio_al_momento').isFloat({ min: 0 }).withMessage('Precio debe ser un número positivo'),
];

export const reservacionIdValidator = [
  param('id').isInt().withMessage('ID de reservación inválido'),
];

export const servicioIdValidator = [
  param('servicioId').isInt().withMessage('ID de servicio inválido'),
];
