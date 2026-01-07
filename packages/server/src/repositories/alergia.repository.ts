// src/repositories/alergia.repository.ts
import { db } from '../config/database';

export interface Alergia {
  alergia_id: number;
  nombre: string;
  tipo: string | null;
}

export interface MascotaAlergia {
  mascota_id: number;
  alergia_id: number;
  severidad: string | null;
}

export interface CreateMascotaAlergiaDTO {
  mascota_id: number;
  alergia_id: number;
  severidad?: string;
}

export class AlergiaRepository {
  // Obtener todas las alergias de una mascota
  async findAllByPet(mascotaId: number): Promise<any[]> {
    const query = `
      SELECT 
        ma.mascota_id,
        ma.alergia_id,
        ma.severidad,
        a.nombre,
        a.tipo
      FROM mascotas_alergias ma
      INNER JOIN alergias a ON ma.alergia_id = a.alergia_id
      WHERE ma.mascota_id = $1
      ORDER BY a.nombre ASC
    `;

    const result = await db.query(query, [mascotaId]);
    return result.rows;
  }

  // Agregar alergia a mascota
  async create(data: CreateMascotaAlergiaDTO): Promise<MascotaAlergia> {
    const query = `
      INSERT INTO mascotas_alergias
        (mascota_id, alergia_id, severidad)
      VALUES ($1, $2, $3)
      RETURNING 
        mascota_id,
        alergia_id,
        severidad
    `;

    const result = await db.query(query, [
      data.mascota_id,
      data.alergia_id,
      data.severidad ?? null,
    ]);

    return result.rows[0];
  }

  // Eliminar alergia de mascota
  async delete(mascotaId: number, alergiaId: number): Promise<boolean> {
    const query = `
      DELETE FROM mascotas_alergias
      WHERE mascota_id = $1 AND alergia_id = $2
      RETURNING mascota_id
    `;

    const result = await db.query(query, [mascotaId, alergiaId]);
    return (result.rowCount ?? 0) > 0;
  }

  // Obtener catálogo completo de alergias
  async getAllAlergias(): Promise<Alergia[]> {
    const query = `
      SELECT 
        alergia_id,
        nombre,
        tipo
      FROM alergias
      ORDER BY tipo, nombre
    `;

    const result = await db.query(query);
    return result.rows;
  }

  // Verificar ownership de mascota
  async verifyPetOwnership(mascotaId: number, propietarioId: number): Promise<boolean> {
    const query = `
      SELECT 1
      FROM mascotas
      WHERE mascota_id = $1 AND propietario_id = $2
    `;

    const result = await db.query(query, [mascotaId, propietarioId]);
    return (result.rowCount ?? 0) > 0;
  }
}

export const alergiaRepository = new AlergiaRepository();
