// src/repositories/desparasitacion.repository.ts
import { db } from '../config/database';

export interface Desparasitacion {
  desparasitacion_id: number;
  mascota_id: number;
  tipo: string | null;
  producto: string | null;
  fecha: Date | null;
  proxima_fecha: Date | null;
}

export interface CreateDesparasitacionDTO {
  mascota_id: number;
  tipo?: string;
  producto?: string;
  fecha?: Date | string;
  proxima_fecha?: Date | string;
}

export class DesparasitacionRepository {
  // Obtener todas las desparasitaciones de una mascota
  async findAllByPet(mascotaId: number): Promise<Desparasitacion[]> {
    const query = `
      SELECT 
        desparasitacion_id,
        mascota_id,
        tipo,
        producto,
        fecha,
        proxima_fecha
      FROM desparasitaciones
      WHERE mascota_id = $1
      ORDER BY fecha DESC NULLS LAST
    `;

    const result = await db.query(query, [mascotaId]);
    return result.rows;
  }

  // Obtener una desparasitación específica
  async findById(desparasitacionId: number, mascotaId: number): Promise<Desparasitacion | null> {
    const query = `
      SELECT 
        desparasitacion_id,
        mascota_id,
        tipo,
        producto,
        fecha,
        proxima_fecha
      FROM desparasitaciones
      WHERE desparasitacion_id = $1 AND mascota_id = $2
    `;

    const result = await db.query(query, [desparasitacionId, mascotaId]);
    return result.rows[0] || null;
  }

  // Registrar nueva desparasitación
  async create(data: CreateDesparasitacionDTO): Promise<Desparasitacion> {
    const query = `
      INSERT INTO desparasitaciones
        (mascota_id, tipo, producto, fecha, proxima_fecha)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING 
        desparasitacion_id,
        mascota_id,
        tipo,
        producto,
        fecha,
        proxima_fecha
    `;

    const result = await db.query(query, [
      data.mascota_id,
      data.tipo ?? null,
      data.producto ?? null,
      data.fecha ?? null,
      data.proxima_fecha ?? null,
    ]);

    return result.rows[0];
  }

  // Actualizar desparasitación
  async update(
    desparasitacionId: number,
    mascotaId: number,
    data: Partial<CreateDesparasitacionDTO>
  ): Promise<Desparasitacion | null> {
    const allowedFields = [
      'tipo',
      'producto',
      'fecha',
      'proxima_fecha',
    ];

    const sets: string[] = [];
    const values: any[] = [];
    let idx = 1;

    for (const field of allowedFields) {
      if (data[field as keyof typeof data] !== undefined) {
        sets.push(`${field} = $${idx++}`);
        values.push(data[field as keyof typeof data]);
      }
    }

    if (sets.length === 0) return null;

    values.push(desparasitacionId, mascotaId);

    const query = `
      UPDATE desparasitaciones
      SET ${sets.join(', ')}
      WHERE desparasitacion_id = $${idx++} AND mascota_id = $${idx}
      RETURNING *
    `;

    const result = await db.query(query, values);
    return result.rows[0] || null;
  }

  // Eliminar desparasitación
  async delete(desparasitacionId: number, mascotaId: number): Promise<boolean> {
    const query = `
      DELETE FROM desparasitaciones
      WHERE desparasitacion_id = $1 AND mascota_id = $2
      RETURNING desparasitacion_id
    `;

    const result = await db.query(query, [desparasitacionId, mascotaId]);
    return (result.rowCount ?? 0) > 0;
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

export const desparasitacionRepository = new DesparasitacionRepository();
