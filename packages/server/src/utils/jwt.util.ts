// src/utils/jwt.util.ts
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt';

export interface JwtPayload {
  propietario_id: number;
  rol_id: number;
  rol_nombre?: string;
}

/**
 * Generar JWT token
 */
export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, jwtConfig.secret, jwtConfig.signOptions);
}

/**
 * Verificar y decodificar JWT token
 */
export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, jwtConfig.secret) as JwtPayload;
}
