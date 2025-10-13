import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

/**
 * El payload del JWT se basará en la estructura real:
 * {
 *   propietario_id: number,
 *   rol_id: number,
 *   rol_nombre?: string
 * }
 */
export interface AuthRequest extends Request {
  user?: { propietario_id: number; rol_id: number; rol_nombre?: string };
}

/**
 * Middleware que valida que el usuario esté autenticado
 */
export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({ error: 'No estas autorizado' });
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT_SECRET no definido en .env');

    // Verificamos y obtenemos el payload
    const payload = jwt.verify(token, secret) as {
      propietario_id: number;
      rol_id: number;
      rol_nombre?: string;
    };

    // Guardamos los datos del usuario en la request
    req.user = {
      propietario_id: payload.propietario_id,
      rol_id: payload.rol_id,
      rol_nombre: payload.rol_nombre,
    };

    next();
  } catch (err) {
    console.error('Error verificando JWT:', err);
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
}

/**
 * Middleware que valida si el usuario es administrador
 */
export function requireAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  if (!req.user) return res.status(401).json({ error: 'No autenticado' });

  // Puedes verificar por ID o por nombre del rol, según cómo generes el token
  if (req.user.rol_nombre && req.user.rol_nombre.toLowerCase() === 'admin') {
    return next();
  }

  // Alternativamente, si sólo usas rol_id:
  // if (req.user.rol_id === 1) return next();

  return res.status(403).json({ error: 'Solo administradores' });
}
