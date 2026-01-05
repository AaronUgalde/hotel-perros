// src/repositories/disease.repository.ts
import { db } from '../config/database';

export interface Disease {
  enfermedad_mascota_id: number;
  mascota_id: number;
  enfermedad_id: number;
  fecha_diagnostico: Date | null;
  observaciones: string | null;
  tratamiento: string | null;
}

export interface CreateDiseaseDTO {
  mascota_id: number;
  enfermedad_id: number;
  fecha_diagnostico?: Date | string;
  observaciones?: string;
  tratamiento?: string;
}

export class DiseaseRepository {
  // Obtener todas las enfermedades de una mascota
  async findAllByPet(mascotaId: number): Promise<Disease[]> {
    const query = `
      SELECT 
        enfermedad_mascota_id,
        mascota_id,
        enfermedad_id,
        fecha_diagnostico,
        observaciones,
        tratamiento
      FROM enfermedades_mascotas
      WHERE mascota_id = $1
      ORDER BY fecha_diagnostico DESC NULLS LAST
    `;

    const result = await db.query(query, [mascotaId]);
    return result.rows;
  }

  // Obtener una enfermedad específica
  async findById(
    enfermedadId: number,
    mascotaId: number
  ): Promise<Disease | null> {
    const query = `
      SELECT 
        enfermedad_mascota_id,
        mascota_id,
        enfermedad_id,
        fecha_diagnostico,
        observaciones,
        tratamiento
      FROM enfermedades_mascotas
      WHERE enfermedad_mascota_id = $1 AND mascota_id = $2
    `;

    const result = await db.query(query, [enfermedadId, mascotaId]);
    return result.rows[0] || null;
  }

  // Registrar nueva enfermedad
  async create(data: CreateDiseaseDTO): Promise<Disease> {
    const query = `
      INSERT INTO enfermedades_mascotas
        (mascota_id, enfermedad_id, fecha_diagnostico, observaciones, tratamiento)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING 
        enfermedad_mascota_id,
        mascota_id,
        enfermedad_id,
        fecha_diagnostico,
        observaciones,
        tratamiento
    `;

    const result = await db.query(query, [
      data.mascota_id,
      data.enfermedad_id,
      data.fecha_diagnostico ?? null,
      data.observaciones ?? null,
      data.tratamiento ?? null,
    ]);

    return result.rows[0];
  }

  // Actualizar enfermedad
  async update(
    enfermedadId: number,
    mascotaId: number,
    data: Partial<CreateDiseaseDTO>
  ): Promise<Disease | null> {
    const allowedFields = [
      'enfermedad_id',
      'fecha_diagnostico',
      'observaciones',
      'tratamiento',
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

    values.push(enfermedadId, mascotaId);

    const query = `
      UPDATE enfermedades_mascotas
      SET ${sets.join(', ')}
      WHERE enfermedad_mascota_id = $${idx++} AND mascota_id = $${idx}
      RETURNING *
    `;

    const result = await db.query(query, values);
    return result.rows[0] || null;
  }

  // Eliminar enfermedad
  async delete(
    enfermedadId: number,
    mascotaId: number
  ): Promise<boolean> {
    const query = `
      DELETE FROM enfermedades_mascotas
      WHERE enfermedad_mascota_id = $1 AND mascota_id = $2
      RETURNING enfermedad_mascota_id
    `;

    const result = await db.query(query, [enfermedadId, mascotaId]);
    return (result.rowCount ?? 0) > 0;
  }

  // Catálogo de enfermedades por especie
  async getEnfermedadesByEspecie(especieId: string): Promise<any[]> {
    const query = `
      SELECT 
        enfermedad_id,
        nombre,
        descripcion,
        especie_id
      FROM enfermedades
      WHERE especie_id = $1
      ORDER BY nombre
    `;

    const result = await db.query(query, [especieId]);
    return result.rows;
  }

  // Verificar ownership de mascota
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

export const diseaseRepository = new DiseaseRepository();
