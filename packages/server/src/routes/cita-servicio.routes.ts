import { Router } from 'express';
import { citaServicioController } from '../controllers/cita-servicio.controller';
import { requireAuth } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import { 
  createCitaServicioValidator, 
  updateCitaServicioValidator, 
  citaServicioIdValidator,
  reservacionIdValidator,
  empleadoIdValidator,
  dateRangeValidator
} from '../validators/cita-servicio.validator';

const router = Router();

// Búsquedas especiales (deben ir antes de /:id)
router.get(
  '/by-date-range',
  requireAuth,
  dateRangeValidator,
  validate,
  citaServicioController.getByDateRange.bind(citaServicioController)
);

router.get(
  '/by-empleado/:empleadoId',
  requireAuth,
  empleadoIdValidator,
  validate,
  citaServicioController.getByEmpleado.bind(citaServicioController)
);

router.get(
  '/by-reservacion/:reservacionId',
  requireAuth,
  reservacionIdValidator,
  validate,
  citaServicioController.getByReservacion.bind(citaServicioController)
);

// CRUD Citas de Servicios (requieren auth)
router.get('/', requireAuth, citaServicioController.getAll.bind(citaServicioController));

router.get(
  '/:id',
  requireAuth,
  citaServicioIdValidator,
  validate,
  citaServicioController.getById.bind(citaServicioController)
);

router.post(
  '/',
  requireAuth,
  createCitaServicioValidator,
  validate,
  citaServicioController.create.bind(citaServicioController)
);

router.put(
  '/:id',
  requireAuth,
  citaServicioIdValidator,
  updateCitaServicioValidator,
  validate,
  citaServicioController.update.bind(citaServicioController)
);

router.delete(
  '/:id',
  requireAuth,
  citaServicioIdValidator,
  validate,
  citaServicioController.delete.bind(citaServicioController)
);

export default router;
