// src/repositories/vaccination.repository.ts
import { db } from '../config/database';

export interface Vaccination {
  vacuna_mascota_id: number;
  mascota_id: number;
  vacuna_id: number | null;
  nombre_vacuna: string | null;
  fecha_aplicacion: Date | null;
  vigencia_hasta: Date | null;
  veterinario: string | null;
  notas: string | null;
}

export interface CreateVaccinationDTO {
  mascota_id: number;
  vacuna_id?: number;
  nombre_vacuna?: string;
  fecha_aplicacion?: Date | string;
  vigencia_hasta?: Date | string;
  veterinario?: string;
  notas?: string;
}

export class VaccinationRepository {
  // Obtener todas las vacunaciones de una mascota
  async findAllByPet(mascotaId: number): Promise<Vaccination[]> {
    const query = `
      SELECT 
        vacuna_mascota_id, 
        mascota_id, 
        vacuna_id, 
        nombre_vacuna, 
        fecha_aplicacion, 
        vigencia_hasta, 
        veterinario, 
        notas
      FROM vacunas_mascotas
      WHERE mascota_id = $1
      ORDER BY fecha_aplicacion DESC
    `;

    const result = await db.query(query, [mascotaId]);
    return result.rows;
  }

  // Obtener una vacunación específica
  async findById(
    vacunaId: number,
    mascotaId: number
  ): Promise<Vaccination | null> {
    const query = `
      SELECT 
        vacuna_mascota_id, 
        mascota_id, 
        vacuna_id, 
        nombre_vacuna, 
        fecha_aplicacion, 
        vigencia_hasta, 
        veterinario, 
        notas
      FROM vacunas_mascotas
      WHERE vacuna_mascota_id = $1 AND mascota_id = $2
    `;

    const result = await db.query(query, [vacunaId, mascotaId]);
    return result.rows[0] || null;
  }

  // Crear vacunación
  async create(data: CreateVaccinationDTO): Promise<Vaccination> {
    const query = `
      INSERT INTO vacunas_mascotas
        (mascota_id, vacuna_id, nombre_vacuna, fecha_aplicacion, vigencia_hasta, veterinario, notas)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING 
        vacuna_mascota_id, 
        mascota_id, 
        vacuna_id, 
        nombre_vacuna, 
        fecha_aplicacion, 
        vigencia_hasta, 
        veterinario, 
        notas
    `;

    const result = await db.query(query, [
      data.mascota_id,
      data.vacuna_id ?? null,
      data.nombre_vacuna ?? null,
      data.fecha_aplicacion ?? null,
      data.vigencia_hasta ?? null,
      data.veterinario ?? null,
      data.notas ?? null,
    ]);

    return result.rows[0];
  }

  // Actualizar vacunación
  async update(
    vacunaId: number,
    mascotaId: number,
    data: Partial<CreateVaccinationDTO>
  ): Promise<Vaccination | null> {
    const allowedFields = [
      'nombre_vacuna',
      'vacuna_id',
      'fecha_aplicacion',
      'vigencia_hasta',
      'veterinario',
      'notas',
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

    values.push(vacunaId, mascotaId);

    const query = `
      UPDATE vacunas_mascotas
      SET ${sets.join(', ')}
      WHERE vacuna_mascota_id = $${idx++} AND mascota_id = $${idx}
      RETURNING *
    `;

    const result = await db.query(query, values);
    return result.rows[0] || null;
  }

  // Eliminar vacunación
  async delete(vacunaId: number, mascotaId: number): Promise<boolean> {
    const query = `
      DELETE FROM vacunas_mascotas
      WHERE vacuna_mascota_id = $1 AND mascota_id = $2
      RETURNING vacuna_mascota_id
    `;

    const result = await db.query(query, [vacunaId, mascotaId]);
    return (result.rowCount ?? 0) > 0;
  }

  // Catálogo de vacunas por especie
  async getVacunasByEspecie(especieId: string): Promise<any[]> {
    const query = `SELECT * FROM vacunas WHERE especie_id = $1`;
    const result = await db.query(query, [especieId]);
    return result.rows;
  }

  // Verificar si existe mascota
  async petExists(mascotaId: number): Promise<boolean> {
    const query = `SELECT 1 FROM mascotas WHERE mascota_id = $1`;
    const result = await db.query(query, [mascotaId]);
    return (result.rowCount ?? 0) > 0;
  }

  // Verificar ownership
  async verifyPetOwnership(
    mascotaId: number,
    propietarioId: number
  ): Promise<boolean> {
    const query = `
      SELECT 1
      FROM mascotas
      WHERE mascota_id = $1 AND propietario_id = $2
    `;
    const result = await db.query(query, [mascotaId, propietarioId]);
    return (result.rowCount ?? 0) > 0;
  }
}

export const vaccinationRepository = new VaccinationRepository();
