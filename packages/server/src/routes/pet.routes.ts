import { Router } from 'express';
import { petController } from '../controllers/pet.controller';
import { requireAuth } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import { 
  createPetValidator, 
  updatePetValidator, 
  petIdValidator,
  especieIdValidator 
} from '../validators/pet.validator';

const router = Router();

// CRUD Mascotas (requieren auth)
router.get('/', requireAuth, petController.getAll.bind(petController));

router.get(
  '/:id',
  requireAuth,
  petIdValidator,
  validate,
  petController.getById.bind(petController)
);

router.post(
  '/',
  requireAuth,
  createPetValidator,
  validate,
  petController.create.bind(petController)
);

router.put(
  '/:id',
  requireAuth,
  petIdValidator,
  updatePetValidator,
  validate,
  petController.update.bind(petController)
);

router.delete(
  '/:id',
  requireAuth,
  petIdValidator,
  validate,
  petController.delete.bind(petController)
);

// Catálogos (públicos - sin auth)
router.get('/catalogs/sexos', petController.getSexos.bind(petController));
router.get('/catalogs/patron_pelo', petController.getPatronPelo.bind(petController));
router.get('/catalogs/origen_mascota', petController.getOrigenMascota.bind(petController));
router.get('/catalogs/funcion_mascota', petController.getFuncionMascota.bind(petController));
router.get('/catalogs/colores', petController.getColores.bind(petController));
router.get('/catalogs/especies', petController.getEspecies.bind(petController));
router.get(
  '/catalogs/razas/:id_especie',
  especieIdValidator,
  validate,
  petController.getRazasByEspecie.bind(petController)
);

export default router;