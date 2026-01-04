// src/utils/cookie.util.ts
import { Response } from 'express';
import { jwtConfig, getCookieMaxAge } from '../config/jwt';

/**
 * Establecer cookie con token JWT
 */
export function setAuthCookie(
  res: Response,
  token: string,
  remember?: boolean
): void {
  const maxAge = getCookieMaxAge(remember);
  
  res.cookie('token', token, {
    ...jwtConfig.cookieOptions,
    ...(maxAge ? { maxAge } : {}),
  });
}

/**
 * Limpiar cookie de autenticación
 */
export function clearAuthCookie(res: Response): void {
  res.clearCookie('token', jwtConfig.cookieOptions);
}
