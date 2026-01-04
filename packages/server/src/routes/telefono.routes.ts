import { Router } from 'express';
import { telefonoController } from '../controllers/telefono.controller';
import { requireAuth } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import {
  createTelefonoValidator,
  updateTelefonoValidator,
  telefonoIdValidator,
} from '../validators/telefono.validator';

const router = Router();

// Catálogos públicos (sin autenticación)
router.get('/tipos', telefonoController.getTiposTelefono.bind(telefonoController));
router.get('/tipos_telefono', telefonoController.getTiposTelefono.bind(telefonoController));

// CRUD Teléfonos (requieren autenticación)
router.get('/', requireAuth, telefonoController.getAll.bind(telefonoController));

router.get(
  '/:telefonoId',
  requireAuth,
  telefonoIdValidator,
  validate,
  telefonoController.getById.bind(telefonoController)
);

router.post(
  '/',
  requireAuth,
  createTelefonoValidator,
  validate,
  telefonoController.create.bind(telefonoController)
);

router.put(
  '/:telefonoId',
  requireAuth,
  telefonoIdValidator,
  updateTelefonoValidator,
  validate,
  telefonoController.update.bind(telefonoController)
);

router.delete(
  '/:telefonoId',
  requireAuth,
  telefonoIdValidator,
  validate,
  telefonoController.delete.bind(telefonoController)
);

export default router;
