import express from 'express';
import db from '../db';
import { requireAuth, AuthRequest } from '../middleware/auth';
import { body, validationResult } from 'express-validator';

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

// --- Get a single address by ID ---
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
