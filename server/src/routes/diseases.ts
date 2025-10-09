import express from 'express';
import db from '../db';
import { requireAuth, AuthRequest } from '../middleware/auth';
import { body, param, validationResult } from 'express-validator';
import { Request, Response } from 'express';


const router = express.Router();

// --- List all diseases (catalog) ---
router.get('/catalog', requireAuth, async (_req: AuthRequest, res) => {
  try {
    const r = await db.query('SELECT enfermedad_id, nombre, descripcion, especie_id FROM enfermedades ORDER BY nombre');
    res.json(r.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

router.get('/enfermedades/:id_especie', param('id_especie').isString().isLength({ min: 1, max: 10 }), async (req: Request, res: Response) => { // <-- Request normal
  try {
    const id_especie: string = req.params.id_especie;
    const q = `SELECT * FROM enfermedades WHERE especie_id = $1`;
    const r = await db.query(q, [id_especie]);

    res.json({ enfermedades: r.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});


// --- List diseases of a pet ---
router.get('/:mascotaId', requireAuth, async (req: AuthRequest, res) => {
  try {
    const mascotaId = req.params.mascotaId;

    // verificar que la mascota pertenece al propietario
    const checkPet = await db.query('SELECT mascota_id FROM mascotas WHERE mascota_id = $1 AND propietario_id = $2', [mascotaId, req.user!.id_propietario]);
    if (checkPet.rowCount === 0) return res.status(404).json({ error: 'Mascota no encontrada' });

    const r = await db.query(
      `SELECT em.enfermedad_mascota_id, em.mascota_id, em.enfermedad_id, em.fecha_diagnostico, em.observaciones, em.tratamiento,
              e.nombre, e.descripcion, e.especie_id
       FROM enfermedad_mascota em
       JOIN enfermedades e ON em.enfermedad_id = e.enfermedad_id
       WHERE em.mascota_id = $1
       ORDER BY em.fecha_diagnostico DESC`,
      [mascotaId]
    );
    res.json(r.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// --- Add disease to a pet ---
router.post('/:mascotaId',
  requireAuth,
  body('enfermedad_id').isInt(),
  body('fecha_diagnostico').optional().isISO8601(),
  body('observaciones').optional().isString(),
  body('tratamiento').optional().isString(),
  async (req: AuthRequest, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const mascotaId = req.params.mascotaId;
    const { enfermedad_id, fecha_diagnostico, observaciones, tratamiento } = req.body;

    try {
      const checkPet = await db.query('SELECT mascota_id FROM mascotas WHERE mascota_id = $1 AND propietario_id = $2', [mascotaId, req.user!.id_propietario]);
      if (checkPet.rowCount === 0) return res.status(404).json({ error: 'Mascota no encontrada' });

      const r = await db.query(
        `INSERT INTO enfermedad_mascota (mascota_id, enfermedad_id, fecha_diagnostico, observaciones, tratamiento)
         VALUES ($1,$2,$3,$4,$5) RETURNING *`,
        [mascotaId, enfermedad_id, fecha_diagnostico || null, observaciones || null, tratamiento || null]
      );
      res.status(201).json(r.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error del servidor' });
    }
  }
);

// --- Update disease of a pet ---
router.put('/:mascotaId/:enfermedadMascotaId',
  requireAuth,
  body('fecha_diagnostico').optional().isISO8601(),
  body('observaciones').optional().isString(),
  body('tratamiento').optional().isString(),
  async (req: AuthRequest, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { mascotaId, enfermedadMascotaId } = req.params;
    const fields = ['fecha_diagnostico','observaciones','tratamiento'];
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

    values.push(enfermedadMascotaId, mascotaId);
    const sql = `UPDATE enfermedad_mascota SET ${sets.join(', ')} WHERE enfermedad_mascota_id = $${idx++} AND mascota_id = $${idx} RETURNING *`;

    try {
      const r = await db.query(sql, values);
      if (r.rowCount === 0) return res.status(404).json({ error: 'Registro no encontrado' });
      res.json(r.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error del servidor' });
    }
  }
);

// --- Delete disease from a pet ---
router.delete('/:mascotaId/:enfermedadMascotaId', requireAuth, async (req: AuthRequest, res) => {
  const { mascotaId, enfermedadMascotaId } = req.params;
  try {
    const checkPet = await db.query('SELECT mascota_id FROM mascotas WHERE mascota_id = $1 AND propietario_id = $2', [mascotaId, req.user!.id_propietario]);
    if (checkPet.rowCount === 0) return res.status(404).json({ error: 'Mascota no encontrada' });

    const r = await db.query('DELETE FROM enfermedad_mascota WHERE enfermedad_mascota_id = $1 AND mascota_id = $2 RETURNING *', [enfermedadMascotaId, mascotaId]);
    if (r.rowCount === 0) return res.status(404).json({ error: 'Registro no encontrado' });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

export default router;
