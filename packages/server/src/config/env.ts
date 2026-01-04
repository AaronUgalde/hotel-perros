// src/config/env.ts
import dotenv from 'dotenv';

// Cargar variables de entorno UNA SOLA VEZ
dotenv.config();

interface EnvConfig {
  // Server
  NODE_ENV: string;
  PORT: number;
  FRONTEND_URL: string;
  
  // Database
  DATABASE_URL: string;
  
  // JWT
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string | number;
  
  // Uploads (opcional)
  UPLOAD_DIR?: string;
  MAX_FILE_SIZE?: number;
}

function validateEnv(): EnvConfig {
  const required = [
    'DATABASE_URL',
    'JWT_SECRET',
    'FRONTEND_URL'
  ];

  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(
      `Faltan las siguientes variables de entorno: ${missing.join(', ')}`
    );
  }

  // Parsear JWT_EXPIRES_IN
  const rawExpires = process.env.JWT_EXPIRES_IN || '7d';
  let expiresIn: string | number = rawExpires;
  const maybeNum = Number(rawExpires);
  if (Number.isFinite(maybeNum)) {
    expiresIn = maybeNum;
  }

  return {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: parseInt(process.env.PORT || '4000', 10),
    FRONTEND_URL: process.env.FRONTEND_URL!,
    DATABASE_URL: process.env.DATABASE_URL!,
    JWT_SECRET: process.env.JWT_SECRET!,
    JWT_EXPIRES_IN: expiresIn,
    UPLOAD_DIR: process.env.UPLOAD_DIR || './uploads',
    MAX_FILE_SIZE: parseInt(process.env.MAX_FILE_SIZE || '5242880', 10) // 5MB
  };
}

export const env = validateEnv();

export const isDevelopment = env.NODE_ENV === 'development';
export const isProduction = env.NODE_ENV === 'production';