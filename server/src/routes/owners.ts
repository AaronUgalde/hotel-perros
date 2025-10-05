import express from 'express';
import db from '../db';
import { requireAuth, AuthRequest } from '../middleware/auth';
import { body, validationResult } from 'express-validator';

const router = express.Router();

/**
 * GET /me
 * Devuelve datos del propietario únicamente
 */
router.get('/me', requireAuth, async (req: AuthRequest, res) => {
  try {
    const propietarioId = req.user!.id_propietario;

    const q = `
      SELECT
        propietario_id,
        correo_electronico,
        nombre,
        primer_apellido,
        segundo_apellido,
        rol_id
      FROM public.propietarios
      WHERE propietario_id = $1
    `;
    const r = await db.query(q, [propietarioId]);
    if (r.rowCount === 0) return res.status(404).json({ error: 'Propietario no encontrado' });

    const propietario = r.rows[0];
    res.json({ propietario });
  } catch (err) {
    console.error('GET /me error:', err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

/**
 * PUT /me
 * Actualiza solo los datos del propietario
 */
router.put(
  '/me',
  requireAuth,
  body('nombre').optional().isString(),
  body('primer_apellido').optional().isString(),
  body('segundo_apellido').optional().isString(),
  async (req: AuthRequest, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const propietarioId = req.user!.id_propietario;
    const fields = ['nombre', 'primer_apellido', 'segundo_apellido'];
    const sets: string[] = [];
    const values: any[] = [];
    let idx = 1;

    for (const f of fields) {
      if (req.body[f] !== undefined) {
        sets.push(`${f} = $${idx++}`);
        values.push(req.body[f]);
      }
    }

    if (sets.length === 0) return res.status(400).json({ error: 'Nada que actualizar' });

    values.push(propietarioId);
    const sql = `UPDATE public.propietarios SET ${sets.join(', ')} WHERE propietario_id = $${idx} RETURNING propietario_id, correo_electronico, nombre, primer_apellido, segundo_apellido, rol_id`;

    try {
      const r = await db.query(sql, values);
      if (r.rowCount === 0) return res.status(404).json({ error: 'Propietario no encontrado' });
      res.json({ propietario: r.rows[0] });
    } catch (err) {
      console.error('PUT /me error:', err);
      res.status(500).json({ error: 'Error del servidor' });
    }
  }
);

export default router;
