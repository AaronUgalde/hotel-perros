import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { petController } from '../controllers/pet.controller';
import { requireAuth } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import { 
  createPetValidator,
  createPetWithDetailsValidator,
  updatePetValidator, 
  petIdValidator,
  especieIdValidator 
} from '../validators/pet.validator';

const router = Router();

// Configuración de Multer para subida de archivos
const uploadDir = process.env.UPLOAD_DIR || 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, unique);
  },
});

const upload = multer({ storage });

// CRUD Mascotas (requieren auth)
router.get('/', requireAuth, petController.getAll.bind(petController));

router.get(
  '/:id',
  requireAuth,
  petIdValidator,
  validate,
  petController.getById.bind(petController)
);

// Crear mascota simple (sin detalles adicionales)
router.post(
  '/',
  requireAuth,
  createPetValidator,
  validate,
  petController.create.bind(petController)
);

// Crear mascota con detalles completos (vacunas, enfermedades, documentos)
// Soporta subida de múltiples archivos
router.post(
  '/with-details',
  requireAuth,
  upload.array('documentos', 10), // Máximo 10 archivos
  petController.createWithDetails.bind(petController)
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