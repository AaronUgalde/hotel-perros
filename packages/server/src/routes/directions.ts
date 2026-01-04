import express, { Request, Response } from 'express';
import db from '../db';
import { requireAuth } from '../middlewares/auth.middleware';
import { body, validationResult, param } from 'express-validator';

interface AuthRequest extends Request {
  user?: { propietario_id: number; rol_id: number };
}

const router = express.Router();

/**
 * GET /tipos
 * Obtener catálogo de tipos de domicilio
 */
router.get('/tipos', async (req: Request, res: Response) => {
  try {
    const q = `SELECT tipo_domicilio_id as id, nombre FROM tipos_domicilio ORDER BY nombre`;
    const r = await db.query(q);
    res.json(r.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

/**
 * GET /estados
 * Obtener catálogo de estados
 */
router.get('/estados', async (req: Request, res: Response) => {
  try {
    const q = `SELECT estado_id as id, nombre FROM estados ORDER BY nombre`;
    const r = await db.query(q);
    res.json(r.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

/**
 * GET /municipios/:estadoId
 * Obtener catálogo de municipios por estado
 */
router.get('/municipios/:estadoId', async (req: Request, res: Response) => {
  try {
    const { estadoId } = req.params;
    const q = `SELECT municipio_id as id, nombre FROM municipios WHERE estado_id = $1 ORDER BY nombre`;
    const r = await db.query(q, [estadoId]);
    res.json(r.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

/**
 * GET /colonias/:municipioId/:cp
 * Obtener catálogo de colonias por municipio y código postal
 */
router.get('/colonias/:municipioId/:cp', async (req: Request, res: Response) => {
  try {
    const { municipioId, cp } = req.params;
    const q = `SELECT colonia_id as id, nombre FROM colonias 
               WHERE municipio_id = $1 AND codigo_postal = $2 
               ORDER BY nombre`;
    const r = await db.query(q, [municipioId, cp]);
    res.json(r.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

/**
 * GET /codigo-postal/:cp
 * Buscar información por código postal
 * Devuelve colonias, municipio y estado
 */
router.get(
  '/codigo-postal/:cp',
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    console.log("Buscando codigo postal, codigo: ", req.params.cp)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const cp: string = req.params.cp;

    try {
      // Buscar colonias con ese código postal
      const coloniasQ = `
        SELECT
          c.colonia_id,
          c.nombre AS colonia_nombre,
          c.codigo_postal,
          m.municipio_id,
          m.nombre AS municipio_nombre,
          e.estado_id,
          e.nombre AS estado_nombre
        FROM colonias c
        JOIN municipios m ON c.municipio_id = m.municipio_id
        JOIN estados e ON m.estado_id = e.estado_id
        WHERE c.codigo_postal = $1
        ORDER BY c.nombre
      `;
      const coloniasR = await db.query(coloniasQ, [cp]);

      if (coloniasR.rows.length === 0) {
        return res.status(404).json({ error: 'Código postal no encontrado' });
      }

      // Tomar el primer registro para obtener municipio y estado
      const primerRegistro = coloniasR.rows[0];

      const colonias = coloniasR.rows.map((r) => ({
        id: r.colonia_id,
        nombre: r.colonia_nombre,
      }));

      res.json({
        colonias,
        municipio: primerRegistro.municipio_nombre,
        municipio_id: primerRegistro.municipio_id,
        estado: primerRegistro.estado_nombre,
        estado_id: primerRegistro.estado_id,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error del servidor' });
    }
  }
);

router.get('/tipos-domicilio', async (req: Request, res: Response) => {
  try {
    const q = `SELECT * FROM tipos_domicilio`;
    const r = await db.query(q);
    res.json({ tipos_domicilio: r.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// --- List all addresses of the owner ---
router.get('/', requireAuth, async (req: AuthRequest, res) => {
  try {
    const r = await db.query(
      `SELECT * FROM direcciones_propietarios WHERE propietario_id = $1 ORDER BY fecha_inicio DESC`,
      [req.user!.propietario_id]
    );
    res.json(r.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

router.get('/:direccionId', requireAuth, async (req: AuthRequest, res) => {
  try {
    const r = await db.query(
      `SELECT * FROM direcciones_propietarios WHERE direccion_id = $1 AND propietario_id = $2`,
      [req.params.direccionId, req.user!.propietario_id]
    );
    if (r.rowCount === 0) return res.status(404).json({ error: 'No encontrada' });
    res.json(r.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// --- Create a new address ---
router.post(
  '/',
  requireAuth,
  body('tipo_domicilio_id').isInt(),
  body('calle').optional().isString(),
  body('num_exterior').optional().isString(),
  body('num_interior').optional().isString(),
  body('colonia_id').optional().isInt(),
  body('estado_id').optional().isInt(),
  body('municipio_id').optional().isInt(),
  body('codigo_postal').optional().isString(),
  body('notas').optional().isString(),
  body('es_predeterminada').optional().isBoolean(),
  body('fecha_inicio').optional().isISO8601(),
  body('fecha_fin').optional().isISO8601(),
  async (req: AuthRequest, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const {
      tipo_domicilio_id, calle, num_exterior, num_interior,
      colonia_id, estado_id, municipio_id, codigo_postal,
      notas, es_predeterminada,
      fecha_inicio, fecha_fin
    } = req.body;

    try {
      // Si se marca como predeterminada, quitar predeterminada de otras direcciones
      if (es_predeterminada) {
        await db.query(
          `UPDATE direcciones_propietarios SET es_predeterminada = false WHERE propietario_id = $1`,
          [req.user!.propietario_id]
        );
      }

      const q = `
        INSERT INTO direcciones_propietarios (
          propietario_id, tipo_domicilio_id, calle, num_exterior, num_interior,
          colonia_id, estado_id, municipio_id, codigo_postal,
          notas, es_predeterminada, fecha_inicio, fecha_fin
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
        RETURNING *
      `;

      const r = await db.query(q, [
        req.user!.propietario_id, tipo_domicilio_id, calle || null, num_exterior || null, num_interior || null,
        colonia_id || null, estado_id || null, municipio_id || null, codigo_postal || null,
        notas || null, es_predeterminada || false,
        fecha_inicio || new Date(), fecha_fin || null
      ]);

      res.status(201).json(r.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error del servidor' });
    }
  }
);

// --- Update an address ---
router.put('/:direccionId', requireAuth, async (req: AuthRequest, res) => {
  const updatable = [
    'tipo_domicilio_id', 'calle', 'num_exterior', 'num_interior',
    'colonia_id', 'estado_id', 'municipio_id', 'codigo_postal',
    'notas', 'es_predeterminada', 'fecha_inicio', 'fecha_fin'
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

  // Si se marca como predeterminada, quitar predeterminada de otras direcciones
  if (req.body.es_predeterminada) {
    await db.query(
      `UPDATE direcciones_propietarios SET es_predeterminada = false WHERE propietario_id = $1`,
      [req.user!.propietario_id]
    );
  }

  values.push(req.params.direccionId, req.user!.propietario_id);
  const sql = `UPDATE direcciones_propietarios SET ${sets.join(', ')} WHERE direccion_id = $${idx++} AND propietario_id = $${idx} RETURNING *`;

  try {
    const r = await db.query(sql, values);
    if (r.rowCount === 0) return res.status(404).json({ error: 'No encontrada' });
    res.json(r.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// --- Delete an address ---
router.delete('/:direccionId', requireAuth, async (req: AuthRequest, res) => {
  try {
    const r = await db.query(
      `DELETE FROM direcciones_propietarios WHERE direccion_id = $1 AND propietario_id = $2 RETURNING *`,
      [req.params.direccionId, req.user!.propietario_id]
    );
    if (r.rowCount === 0) return res.status(404).json({ error: 'No encontrada' });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

export default router;
