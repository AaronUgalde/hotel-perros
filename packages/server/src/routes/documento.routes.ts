import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { documentoController } from '../controllers/documento.controller';
import { requireAuth } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import {
  mascotaIdValidator,
  documentoIdValidator,
  uploadDocumentValidator,
} from '../validators/documento.validator';

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

// Catálogos públicos (sin autenticación)
router.get('/tipos_documentos', documentoController.getTiposDocumento.bind(documentoController));

// Descargar documento (antes de rutas con :mascotaId para evitar conflictos)
router.get(
  '/download/:documentoId',
  requireAuth,
  documentoIdValidator,
  validate,
  documentoController.download.bind(documentoController)
);

// CRUD Documentos (requieren autenticación)
// Listar documentos de una mascota
router.get(
  '/:mascotaId',
  requireAuth,
  mascotaIdValidator,
  validate,
  documentoController.getByMascota.bind(documentoController)
);

// Subir documento
router.post(
  '/:mascotaId/upload',
  requireAuth,
  upload.single('file'),
  uploadDocumentValidator,
  validate,
  documentoController.upload.bind(documentoController)
);

// Eliminar documento
router.delete(
  '/:documentoId',
  requireAuth,
  documentoIdValidator,
  validate,
  documentoController.delete.bind(documentoController)
);

export default router;
