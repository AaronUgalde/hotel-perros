import { Router } from 'express';
import { pagoController } from '../controllers/pago.controller';
import { requireAuth } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import {
  createPagoValidator,
  updatePagoValidator,
  pagoIdValidator,
  reservacionIdValidator
} from '../validators/pago.validator';

const router = Router();

// CRUD Pagos (requieren auth)
router.get('/', requireAuth, pagoController.getAll.bind(pagoController));

router.get(
  '/:id',
  requireAuth,
  pagoIdValidator,
  validate,
  pagoController.getById.bind(pagoController)
);

router.get(
  '/reservacion/:reservacionId',
  requireAuth,
  reservacionIdValidator,
  validate,
  pagoController.getByReservacion.bind(pagoController)
);

router.post(
  '/',
  requireAuth,
  createPagoValidator,
  validate,
  pagoController.create.bind(pagoController)
);

router.put(
  '/:id',
  requireAuth,
  pagoIdValidator,
  updatePagoValidator,
  validate,
  pagoController.update.bind(pagoController)
);

router.delete(
  '/:id',
  requireAuth,
  pagoIdValidator,
  validate,
  pagoController.delete.bind(pagoController)
);

// Catálogos (públicos - sin auth)
router.get('/catalogs/metodos-pago', pagoController.getMetodosPago.bind(pagoController));
router.get('/catalogs/estados-pago', pagoController.getEstadosPago.bind(pagoController));

export default router;
