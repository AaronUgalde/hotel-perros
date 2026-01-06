import { body, param } from 'express-validator';

export const createPetValidator = [
  body('nombre').notEmpty().trim().withMessage('Nombre es requerido'),
  body('especie_id').isInt().withMessage('Especie ID debe ser un número entero'),
  body('sexo_id').isInt().withMessage('Sexo ID debe ser un número entero'),
  body('fecha_nacimiento').isISO8601().withMessage('Fecha de nacimiento debe ser una fecha válida'),
  
  // Campos opcionales con validación
  body('raza_id').optional().isInt().withMessage('Raza ID debe ser un número entero'),
  body('peso_kg').optional().isFloat({ min: 0 }).withMessage('Peso debe ser un número positivo'),
  body('altura_cm').optional().isFloat({ min: 0 }).withMessage('Altura debe ser un número positivo'),
  body('largo_cm').optional().isFloat({ min: 0 }).withMessage('Largo debe ser un número positivo'),
  body('patron_pelo_id').optional().isInt().withMessage('Patrón de pelo ID debe ser un número entero'),
  body('color_principal_id').optional().isInt().withMessage('Color principal ID debe ser un número entero'),
  body('color_ojos_id').optional().isInt().withMessage('Color de ojos ID debe ser un número entero'),
  body('numero_chip').optional().isFloat().withMessage('Número de chip debe ser un número'),
  body('ruac').optional().isFloat().withMessage('RUAC debe ser un número'),
  body('esterilizado').optional().isBoolean().withMessage('Esterilizado debe ser verdadero o falso'),
  body('senas_particulares').optional().trim(),
  body('fecha_alta').optional().isISO8601().withMessage('Fecha de alta debe ser una fecha válida'),
  body('origen_id').optional().isInt().withMessage('Origen ID debe ser un número entero'),
  body('funcion_id').optional().isInt().withMessage('Función ID debe ser un número entero'),
  body('mestizo').optional().isBoolean().withMessage('Mestizo debe ser verdadero o falso'),
  body('url_database_chip').optional().isFloat().withMessage('URL database chip debe ser un número'),
  body('frecuency_chip').optional().isFloat().withMessage('Frecuency chip debe ser un número'),
];

// Validador para crear mascota con información completa
export const createPetWithDetailsValidator = [
  // Validaciones de mascota
  body('pet.nombre').notEmpty().trim().withMessage('Nombre de mascota es requerido'),
  body('pet.especie_id').isInt().withMessage('Especie ID debe ser un número entero'),
  body('pet.sexo_id').isInt().withMessage('Sexo ID debe ser un número entero'),
  body('pet.fecha_nacimiento').isISO8601().withMessage('Fecha de nacimiento debe ser una fecha válida'),
  
  // Validaciones de vacunas (array opcional)
  body('vacunas').optional().isArray().withMessage('Vacunas debe ser un array'),
  body('vacunas.*.vacuna_id').optional().isInt().withMessage('Vacuna ID debe ser un número entero'),
  body('vacunas.*.nombre_vacuna').optional().trim(),
  body('vacunas.*.fecha_aplicacion').optional().isISO8601().withMessage('Fecha de aplicación debe ser válida'),
  body('vacunas.*.vigencia_hasta').optional().isISO8601().withMessage('Vigencia hasta debe ser válida'),
  body('vacunas.*.veterinario').optional().trim(),
  body('vacunas.*.notas').optional().trim(),
  
  // Validaciones de enfermedades (array opcional)
  body('enfermedades').optional().isArray().withMessage('Enfermedades debe ser un array'),
  body('enfermedades.*.enfermedad_id').isInt().withMessage('Enfermedad ID debe ser un número entero'),
  body('enfermedades.*.fecha_diagnostico').optional().isISO8601().withMessage('Fecha de diagnóstico debe ser válida'),
  body('enfermedades.*.observaciones').optional().trim(),
  body('enfermedades.*.tratamiento').optional().trim(),
  
  // Validaciones de documentos (array opcional)
  body('documentos').optional().isArray().withMessage('Documentos debe ser un array'),
  body('documentos.*.tipo_documento_id').optional().isInt().withMessage('Tipo de documento ID debe ser un número entero'),
  body('documentos.*.nombre_archivo').notEmpty().trim().withMessage('Nombre de archivo es requerido'),
  body('documentos.*.ruta_archivo').notEmpty().trim().withMessage('Ruta de archivo es requerida'),
];

export const updatePetValidator = [
  body('nombre').optional().trim(),
  body('especie_id').optional().isInt(),
  body('sexo_id').optional().isInt(),
  body('fecha_nacimiento').optional().isISO8601(),
  body('raza_id').optional().isInt(),
  body('peso_kg').optional().isFloat({ min: 0 }),
  body('altura_cm').optional().isFloat({ min: 0 }),
  body('largo_cm').optional().isFloat({ min: 0 }),
  body('patron_pelo_id').optional().isInt(),
  body('color_principal_id').optional().isInt(),
  body('color_ojos_id').optional().isInt(),
  body('numero_chip').optional().isFloat(),
  body('ruac').optional().isFloat(),
  body('esterilizado').optional().isBoolean(),
  body('senas_particulares').optional().trim(),
  body('fecha_alta').optional().isISO8601(),
  body('origen_id').optional().isInt(),
  body('funcion_id').optional().isInt(),
  body('mestizo').optional().isBoolean(),
  body('url_database_chip').optional().isFloat(),
  body('frecuency_chip').optional().isFloat(),
];

export const petIdValidator = [
  param('id').isInt().withMessage('ID inválido'),
];

export const especieIdValidator = [
  param('id_especie').notEmpty().withMessage('ID de especie requerido'),
];
