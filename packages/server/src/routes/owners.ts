import express from 'express';
import db from '../db';
import { requireAuth, AuthRequest } from '../middleware/auth';
import { body, validationResult } from 'express-validator';
import { hashPassword } from '../utils/hash';
import { Request, Response } from 'express';

const router = express.Router();

/**
 * POST /register-complete
 * Registro completo de propietario con teléfonos y direcciones opcionales
 */
router.post('/register-complete', async (req: Request, res: Response) => {
  const { propietario, telefonos, direcciones } = req.body;
  
  // Validación básica
  if (!propietario || !telefonos || telefonos.length === 0) {
    return res.status(400).json({ 
      error: 'Debe proporcionar información del propietario y al menos un teléfono' 
    });
  }

  const client = await db.connect();
  
  try {
    await client.query('BEGIN');
    
    // 1. Crear propietario
    const pwHash = await hashPassword(propietario.password);
    const propResult = await client.query(
      `INSERT INTO propietarios 
       (correo_electronico, hash_password, nombre, primer_apellido, segundo_apellido)
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING propietario_id`,
      [
        propietario.correo_electronico, 
        pwHash, 
        propietario.nombre, 
        propietario.primer_apellido, 
        propietario.segundo_apellido || null
      ]
    );
    
    const propietarioId = propResult.rows[0].propietario_id;
    
    // 2. Insertar teléfonos
    for (const tel of telefonos) {
      await client.query(
        `INSERT INTO telefonos_propietarios 
         (propietario_id, numero, tipo_telefono_id, nombre_contacto, relacion_contacto, es_principal, notas)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          propietarioId, 
          tel.numero, 
          tel.tipo_telefono_id, 
          tel.nombre_contacto, 
          tel.relacion_contacto, 
          tel.es_principal, 
          tel.notas || null
        ]
      );
    }
    
    // 3. Insertar direcciones (si existen)
    if (direcciones && direcciones.length > 0) {
      for (const dir of direcciones) {
        await client.query(
          `INSERT INTO direcciones_propietarios 
           (propietario_id, tipo_domicilio_id, calle, num_exterior, num_interior, 
            codigo_postal, colonia_id, estado_id, municipio_id, fecha_inicio, 
            fecha_fin, es_predeterminada, notas)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
          [
            propietarioId, 
            dir.tipo_domicilio_id, 
            dir.calle, 
            dir.num_exterior, 
            dir.num_interior || null, 
            dir.codigo_postal, 
            dir.colonia_id, 
            dir.estado_id, 
            dir.municipio_id, 
            dir.fecha_inicio, 
            dir.fecha_fin || null, 
            dir.es_predeterminada, 
            dir.notas || null
          ]
        );
      }
    }
    
    await client.query('COMMIT');
    
    res.status(201).json({ 
      success: true, 
      propietario_id: propietarioId,
      message: 'Propietario registrado exitosamente'
    });
    
  } catch (err: any) {
    await client.query('ROLLBACK');
    console.error('Error en registro completo:', err);
    
    // Error de correo duplicado
    if (err?.code === '23505') {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
    }
    
    res.status(500).json({ error: 'Error al registrar propietario' });
  } finally {
    client.release();
  }
});

/**
 * GET /me
 * Devuelve datos del propietario únicamente
 */
router.get('/me', requireAuth, async (req: AuthRequest, res) => {
  try {
    const propietarioId = req.user!.propietario_id;

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

    const propietarioId = req.user!.propietario_id;
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
    const sql = `UPDATE public.propietarios SET ${sets.join(', ')} WHERE propietario_id = ${idx} RETURNING propietario_id, correo_electronico, nombre, primer_apellido, segundo_apellido, rol_id`;

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
