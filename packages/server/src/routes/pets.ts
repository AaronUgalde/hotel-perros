import express, { Request, Response } from 'express';
import db from '../db';
import { requireAuth } from '../middlewares/auth.middleware';
import { body, param, validationResult } from 'express-validator';

interface AuthRequest extends Request {
  user?: { propietario_id: number; rol_id: number };
}

const router = express.Router();

// --- List pets for owner ---
router.get('/', requireAuth, async (req: AuthRequest, res) => {
  try {
    const r = await db.query('SELECT * FROM mascotas WHERE propietario_id = $1 ORDER BY nombre', [req.user!.propietario_id]);
    res.json(r.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

router.get('/sexos', async (req: Request, res: Response) => { // <-- Request normal
  try {
    const q = `SELECT * FROM sexos`;
    const r = await db.query(q);

    res.json({ sexos: r.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

router.get('/patron_pelo', async (req: Request, res: Response) => { // <-- Request normal
  try {
    const q = `SELECT * FROM patron_pelo`;
    const r = await db.query(q);

    res.json({ patron_pelo: r.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

router.get('/origen_mascota', async (req: Request, res: Response) => { // <-- Request normal
  try {
    const q = `SELECT * FROM origen_mascota`;
    const r = await db.query(q);

    res.json({ origen_mascota: r.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

router.get('/funcion_mascota', async (req: Request, res: Response) => { // <-- Request normal
  try {
    const q = `SELECT * FROM funcion_mascota`;
    const r = await db.query(q);

    res.json({ funcion_mascota: r.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

router.get('/colores', async (req: Request, res: Response) => { // <-- Request normal
  try {
    const q = `SELECT * FROM colores`;
    const r = await db.query(q);

    res.json({ colores: r.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});


router.get('/especies', async (req: Request, res: Response) => { // <-- Request normal
  try {
    const q = `SELECT * FROM especies`;
    const r = await db.query(q);

    res.json({ especies: r.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

router.get('/razas/:id_especie', param('id_especie').isString().isLength({ min: 1, max: 10 }), async (req: Request, res: Response) => { // <-- Request normal
  try {
    const id_especie: string = req.params.id_especie;
    const q = `SELECT * FROM razas WHERE especie_id = $1`;
    const r = await db.query(q, [id_especie]);

    res.json({ razas: r.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});



// --- Get pet by id ---
router.get('/:mascotaId', requireAuth, async (req: AuthRequest, res) => {
  try {
    const r = await db.query(
      'SELECT * FROM mascotas WHERE mascota_id = $1 AND propietario_id = $2',
      [req.params.mascotaId, req.user!.propietario_id]
    );
    if (r.rowCount === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json(r.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// --- Create pet ---
router.post(
  '/',
  requireAuth,
  body('nombre').isString(),
  body('especie_id').isInt(),
  body('raza_id').optional().isInt(),
  body('sexo_id').optional().isInt(),
  body('fecha_nacimiento').optional().isISO8601(),
  body('peso_kg').optional().isNumeric(),
  body('altura_cm').optional().isNumeric(),
  body('largo_cm').optional().isNumeric(),
  body('patron_pelo_id').optional().isInt(),
  body('color_principal_id').optional().isInt(),
  body('color_ojos_id').optional().isInt(),
  body('numero_chip').optional().isString(),
  body('ruac').optional().isString(),
  body('esterilizado').optional().isBoolean(),
  body('senas_particulares').optional().isString(),
  body('origen_id').optional().isInt(),
  body('funcion_id').optional().isInt(),
  body('mestizo').optional().isBoolean(),
  body('url_database_chip').optional().isString(),
  body('frecuency_chip').optional().isNumeric(),
  async (req: AuthRequest, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const {
      nombre, especie_id, raza_id, sexo_id, fecha_nacimiento, peso_kg,
      altura_cm, largo_cm, patron_pelo_id, color_principal_id, color_ojos_id,
      numero_chip, ruac, esterilizado, senas_particulares, origen_id,
      funcion_id, mestizo, url_database_chip, frecuency_chip
    } = req.body;

    try {
      const q = `
        INSERT INTO mascotas (
          propietario_id, nombre, especie_id, raza_id, sexo_id, fecha_nacimiento,
          peso_kg, altura_cm, largo_cm, patron_pelo_id, color_principal_id, color_ojos_id,
          numero_chip, ruac, esterilizado, senas_particulares, origen_id, funcion_id,
          mestizo, url_database_chip, frecuency_chip, fecha_alta
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21, CURRENT_TIMESTAMP)
        RETURNING *
      `;
      const r = await db.query(q, [
        req.user!.propietario_id, nombre, especie_id, raza_id || null, sexo_id || null,
        fecha_nacimiento || null, peso_kg || null, altura_cm || null, largo_cm || null,
        patron_pelo_id || null, color_principal_id || null, color_ojos_id || null,
        numero_chip || null, ruac || null, esterilizado ?? null, senas_particulares || null,
        origen_id || null, funcion_id || null, mestizo ?? null, url_database_chip || null,
        frecuency_chip || null
      ]);
      res.status(201).json(r.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error del servidor' });
    }
  }
);

// --- Update pet ---
router.put('/:mascotaId', requireAuth, async (req: AuthRequest, res) => {
  const updatable = [
    'nombre','especie_id','raza_id','sexo_id','fecha_nacimiento','peso_kg',
    'altura_cm','largo_cm','patron_pelo_id','color_principal_id','color_ojos_id',
    'numero_chip','ruac','esterilizado','senas_particulares','origen_id',
    'funcion_id','mestizo','url_database_chip','frecuency_chip'
  ];
  const sets: string[] = [];
  const values: any[] = [];
  let idx = 1;
  for (const f of updatable) {
    if (req.body[f] !== undefined) {
      sets.push(`${f} = $${idx++}`);
      values.push(req.body[f]);
    }
  }
  if (sets.length === 0) return res.status(400).json({ error: 'Nada que actualizar' });

  values.push(req.params.mascotaId, req.user!.propietario_id);
  const sql = `UPDATE mascotas SET ${sets.join(', ')} WHERE mascota_id = ${idx++} AND propietario_id = ${idx} RETURNING *`;

  try {
    const r = await db.query(sql, values);
    if (r.rowCount === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json(r.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// --- Delete pet ---
router.delete('/:mascotaId', requireAuth, async (req: AuthRequest, res) => {
  try {
    const r = await db.query('DELETE FROM mascotas WHERE mascota_id = $1 AND propietario_id = $2 RETURNING *', [req.params.mascotaId, req.user!.propietario_id]);
    if (r.rowCount === 0) return res.status(404).json({ error: 'No encontrado' });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

export default router;
