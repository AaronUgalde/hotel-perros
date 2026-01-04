import { db } from '../config/database';

export interface Pet {
  mascota_id: number;
  propietario_id: number;
  nombre: string;
  especie_id: number;
  raza_id: number | null;
  sexo_id: number;
  fecha_nacimiento: Date;
  peso_kg: number | null;
  altura_cm: number | null;
  largo_cm: number | null;
  patron_pelo_id: number | null;
  color_principal_id: number | null;
  color_ojos_id: number | null;
  numero_chip: number | null;
  ruac: number | null;
  esterilizado: boolean;
  senas_particulares: string | null;
  fecha_alta: Date | null;
  origen_id: number | null;
  funcion_id: number | null;
  mestizo: boolean | null;
  url_database_chip: number | null;
  frecuency_chip: number | null;
}

export class PetRepository {
  async findAllByOwner(propietarioId: number): Promise<Pet[]> {
    const query = `
      SELECT * FROM mascotas 
      WHERE propietario_id = $1 
      ORDER BY nombre
    `;
    const result = await db.query(query, [propietarioId]);
    return result.rows as Pet[];
  }

  async findById(id: number): Promise<Pet | null> {
    const query = `SELECT * FROM mascotas WHERE mascota_id = $1`;
    const result = await db.query(query, [id]);
    return result.rows[0] as Pet || null;
  }

  async create(data: Partial<Pet>): Promise<Pet> {
    const query = `
      INSERT INTO mascotas 
        (propietario_id, nombre, especie_id, raza_id, sexo_id, fecha_nacimiento,
         peso_kg, altura_cm, largo_cm, patron_pelo_id, color_principal_id, 
         color_ojos_id, numero_chip, ruac, esterilizado, senas_particulares,
         fecha_alta, origen_id, funcion_id, mestizo, url_database_chip, frecuency_chip)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)
      RETURNING *
    `;
    const result = await db.query(query, [
      data.propietario_id,
      data.nombre,
      data.especie_id,
      data.raza_id,
      data.sexo_id,
      data.fecha_nacimiento,
      data.peso_kg,
      data.altura_cm,
      data.largo_cm,
      data.patron_pelo_id,
      data.color_principal_id,
      data.color_ojos_id,
      data.numero_chip,
      data.ruac,
      data.esterilizado,
      data.senas_particulares,
      data.fecha_alta,
      data.origen_id,
      data.funcion_id,
      data.mestizo,
      data.url_database_chip,
      data.frecuency_chip
    ]);
    return result.rows[0] as Pet;
  }

  async update(id: number, data: Partial<Pet>): Promise<Pet> {
    const fields = Object.keys(data).filter(k => k !== 'mascota_id' && k !== 'propietario_id');
    const sets = fields.map((f, i) => `${f} = $${i + 1}`);
    const values = fields.map(f => data[f as keyof Pet]);
    values.push(id);

    const query = `
      UPDATE mascotas 
      SET ${sets.join(', ')}
      WHERE mascota_id = $${values.length}
      RETURNING *
    `;
    const result = await db.query(query, values);
    return result.rows[0] as Pet;
  }

  async delete(id: number): Promise<boolean> {
    const query = `DELETE FROM mascotas WHERE mascota_id = $1`;
    const result = await db.query(query, [id]);
    return (result.rowCount || 0) > 0;
  }

  // Catálogos
  async getSexos() {
    const result = await db.query(`SELECT * FROM sexos ORDER BY nombre`);
    return result.rows;
  }

  async getPatronPelo() {
    const result = await db.query(`SELECT * FROM patron_pelo ORDER BY nombre`);
    return result.rows;
  }

  async getOrigenMascota() {
    const result = await db.query(`SELECT * FROM origen_mascota ORDER BY descripcion`);
    return result.rows;
  }

  async getFuncionMascota() {
    const result = await db.query(`SELECT * FROM funcion_mascota ORDER BY descripcion`);
    return result.rows;
  }

  async getColores() {
    const result = await db.query(`SELECT * FROM colores ORDER BY nombre`);
    return result.rows;
  }

  async getEspecies() {
    const result = await db.query(`SELECT * FROM especies ORDER BY nombre`);
    return result.rows;
  }

  async getRazasByEspecie(especieId: string) {
    const query = `SELECT * FROM razas WHERE especie_id = $1 ORDER BY nombre`;
    const result = await db.query(query, [especieId]);
    return result.rows;
  }
}

export const petRepository = new PetRepository();
