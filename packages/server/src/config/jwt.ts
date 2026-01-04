// src/config/jwt.ts
import { env } from './env';
import { SignOptions } from 'jsonwebtoken';

export const jwtConfig = {
  secret: env.JWT_SECRET,
  signOptions: {
    expiresIn: env.JWT_EXPIRES_IN
  } as SignOptions,
  cookieOptions: {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
  }
};

/**
 * Obtener maxAge de cookie según remember
 */
export function getCookieMaxAge(remember?: boolean): number | undefined {
  if (remember) {
    return 30 * 24 * 60 * 60 * 1000; // 30 días en ms
  }
  return undefined;
}