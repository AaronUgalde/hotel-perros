import express from 'express';
import db from '../db';
import { requireAuth, AuthRequest } from '../middleware/auth';
import { body, validationResult } from 'express-validator';
import { Request, Response } from 'express';

const router = express.Router();

/**
 * GET /tipos
 * Obtener catálogo de tipos de teléfono
 */
router.get('/tipos', async (req: Request, res: Response) => {
  try {
    const q = `SELECT tipo_telefono_id as id, nombre FROM tipos_telefono ORDER BY nombre`;
    const r = await db.query(q);
    res.json(r.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

router.get('/tipos_telefono', async (req: Request, res: Response) => {
  try {
    const q = `SELECT * FROM tipos_telefono`;
    const r = await db.query(q);
    res.json({ tipos_telefono: r.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

/**
 * Listar teléfonos del propietario autenticado
 * GET /
 */
router.get('/', requireAuth, async (req: AuthRequest, res) => {
  try {
    const r = await db.query(
      `SELECT telefono_id, numero, tipo_telefono_id, nombre_contacto, relacion_contacto, es_principal, notas
       FROM public.telefonos_propietarios
       WHERE propietario_id = $1
       ORDER BY es_principal DESC, telefono_id`,
      [req.user!.propietario_id]
    );
    res.json(r.rows);
  } catch (err) {
    console.error('List phones error:', err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

/**
 * Agregar teléfono
 * POST /
 */
router.post(
  '/',
  requireAuth,
  body('numero').isString().notEmpty(),
  body('tipo_telefono_id').optional().isInt(),
  body('nombre_contacto').optional().isString(),
  body('relacion_contacto').optional().isString(),
  body('es_principal').optional().isBoolean(),
  body('notas').optional().isString(),
  async (req: AuthRequest, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const propietarioId = req.user!.propietario_id;
    const { numero, tipo_telefono_id, nombre_contacto, relacion_contacto, es_principal, notas } = req.body;

    try {
      // Si este teléfono será el principal, desmarcar los demás primero
      if (es_principal) {
        await db.query(
          `UPDATE public.telefonos_propietarios SET es_principal = false WHERE propietario_id = $1 AND es_principal = true`,
          [propietarioId]
        );
      }

      const r = await db.query(
        `INSERT INTO public.telefonos_propietarios
          (propietario_id, numero, tipo_telefono_id, nombre_contacto, relacion_contacto, es_principal, notas)
         VALUES ($1,$2,$3,$4,$5,$6,$7)
         RETURNING telefono_id, propietario_id, numero, tipo_telefono_id, nombre_contacto, relacion_contacto, es_principal, notas`,
        [
          propietarioId,
          numero,
          tipo_telefono_id ?? null,
          nombre_contacto ?? null,
          relacion_contacto ?? null,
          !!es_principal,
          notas ?? null,
        ]
      );

      res.status(201).json(r.rows[0]);
    } catch (err) {
      console.error('Add phone error:', err);
      res.status(500).json({ error: 'Error del servidor' });
    }
  }
);

/**
 * Eliminar teléfono
 * DELETE /:phoneId
 */
router.delete('/:phoneId', requireAuth, async (req: AuthRequest, res) => {
  try {
    const propietarioId = req.user!.propietario_id;
    const phoneId = Number(req.params.phoneId);

    const r = await db.query(
      `DELETE FROM public.telefonos_propietarios
       WHERE telefono_id = $1 AND propietario_id = $2
       RETURNING telefono_id`,
      [phoneId, propietarioId]
    );

    if (r.rowCount === 0) return res.status(404).json({ error: 'No encontrado o no autorizado' });

    res.json({ success: true });
  } catch (err) {
    console.error('Delete phone error:', err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

export default router;
