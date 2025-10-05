import express from 'express';
import db from '../db';
import { requireAuth, AuthRequest } from '../middleware/auth';
import { body, validationResult } from 'express-validator';

const router = express.Router();

/**
 * Listar vacunas de una mascota
 * GET /:mascotaId
 */
router.get('/:mascotaId', requireAuth, async (req: AuthRequest, res) => {
  try {
    const mascotaId = Number(req.params.mascotaId);
    // Verificar que la mascota pertenece al propietario autenticado
    const check = await db.query(
      'SELECT mascota_id FROM public.mascotas WHERE mascota_id = $1 AND propietario_id = $2',
      [mascotaId, req.user!.id_propietario]
    );
    if (check.rowCount === 0) return res.status(404).json({ error: 'Mascota no encontrada o no pertenece al propietario' });

    const r = await db.query(
      `SELECT vacuna_mascota_id, mascota_id, vacuna_id, nombre_vacuna, fecha_aplicacion, vigencia_hasta, veterinario, notas
       FROM public.vacunas_mascotas
       WHERE mascota_id = $1
       ORDER BY fecha_aplicacion DESC`,
      [mascotaId]
    );
    res.json(r.rows);
  } catch (err) {
    console.error('List vaccinations error:', err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

/**
 * Agregar vacunación
 * POST /:mascotaId
 */
router.post(
  '/:mascotaId',
  requireAuth,
  body('nombre_vacuna').optional().isString(),
  body('vacuna_id').optional().isInt(),
  body('fecha_aplicacion').optional().isISO8601(),
  body('vigencia_hasta').optional().isISO8601(),
  body('veterinario').optional().isString(),
  body('notas').optional().isString(),
  async (req: AuthRequest, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const mascotaId = Number(req.params.mascotaId);
      const { nombre_vacuna, vacuna_id, fecha_aplicacion, vigencia_hasta, veterinario, notas } = req.body;

      // Verificar pertenencia
      const check = await db.query(
        'SELECT mascota_id FROM public.mascotas WHERE mascota_id = $1 AND propietario_id = $2',
        [mascotaId, req.user!.id_propietario]
      );
      if (check.rowCount === 0) return res.status(404).json({ error: 'Mascota no encontrada o no pertenece al propietario' });

      const q = `
        INSERT INTO public.vacunas_mascotas
          (mascota_id, vacuna_id, nombre_vacuna, fecha_aplicacion, vigencia_hasta, veterinario, notas)
        VALUES ($1,$2,$3,$4,$5,$6,$7)
        RETURNING vacuna_mascota_id, mascota_id, vacuna_id, nombre_vacuna, fecha_aplicacion, vigencia_hasta, veterinario, notas
      `;
      const r = await db.query(q, [
        mascotaId,
        vacuna_id ?? null,
        nombre_vacuna ?? null,
        fecha_aplicacion ?? null,
        vigencia_hasta ?? null,
        veterinario ?? null,
        notas ?? null,
      ]);
      res.status(201).json(r.rows[0]);
    } catch (err) {
      console.error('Add vaccination error:', err);
      res.status(500).json({ error: 'Error del servidor' });
    }
  }
);

/**
 * Actualizar vacunación
 * PUT /:mascotaId/:vacunaId
 */
router.put('/:mascotaId/:vacunaId', requireAuth, async (req: AuthRequest, res) => {
  try {
    const mascotaId = Number(req.params.mascotaId);
    const vacunaId = Number(req.params.vacunaId);

    // Verificar pertenencia de la mascota
    const check = await db.query(
      'SELECT mascota_id FROM public.mascotas WHERE mascota_id = $1 AND propietario_id = $2',
      [mascotaId, req.user!.id_propietario]
    );
    if (check.rowCount === 0) return res.status(404).json({ error: 'Mascota no encontrada o no pertenece al propietario' });

    // Campos permitidos para actualizar y su mapping al nombre real en la tabla
    const allowed: { [k: string]: string } = {
      nombre_vacuna: 'nombre_vacuna',
      vacuna_id: 'vacuna_id',
      fecha_aplicacion: 'fecha_aplicacion',
      vigencia_hasta: 'vigencia_hasta',
      veterinario: 'veterinario',
      notas: 'notas',
    };

    const sets: string[] = [];
    const vals: any[] = [];
    let idx = 1;
    for (const key of Object.keys(allowed)) {
      if (req.body[key] !== undefined) {
        sets.push(`${allowed[key]} = $${idx++}`);
        vals.push(req.body[key]);
      }
    }

    if (sets.length === 0) return res.status(400).json({ error: 'Nada que actualizar' });

    // Condición: vacuna_mascota_id = $n AND mascota_id = $m
    vals.push(vacunaId, mascotaId);
    const sql = `UPDATE public.vacunas_mascotas SET ${sets.join(', ')} WHERE vacuna_mascota_id = $${idx++} AND mascota_id = $${idx} RETURNING *`;
    const r = await db.query(sql, vals);
    if (r.rowCount === 0) return res.status(404).json({ error: 'Vacunación no encontrada' });

    res.json(r.rows[0]);
  } catch (err) {
    console.error('Update vaccination error:', err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

/**
 * Eliminar vacunación
 * DELETE /:mascotaId/:vacunaId
 */
router.delete('/:mascotaId/:vacunaId', requireAuth, async (req: AuthRequest, res) => {
  try {
    const mascotaId = Number(req.params.mascotaId);
    const vacunaId = Number(req.params.vacunaId);

    // Verificar pertenencia de la mascota
    const check = await db.query(
      'SELECT mascota_id FROM public.mascotas WHERE mascota_id = $1 AND propietario_id = $2',
      [mascotaId, req.user!.id_propietario]
    );
    if (check.rowCount === 0) return res.status(404).json({ error: 'Mascota no encontrada o no pertenece al propietario' });

    const r = await db.query(
      'DELETE FROM public.vacunas_mascotas WHERE vacuna_mascota_id = $1 AND mascota_id = $2 RETURNING vacuna_mascota_id',
      [vacunaId, mascotaId]
    );
    if (r.rowCount === 0) return res.status(404).json({ error: 'Vacunación no encontrada' });

    res.json({ success: true });
  } catch (err) {
    console.error('Delete vaccination error:', err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

export default router;
