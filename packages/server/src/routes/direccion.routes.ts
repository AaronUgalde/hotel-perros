import { Router } from 'express';
import { direccionController } from '../controllers/direccion.controller';
import { requireAuth } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import {
  createDireccionValidator,
  updateDireccionValidator,
  direccionIdValidator,
  estadoIdValidator,
  municipioIdValidator,
  codigoPostalValidator,
} from '../validators/direccion.validator';

const router = Router();

// Catálogos públicos (sin autenticación)
router.get('/tipos', direccionController.getTiposDomicilio.bind(direccionController));
router.get('/tipos-domicilio', direccionController.getTiposDomicilio.bind(direccionController));
router.get('/estados', direccionController.getEstados.bind(direccionController));
router.get(
  '/municipios/:estadoId',
  estadoIdValidator,
  validate,
  direccionController.getMunicipiosByEstado.bind(direccionController)
);
router.get(
  '/colonias/:municipioId/:cp',
  municipioIdValidator,
  codigoPostalValidator,
  validate,
  direccionController.getColoniasByMunicipioAndCP.bind(direccionController)
);
router.get(
  '/codigo-postal/:cp',
  codigoPostalValidator,
  validate,
  direccionController.getInfoByCodigoPostal.bind(direccionController)
);

// CRUD Direcciones (requieren autenticación)
router.get('/', requireAuth, direccionController.getAll.bind(direccionController));

router.get(
  '/:direccionId',
  requireAuth,
  direccionIdValidator,
  validate,
  direccionController.getById.bind(direccionController)
);

router.post(
  '/',
  requireAuth,
  createDireccionValidator,
  validate,
  direccionController.create.bind(direccionController)
);

router.put(
  '/:direccionId',
  requireAuth,
  direccionIdValidator,
  updateDireccionValidator,
  validate,
  direccionController.update.bind(direccionController)
);

router.delete(
  '/:direccionId',
  requireAuth,
  direccionIdValidator,
  validate,
  direccionController.delete.bind(direccionController)
);

export default router;
