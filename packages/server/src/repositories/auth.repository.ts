// src/repositories/auth.repository.ts
import { db } from '../config/database';

export interface Propietario {
  propietario_id: number;
  correo_electronico: string;
  hash_password: string;
  nombre: string | null;
  primer_apellido: string | null;
  segundo_apellido: string | null;
  rol_id: number;
}

export interface CreatePropietarioDTO {
  correo_electronico: string;
  hash_password: string;
  nombre?: string;
  primer_apellido?: string;
  segundo_apellido?: string;
}

export class AuthRepository {
  /**
   * Buscar propietario por email
   */
  async findByEmail(email: string): Promise<Propietario | null> {
    const query = `
      SELECT 
        propietario_id, 
        correo_electronico, 
        hash_password, 
        nombre, 
        primer_apellido, 
        segundo_apellido, 
        rol_id
      FROM public.propietarios
      WHERE correo_electronico = $1
    `;
    
    const result = await db.query(query, [email]);
    return result.rows[0] as Propietario || null;
  }

  /**
   * Buscar propietario por ID
   */
  async findById(id: number): Promise<Propietario | null> {
    const query = `
      SELECT 
        propietario_id, 
        correo_electronico, 
        hash_password, 
        nombre, 
        primer_apellido, 
        segundo_apellido, 
        rol_id
      FROM public.propietarios
      WHERE propietario_id = $1
    `;
    
    const result = await db.query(query, [id]);
    return result.rows[0] as Propietario || null;
  }

  /**
   * Crear nuevo propietario
   */
  async create(data: CreatePropietarioDTO): Promise<Propietario> {
    const query = `
      INSERT INTO public.propietarios
        (correo_electronico, hash_password, nombre, primer_apellido, segundo_apellido)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING 
        propietario_id, 
        correo_electronico, 
        nombre, 
        primer_apellido, 
        segundo_apellido, 
        rol_id
    `;
    
    const result = await db.query(query, [
      data.correo_electronico,
      data.hash_password,
      data.nombre || null,
      data.primer_apellido || null,
      data.segundo_apellido || null,
    ]);
    
    return result.rows[0] as Propietario;
  }
}

export const authRepository = new AuthRepository();