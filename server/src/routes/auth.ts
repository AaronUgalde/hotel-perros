// src/routes/auth.ts
import express from 'express';
import db from '../db';
import { hashPassword, comparePassword } from '../utils/hash';
import { requireAuth, AuthRequest } from '../middleware/auth';
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
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

// Helper: calcula maxAge (ms) si expiresInValue es número (segundos)
function getCookieMaxAgeMs(remember?: boolean) {
  // Si quieres que "remember" controle duración, puedes personalizar:
  // Ej: si remember=true -> 30 días, si false -> sesión (no set maxAge => cookie de sesión).
  if (remember) return 30 * 24 * 60 * 60 * 1000; // 30 días
  // Si no remember, devuelve undefined -> cookie de sesión (se borra al cerrar navegador)
  return undefined;
}

/**
 * Register owner (opcional: también setea cookie)}
 */
router.post(
  '/register',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('telefonoPrincipal').isNumeric(),
    // Puedes agregar validaciones para tipo_domicilio, calle, colonia, etc.
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const {
      email,
      password,
      nombre,
      apellido_paterno,
      apellido_materno,
      tipo_domicilio,
      calle,
      colonia,
      ciudad,
      estado,
      codigo_postal,
      numero_exterior,
      numero_interior,
      telefonoPrincipal,
      telefonosEmergencia, // se espera un arreglo de teléfonos
      remember,
    } = req.body;

    try {
      // Iniciar transacción
      await db.query('BEGIN');

      const pwHash = await hashPassword(password);
      const insertOwnerQuery = `
        INSERT INTO owners (
          email, password_hash, nombre, apellido_paterno, apellido_materno,
          tipo_domicilio, calle, colonia, ciudad, estado, codigo_postal,
          numero_exterior, numero_interior
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
        RETURNING owner_id, email, nombre, apellido_paterno, apellido_materno, role;
      `;
      const ownerResult = await db.query(insertOwnerQuery, [
        email,
        pwHash,
        nombre,
        apellido_paterno,
        apellido_materno,
        tipo_domicilio,
        calle,
        colonia,
        ciudad,
        estado,
        codigo_postal,
        numero_exterior,
        numero_interior,
      ]);
      const owner = ownerResult.rows[0];

      // Insertar teléfono principal
      const insertMainPhoneQuery = `
        INSERT INTO owner_phones (owner_id, numero, es_principal)
        VALUES ($1, $2, true)
      `;
      await db.query(insertMainPhoneQuery, [owner.owner_id, telefonoPrincipal]);

      // Si vienen teléfonos de emergencia, se insertan (se ignoran valores vacíos)
      if (Array.isArray(telefonosEmergencia)) {
        const insertEmergencyPhoneQuery = `
          INSERT INTO owner_phones (owner_id, numero, es_principal)
          VALUES ($1, $2, false)
        `;
        for (const phone of telefonosEmergencia) {
          if (phone) {
            await db.query(insertEmergencyPhoneQuery, [owner.owner_id, phone]);
          }
        }
      }

      // Generar token y setear cookie
      const payload = { owner_id: owner.owner_id, role: owner.role };
      const token = jwt.sign(payload, getJwtSecret(), signOptions);
      const maxAge = getCookieMaxAgeMs(remember);
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        ...(maxAge ? { maxAge } : {}),
      });

      // Confirmar transacción
      await db.query('COMMIT');
      res.status(201).json({ owner });
    } catch (err: any) {
      // Revertir en caso de error
      await db.query('ROLLBACK');
      if (err?.code === '23505')
        return res.status(400).json({ error: 'Email ya registrado' });
      console.error(err);
      res.status(500).json({ error: 'Error del servidor' });
    }
  }
);

/**
 * Login -> set cookie httpOnly (no devolvemos token en body)
 */
router.post(
  '/login',
  body('email').isEmail(),
  body('password').isLength({ min: 1 }),
  async (req: Request, res: Response) => {
    const { email, password, remember } = req.body;
    try {
      const q = 'SELECT owner_id, email, password_hash, nombre, role FROM owners WHERE email = $1';
      const r = await db.query(q, [email]);
      if (r.rowCount === 0) return res.status(400).json({ error: 'Credenciales inválidas' });

      const user = r.rows[0];
      const ok = await comparePassword(password, user.password_hash);
      if (!ok) return res.status(400).json({ error: 'Credenciales inválidas' });

      const payload = { owner_id: user.owner_id, role: user.role };
      const token = jwt.sign(payload, getJwtSecret(), signOptions);

      const maxAge = getCookieMaxAgeMs(remember);

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        ...(maxAge ? { maxAge } : {}),
      });

      // Devolver solo datos públicos del owner para que frontend pueda mostrar nombre, etc.
      res.json({ owner: { owner_id: user.owner_id, email: user.email, nombre: user.nombre, role: user.role } });
    } catch (err) {
      console.error(err);
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
 * /me -> devuelve info del usuario logueado basado en la cookie
 */
router.get('/me', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const ownerId = req.user?.owner_id;
    if (!ownerId) return res.status(401).json({ error: 'No autenticado' });

    const q = 'SELECT owner_id, email, nombre, role FROM owners WHERE owner_id = $1';
    const r = await db.query(q, [ownerId]);
    if (r.rowCount === 0) return res.status(404).json({ error: 'Usuario no encontrado' });

    console.log(r.rows[0]);
    res.json({ owner: r.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

export default router;
