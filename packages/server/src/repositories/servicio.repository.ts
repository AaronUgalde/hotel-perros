// src/repositories/servicio.repository.ts
import { db } from '../config/database';

export interface Servicio {
  servicio_id: number;
  nombre: string;
  descripcion: string | null;
  precio_unitario: number;
}

export interface CreateServicioDTO {
  nombre: string;
  descripcion?: string;
  precio_unitario: number;
}

export class ServicioRepository {
  // Obtener todos los servicios
  async findAll(): Promise<Servicio[]> {
    const query = `
      SELECT 
        servicio_id,
        nombre,
        descripcion,
        precio_unitario
      FROM servicios
      ORDER BY nombre ASC
    `;

    const result = await db.query(query);
    return result.rows;
  }

  // Obtener un servicio por ID
  async findById(servicioId: number): Promise<Servicio | null> {
    const query = `
      SELECT 
        servicio_id,
        nombre,
        descripcion,
        precio_unitario
      FROM servicios
      WHERE servicio_id = $1
    `;

    const result = await db.query(query, [servicioId]);
    return result.rows[0] || null;
  }

  // Crear nuevo servicio
  async create(data: CreateServicioDTO): Promise<Servicio> {
    const query = `
      INSERT INTO servicios
        (nombre, descripcion, precio_unitario)
      VALUES ($1, $2, $3)
      RETURNING 
        servicio_id,
        nombre,
        descripcion,
        precio_unitario
    `;

    const result = await db.query(query, [
      data.nombre,
      data.descripcion ?? null,
      data.precio_unitario,
    ]);

    return result.rows[0];
  }

  // Actualizar servicio
  async update(
    servicioId: number,
    data: Partial<CreateServicioDTO>
  ): Promise<Servicio | null> {
    const allowedFields = [
      'nombre',
      'descripcion',
      'precio_unitario',
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

    values.push(servicioId);

    const query = `
      UPDATE servicios
      SET ${sets.join(', ')}
      WHERE servicio_id = $${idx}
      RETURNING *
    `;

    const result = await db.query(query, values);
    return result.rows[0] || null;
  }

  // Eliminar servicio
  async delete(servicioId: number): Promise<boolean> {
    const query = `
      DELETE FROM servicios
      WHERE servicio_id = $1
      RETURNING servicio_id
    `;

    const result = await db.query(query, [servicioId]);
    return (result.rowCount ?? 0) > 0;
  }

  // Verificar si el servicio está en uso en reservaciones
  async isInUse(servicioId: number): Promise<boolean> {
    const query = `
      SELECT 1
      FROM reservaciones_servicios
      WHERE servicio_id = $1
      LIMIT 1
    `;

    const result = await db.query(query, [servicioId]);
    return (result.rowCount ?? 0) > 0;
  }
}

export const servicioRepository = new ServicioRepository();
