import { Router } from 'express';
import { reservacionController } from '../controllers/reservacion.controller';
import { requireAuth } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import { 
  createReservacionValidator, 
  updateReservacionValidator, 
  reservacionIdValidator,
  addServicioValidator,
  servicioIdValidator
} from '../validators/reservacion.validator';

const router = Router();

// CRUD Reservaciones (requieren auth)
router.get('/', requireAuth, reservacionController.getAll.bind(reservacionController));

router.get(
  '/:id',
  requireAuth,
  reservacionIdValidator,
  validate,
  reservacionController.getById.bind(reservacionController)
);

router.post(
  '/',
  requireAuth,
  createReservacionValidator,
  validate,
  reservacionController.create.bind(reservacionController)
);

router.put(
  '/:id',
  requireAuth,
  reservacionIdValidator,
  updateReservacionValidator,
  validate,
  reservacionController.update.bind(reservacionController)
);

router.delete(
  '/:id',
  requireAuth,
  reservacionIdValidator,
  validate,
  reservacionController.delete.bind(reservacionController)
);

// Gestión de servicios de reservación
router.post(
  '/:id/servicios',
  requireAuth,
  reservacionIdValidator,
  addServicioValidator,
  validate,
  reservacionController.addServicio.bind(reservacionController)
);

router.delete(
  '/:id/servicios/:servicioId',
  requireAuth,
  reservacionIdValidator,
  servicioIdValidator,
  validate,
  reservacionController.removeServicio.bind(reservacionController)
);

// Catálogos (públicos - sin auth)
router.get('/catalogs/estados', reservacionController.getEstadosReservacion.bind(reservacionController));
router.get('/catalogs/habitaciones', reservacionController.getHabitaciones.bind(reservacionController));
router.get('/catalogs/servicios', reservacionController.getServicios.bind(reservacionController));

export default router;
