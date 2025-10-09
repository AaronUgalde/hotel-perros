import express from 'express';
import db from '../db';
import { requireAuth, AuthRequest } from '../middleware/auth';
import { body, validationResult, param } from 'express-validator';
import { Request, Response } from 'express';

const router = express.Router();

// --- List all addresses of the owner ---
router.get('/', requireAuth, async (req: AuthRequest, res) => {
    try {
        const r = await db.query(
            `SELECT * FROM direcciones_propietarios WHERE propietario_id = $1 ORDER BY fecha_inicio DESC`,
            [req.user!.id_propietario]
        );
        res.json(r.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
});


router.get('/tipos-domicilio', async (req: Request, res: Response) => { // <-- Request normal
  try {
    const q = `SELECT * FROM tipos_domicilio`;
    const r = await db.query(q);

    res.json({ tipos_domicilio: r.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

/**
 * GET /codigo-postal/:cp
 * Devuelve:
 *  - colonias que tienen ese codigo postal (con municipio + estado)
 *  - listas únicas de municipios y estados encontradas
 */
router.get(
    '/codigo-postal/:cp',
    param('cp').isString().isLength({ min: 1, max: 10 }),
    async (req: AuthRequest, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const cp: string = req.params.cp;

        try {
            // 1) Colonias que tienen ese código postal (y el nombre del municipio / estado)
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

            // 2) Direcciones de propietarios que tienen ese codigo_postal (con datos básicos del propietario
            //    y nombres de colonia/municipio/estado si existen)


            // 3) Construir listas únicas de municipios y estados (viniendo de colonias y de direcciones)
            const municipiosMap = new Map<number, { municipio_id: number; nombre: string; estado_id?: number }>();
            const estadosMap = new Map<number, { estado_id: number; nombre: string }>();

            // Desde colonias
            for (const r of coloniasR.rows) {
                if (r.municipio_id && !municipiosMap.has(r.municipio_id)) {
                    municipiosMap.set(r.municipio_id, { municipio_id: r.municipio_id, nombre: r.municipio_nombre, estado_id: r.estado_id });
                }
                if (r.estado_id && !estadosMap.has(r.estado_id)) {
                    estadosMap.set(r.estado_id, { estado_id: r.estado_id, nombre: r.estado_nombre });
                }
            }



            const colonias = coloniasR.rows.map((r) => ({
                colonia_id: r.colonia_id,
                nombre: r.colonia_nombre,
            }));
            const municipio = Array.from(municipiosMap.values()).map((m) => ({
                municipio_id: m.municipio_id,
                nombre: m.nombre,
            }))[0];
            const estado = Array.from(estadosMap.values())[0];

            res.json({
                codigo_postal: cp,
                colonias,
                municipio,
                estado,
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error del servidor' });
        }
    }
);

router.get('/:direccionId', requireAuth, async (req: AuthRequest, res) => {
    try {
        const r = await db.query(
            `SELECT * FROM direcciones_propietarios WHERE direccion_id = $1 AND propietario_id = $2`,
            [req.params.direccionId, req.user!.id_propietario]
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
                    [req.user!.id_propietario]
                );
            }

            const q = `
        INSERT INTO direcciones_propietarios (
          propietario_id, tipo_domicilio_id, calle, num_exterior, num_interior,
          colonia_id, estado_id, municipio_id, codigo_postal,
            notas, es_predeterminada, fecha_inicio, fecha_fin
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
        RETURNING *
      `;

            const r = await db.query(q, [
                req.user!.id_propietario, tipo_domicilio_id, calle || null, num_exterior || null, num_interior || null,
                colonia_id || null, estado_id || null, municipio_id || null, codigo_postal || null,
                , notas || null, es_predeterminada || false,
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
            [req.user!.id_propietario]
        );
    }

    values.push(req.params.direccionId, req.user!.id_propietario);
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
            [req.params.direccionId, req.user!.id_propietario]
        );
        if (r.rowCount === 0) return res.status(404).json({ error: 'No encontrada' });
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

export default router;
