// src/routes/auth.ts
import express from 'express';
import db from '../db';
import { hashPassword, comparePassword } from '../utils/hash';
import { requireAuth, AuthRequest } from '../middleware/auth';
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { body, validationResult } from 'express-validator';
import { Request, Response } from 'express';
dotenv.config();

const router = express.Router();

function getJwtSecret(): jwt.Secret {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET no definido en .env');
  return secret as jwt.Secret;
}

const rawExpires = process.env.JWT_EXPIRES_IN;
let expiresInValue: jwt.SignOptions['expiresIn'];
if (!rawExpires) {
  expiresInValue = '7d';
} else {
  const maybeNum = Number(rawExpires);
  if (Number.isFinite(maybeNum)) {
    expiresInValue = maybeNum;
  } else {
    expiresInValue = rawExpires as unknown as jwt.SignOptions['expiresIn'];
  }
}
const signOptions: jwt.SignOptions = { expiresIn: expiresInValue };

function getCookieMaxAgeMs(remember?: boolean) {
  if (remember) return 30 * 24 * 60 * 60 * 1000; // 30 días
  return undefined;
}

/**
 * Register (propietario) — adapta a tablas: propietarios, telefonos_propietarios, direcciones_propietarios (opcional)
 */

router.post(
  '/register',
  [
    body('password').isLength({ min: 6 }),
    body('email').isEmail(),
    body('nombre').optional().isString(),
    body('primer_apellido').optional().isString(),
    body('segundo_apellido').optional().isString(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { email, password, nombre, primer_apellido, segundo_apellido, remember } = req.body;

    const correo = email.trim().toLowerCase();

    try {
      // Crear hash de la contraseña
      const pwHash = await hashPassword(password);

      // Insertar propietario
      const insertPropietarioQ = `
        INSERT INTO public.propietarios
          (correo_electronico, hash_password, nombre, primer_apellido, segundo_apellido)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING propietario_id, correo_electronico, nombre, primer_apellido, segundo_apellido, rol_id;
      `;
      const propietarioRes = await db.query(insertPropietarioQ, [
        correo,
        pwHash,
        nombre || null,
        primer_apellido || null,
        segundo_apellido || null,
      ]);

      const propietario = propietarioRes.rows[0];

      // Generar token JWT
      const payload = { propietario_id: propietario.propietario_id, rol_id: propietario.rol_id };
      const token = jwt.sign(payload, getJwtSecret(), signOptions);
      const maxAge = getCookieMaxAgeMs(Boolean(remember));

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        ...(maxAge ? { maxAge } : {}),
      });

      res.status(201).json({
        propietario: {
          propietario_id: propietario.propietario_id,
          correo_electronico: propietario.correo_electronico,
          nombre: propietario.nombre,
          primer_apellido: propietario.primer_apellido,
          segundo_apellido: propietario.segundo_apellido,
          rol_id: propietario.rol_id,
        },
      });
    } catch (err: any) {
      if (err?.code === '23505') {
        return res.status(400).json({ error: 'Correo electrónico ya registrado' });
      }
      console.error('Register error:', err);
      res.status(500).json({ error: 'Error del servidor' });
    }
  }
);

/**
 * Login -> set cookie httpOnly (consulta en propietarios)
 */
router.post(
  '/login',
  [
    // validaciones simples
    body('password').isLength({ min: 1 }),
  ],
  async (req: Request, res: Response) => {
    try {
      // Permitimos tanto "email" como "correo_electronico" en el body
      const { email, correo_electronico, password, remember } = req.body as any;
      const correo = (email || correo_electronico || '').toString().trim().toLowerCase();
      if (!correo || !password) return res.status(400).json({ error: 'Credenciales inválidas' });

      const q = `
        SELECT propietario_id, correo_electronico, hash_password, nombre, primer_apellido, segundo_apellido, rol_id
        FROM public.propietarios
        WHERE correo_electronico = $1
      `;
      const r = await db.query(q, [correo]);
      if (r.rowCount === 0) return res.status(400).json({ error: 'Credenciales inválidas' });

      const user = r.rows[0];
      const ok = await comparePassword(password, user.hash_password);
      if (!ok) return res.status(400).json({ error: 'Credenciales inválidas' });

      const payload = { propietario_id: user.propietario_id, rol_id: user.rol_id };
      const token = jwt.sign(payload, getJwtSecret(), signOptions);
      const maxAge = getCookieMaxAgeMs(Boolean(remember));

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        ...(maxAge ? { maxAge } : {}),
      });

      res.json({
        propietario: {
          propietario_id: user.propietario_id,
          correo_electronico: user.correo_electronico,
          nombre: user.nombre,
          primer_apellido: user.primer_apellido,
          segundo_apellido: user.segundo_apellido,
          rol_id: user.rol_id,
        },
      });
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ error: 'Error del servidor' });
    }
  }
);

/**
 * Logout -> limpia cookie
 */
router.post('/logout', (req: Request, res: Response) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
  res.json({ ok: true });
});

/**
 * /me -> devuelve info del propietario logueado (requireAuth debe exponer req.user.propietario_id)
 */
router.get('/me', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const propietarioId = req.user?.propietario_id;
    if (!propietarioId) return res.status(401).json({ error: 'No autenticado' });

    const q = `
      SELECT propietario_id, correo_electronico, nombre, primer_apellido, segundo_apellido, rol_id
      FROM public.propietarios
      WHERE propietario_id = $1
    `;
    const r = await db.query(q, [propietarioId]);
    if (r.rowCount === 0) return res.status(404).json({ error: 'Usuario no encontrado' });

    res.json({ propietario: r.rows[0] });
  } catch (err) {
    console.error('GET /me error:', err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

export default router;
