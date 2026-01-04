// src/utils/hash.util.ts
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

/**
 * Crear hash de contraseña
 */
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Comparar contraseña con hash
 */
export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}
