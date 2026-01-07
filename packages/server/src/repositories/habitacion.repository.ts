// src/repositories/habitacion.repository.ts
import { db } from '../config/database';

export interface Habitacion {
  habitacion_id: number;
  nombre_numero: string;
  descripcion: string | null;
  capacidad_kg: number | null;
  max_altura: number | null;
  max_largo: number | null;
  precio_noche: number;
  activa: boolean;
  especie_id: number | null;
  especie_nombre?: string | null;
}

export interface CreateHabitacionDTO {
  nombre_numero: string;
  descripcion?: string;
  capacidad_kg?: number;
  max_altura?: number;
  max_largo?: number;
  precio_noche: number;
  activa?: boolean;
  especie_id?: number;
}

export class HabitacionRepository {
  // Obtener todas las habitaciones con información de especie
  async findAll(includeInactive: boolean = false): Promise<Habitacion[]> {
    const query = `
      SELECT 
        h.habitacion_id,
        h.nombre_numero,
        h.descripcion,
        h.capacidad_kg,
        h.max_altura,
        h.max_largo,
        h.precio_noche,
        h.activa,
        h.especie_id,
        e.nombre as especie_nombre
      FROM habitaciones h
      LEFT JOIN especies e ON h.especie_id = e.especie_id
      ${includeInactive ? '' : 'WHERE h.activa = true'}
      ORDER BY h.nombre_numero ASC
    `;

    const result = await db.query(query);
    return result.rows;
  }

  // Obtener una habitación por ID con información de especie
  async findById(habitacionId: number): Promise<Habitacion | null> {
    const query = `
      SELECT 
        h.habitacion_id,
        h.nombre_numero,
        h.descripcion,
        h.capacidad_kg,
        h.max_altura,
        h.max_largo,
        h.precio_noche,
        h.activa,
        h.especie_id,
        e.nombre as especie_nombre
      FROM habitaciones h
      LEFT JOIN especies e ON h.especie_id = e.especie_id
      WHERE h.habitacion_id = $1
    `;

    const result = await db.query(query, [habitacionId]);
    return result.rows[0] || null;
  }

  // Crear nueva habitación
  async create(data: CreateHabitacionDTO): Promise<Habitacion> {
    const query = `
      INSERT INTO habitaciones
        (nombre_numero, descripcion, capacidad_kg, max_altura, max_largo, 
         precio_noche, activa, especie_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING 
        habitacion_id,
        nombre_numero,
        descripcion,
        capacidad_kg,
        max_altura,
        max_largo,
        precio_noche,
        activa,
        especie_id
    `;

    const result = await db.query(query, [
      data.nombre_numero,
      data.descripcion ?? null,
      data.capacidad_kg ?? null,
      data.max_altura ?? null,
      data.max_largo ?? null,
      data.precio_noche,
      data.activa ?? true,
      data.especie_id ?? null,
    ]);

    return result.rows[0];
  }

  // Actualizar habitación
  async update(
    habitacionId: number,
    data: Partial<CreateHabitacionDTO>
  ): Promise<Habitacion | null> {
    const allowedFields = [
      'nombre_numero',
      'descripcion',
      'capacidad_kg',
      'max_altura',
      'max_largo',
      'precio_noche',
      'activa',
      'especie_id',
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

    values.push(habitacionId);

    const query = `
      UPDATE habitaciones
      SET ${sets.join(', ')}
      WHERE habitacion_id = $${idx}
      RETURNING *
    `;

    const result = await db.query(query, values);
    return result.rows[0] || null;
  }

  // Eliminar habitación (soft delete cambiando activa a false)
  async softDelete(habitacionId: number): Promise<boolean> {
    const query = `
      UPDATE habitaciones
      SET activa = false
      WHERE habitacion_id = $1
      RETURNING habitacion_id
    `;

    const result = await db.query(query, [habitacionId]);
    return (result.rowCount ?? 0) > 0;
  }

  // Eliminar habitación permanentemente
  async delete(habitacionId: number): Promise<boolean> {
    const query = `
      DELETE FROM habitaciones
      WHERE habitacion_id = $1
      RETURNING habitacion_id
    `;

    const result = await db.query(query, [habitacionId]);
    return (result.rowCount ?? 0) > 0;
  }

  // Verificar si la habitación está en uso en reservaciones
  async isInUse(habitacionId: number): Promise<boolean> {
    const query = `
      SELECT 1
      FROM reservaciones
      WHERE habitacion_id = $1
      LIMIT 1
    `;

    const result = await db.query(query, [habitacionId]);
    return (result.rowCount ?? 0) > 0;
  }

  // Verificar si existe una habitación con el mismo nombre/número
  async existsByNombre(nombre: string, excludeId?: number): Promise<boolean> {
    const query = excludeId
      ? `SELECT 1 FROM habitaciones WHERE nombre_numero = $1 AND habitacion_id != $2 LIMIT 1`
      : `SELECT 1 FROM habitaciones WHERE nombre_numero = $1 LIMIT 1`;

    const params = excludeId ? [nombre, excludeId] : [nombre];
    const result = await db.query(query, params);
    return (result.rowCount ?? 0) > 0;
  }

  // Obtener habitaciones por especie
  async findByEspecie(especieId: number): Promise<Habitacion[]> {
    const query = `
      SELECT 
        h.habitacion_id,
        h.nombre_numero,
        h.descripcion,
        h.capacidad_kg,
        h.max_altura,
        h.max_largo,
        h.precio_noche,
        h.activa,
        h.especie_id,
        e.nombre as especie_nombre
      FROM habitaciones h
      LEFT JOIN especies e ON h.especie_id = e.especie_id
      WHERE h.especie_id = $1 AND h.activa = true
      ORDER BY h.nombre_numero ASC
    `;

    const result = await db.query(query, [especieId]);
    return result.rows;
  }
}

export const habitacionRepository = new HabitacionRepository();
