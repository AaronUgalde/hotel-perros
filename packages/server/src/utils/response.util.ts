// src/utils/response.util.ts
import { Response } from 'express';

/**
 * Respuesta exitosa estándar
 */
export function sendSuccess<T = any>(
  res: Response,
  data: T,
  message?: string,
  statusCode: number = 200
): void {
  res.status(statusCode).json({
    success: true,
    ...(message && { message }),
    data,
  });
}

/**
 * Respuesta de error estándar
 */
export function sendError(
  res: Response,
  error: string | string[],
  statusCode: number = 400
): void {
  res.status(statusCode).json({
    success: false,
    error,
  });
}
