import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import db from '../db';
import { requireAuth } from '../middlewares/auth.middleware';

interface AuthRequest extends Request {
  user?: { propietario_id: number; rol_id: number };
}

const router = express.Router();
const uploadDir = process.env.UPLOAD_DIR || 'uploads';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, unique);
  }
});

const upload = multer({ storage });

/**
 * Obtener tipos de documentos (DEBE IR ANTES de rutas con parámetros)
 * GET /tipos_documentos
 */
router.get('/tipos_documentos', async (req: Request, res: Response) => {
  try {
    const q = `SELECT * FROM tipos_documentos`;
    const r = await db.query(q);

    res.json({ tipos_documentos: r.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

/**
 * Subir documento para una mascota
 * POST /:mascotaId/upload
 */
router.post('/:mascotaId/upload', requireAuth, upload.single('file'), async (req: AuthRequest, res) => {
  if (!req.file) return res.status(400).json({ error: 'File required (field: file)' });

  const mascotaId = req.params.mascotaId;
  try {
    const petCheck = await db.query(
      'SELECT mascota_id FROM public.mascotas WHERE mascota_id = $1 AND propietario_id = $2',
      [mascotaId, req.user!.propietario_id]
    );
    if (petCheck.rowCount === 0) {
      try { fs.unlinkSync(req.file.path); } catch (e) {}
      return res.status(404).json({ error: 'Mascota no encontrada o no pertenece al propietario' });
    }

    const tipoDocumento = req.body.tipo_documento_id ? Number(req.body.tipo_documento_id) : null;

    const r = await db.query(
      `INSERT INTO public.documentos_mascotas (mascota_id, tipo_documento_id, nombre_archivo, ruta_archivo)
       VALUES ($1,$2,$3,$4)
       RETURNING documento_id, mascota_id, tipo_documento_id, nombre_archivo, ruta_archivo, fecha_subida`,
      [mascotaId, tipoDocumento, req.file.originalname, req.file.path]
    );
    res.status(201).json(r.rows[0]);
  } catch (err) {
    console.error('Upload error:', err);
    if (req.file && req.file.path) try { fs.unlinkSync(req.file.path); } catch(e) {}
    res.status(500).json({ error: 'Error del servidor' });
  }
});

/**
 * Listar documentos de una mascota
 * GET /:mascotaId?tipo_documento_id=#
 */
router.get('/:mascotaId', requireAuth, async (req: AuthRequest, res) => {
  try {
    const mascotaId = req.params.mascotaId;
    const check = await db.query(
      'SELECT mascota_id FROM public.mascotas WHERE mascota_id = $1 AND propietario_id = $2',
      [mascotaId, req.user!.propietario_id]
    );
    if (check.rowCount === 0) return res.status(404).json({ error: 'Mascota no encontrada o no pertenece al propietario' });

    let query = `
      SELECT documento_id, tipo_documento_id, nombre_archivo, ruta_archivo, fecha_subida
      FROM public.documentos_mascotas
      WHERE mascota_id = $1
    `;
    const values: any[] = [mascotaId];

    if (req.query.tipo_documento_id) {
      query += ' AND tipo_documento_id = $2';
      values.push(Number(req.query.tipo_documento_id));
    }

    query += ' ORDER BY fecha_subida DESC';
    const r = await db.query(query, values);
    res.json(r.rows);
  } catch (err) {
    console.error('List docs error:', err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

/**
 * Descargar documento
 * GET /download/:documentoId
 */
router.get('/download/:documentoId', requireAuth, async (req: AuthRequest, res) => {
  try {
    const documentoId = req.params.documentoId;
    const q = `
      SELECT dm.ruta_archivo, m.propietario_id
      FROM public.documentos_mascotas dm
      JOIN public.mascotas m ON dm.mascota_id = m.mascota_id
      WHERE dm.documento_id = $1
    `;
    const r = await db.query(q, [documentoId]);
    if (r.rowCount === 0) return res.status(404).json({ error: 'Documento no encontrado' });

    const row = r.rows[0];
    if (row.propietario_id !== req.user!.propietario_id) return res.status(403).json({ error: 'No autorizado' });

    const filePath = row.ruta_archivo;
    if (!filePath || !fs.existsSync(filePath)) return res.status(404).json({ error: 'Archivo no encontrado en servidor' });

    res.sendFile(path.resolve(filePath));
  } catch (err) {
    console.error('Download error:', err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

/**
 * Eliminar documento
 * DELETE /:documentoId
 */
router.delete('/:documentoId', requireAuth, async (req: AuthRequest, res) => {
  try {
    const documentoId = req.params.documentoId;

    // Verificar que el documento pertenece al propietario
    const q = `
      SELECT dm.ruta_archivo, m.propietario_id
      FROM public.documentos_mascotas dm
      JOIN public.mascotas m ON dm.mascota_id = m.mascota_id
      WHERE dm.documento_id = $1
    `;
    const r = await db.query(q, [documentoId]);
    if (r.rowCount === 0) return res.status(404).json({ error: 'Documento no encontrado' });

    const row = r.rows[0];
    if (row.propietario_id !== req.user!.propietario_id) return res.status(403).json({ error: 'No autorizado' });

    // Borrar registro de BD
    await db.query('DELETE FROM public.documentos_mascotas WHERE documento_id = $1', [documentoId]);

    // Borrar archivo físico
    if (row.ruta_archivo && fs.existsSync(row.ruta_archivo)) {
      try { fs.unlinkSync(row.ruta_archivo); } catch(e) { console.warn('No se pudo borrar archivo:', e); }
    }

    res.json({ success: true });
  } catch (err) {
    console.error('Delete doc error:', err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

export default router;
