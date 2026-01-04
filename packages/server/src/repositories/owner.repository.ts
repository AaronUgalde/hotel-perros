import { db } from '../config/database';
import { PoolClient } from 'pg';

export interface Owner {
  propietario_id: number;
  correo_electronico: string;
  nombre: string | null;
  primer_apellido: string | null;
  segundo_apellido: string | null;
  rol_id: number;
}

export class OwnerRepository {
  async findById(id: number): Promise<Owner | null> {
    const query = `
      SELECT propietario_id, correo_electronico, nombre, 
             primer_apellido, segundo_apellido, rol_id
      FROM public.propietarios
      WHERE propietario_id = $1
    `;
    const result = await db.query(query, [id]);
    return result.rows[0] as Owner || null;
  }

  async update(id: number, data: Partial<Owner>): Promise<Owner> {
    const fields = ['nombre', 'primer_apellido', 'segundo_apellido'];
    const sets: string[] = [];
    const values: any[] = [];
    let idx = 1;

    for (const f of fields) {
      if (data[f as keyof typeof data] !== undefined) {
        sets.push(`${f} = $${idx++}`);
        values.push(data[f as keyof typeof data]);
      }
    }

    if (sets.length === 0) throw new Error('Nada que actualizar');

    values.push(id);
    const query = `
      UPDATE public.propietarios 
      SET ${sets.join(', ')} 
      WHERE propietario_id = $${idx}
      RETURNING propietario_id, correo_electronico, nombre, 
                primer_apellido, segundo_apellido, rol_id
    `;

    const result = await db.query(query, values);
    return result.rows[0] as Owner;
  }

  async registerComplete(client: PoolClient, data: any): Promise<number> {
    // Implementar transacción compleja con teléfonos y direcciones
    const propResult = await client.query(
      `INSERT INTO propietarios 
       (correo_electronico, hash_password, nombre, primer_apellido, segundo_apellido)
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING propietario_id`,
      [data.correo_electronico, data.hash_password, data.nombre, 
       data.primer_apellido, data.segundo_apellido]
    );
    return propResult.rows[0].propietario_id;
  }
}

export const ownerRepository = new OwnerRepository();