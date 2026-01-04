import { db } from '../config/database';

export interface Telefono {
  telefono_id: number;
  propietario_id: number;
  numero: string;
  tipo_telefono_id: number | null;
  nombre_contacto: string | null;
  relacion_contacto: string | null;
  es_principal: boolean;
  notas: string | null;
}

export interface TipoTelefono {
  tipo_telefono_id: number;
  nombre: string;
}

export class TelefonoRepository {
  // Catálogos
  async getTiposTelefono(): Promise<TipoTelefono[]> {
    const query = `SELECT * FROM tipos_telefono ORDER BY nombre`;
    const result = await db.query(query);
    return result.rows;
  }

  // CRUD Teléfonos
  async findAllByOwner(propietarioId: number): Promise<Telefono[]> {
    const query = `
      SELECT 
        telefono_id, 
        propietario_id,
        numero, 
        tipo_telefono_id, 
        nombre_contacto, 
        relacion_contacto, 
        es_principal, 
        notas
      FROM telefonos_propietarios
      WHERE propietario_id = $1
      ORDER BY es_principal DESC, telefono_id
    `;
    const result = await db.query(query, [propietarioId]);
    return result.rows;
  }

  async findById(telefonoId: number, propietarioId: number): Promise<Telefono | null> {
    const query = `
      SELECT * FROM telefonos_propietarios 
      WHERE telefono_id = $1 AND propietario_id = $2
    `;
    const result = await db.query(query, [telefonoId, propietarioId]);
    return result.rows[0] || null;
  }

  async clearPrincipalPhone(propietarioId: number): Promise<void> {
    const query = `
      UPDATE telefonos_propietarios 
      SET es_principal = false 
      WHERE propietario_id = $1 AND es_principal = true
    `;
    await db.query(query, [propietarioId]);
  }

  async create(data: Partial<Telefono>): Promise<Telefono> {
    const query = `
      INSERT INTO telefonos_propietarios
        (propietario_id, numero, tipo_telefono_id, nombre_contacto, 
         relacion_contacto, es_principal, notas)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;

    const result = await db.query(query, [
      data.propietario_id,
      data.numero,
      data.tipo_telefono_id ?? null,
      data.nombre_contacto ?? null,
      data.relacion_contacto ?? null,
      data.es_principal ?? false,
      data.notas ?? null,
    ]);

    return result.rows[0];
  }

  async update(telefonoId: number, propietarioId: number, data: Partial<Telefono>): Promise<Telefono | null> {
    const updatable = [
      'numero', 'tipo_telefono_id', 'nombre_contacto', 
      'relacion_contacto', 'es_principal', 'notas'
    ];

    const sets: string[] = [];
    const values: any[] = [];
    let idx = 1;

    for (const field of updatable) {
      if (data[field as keyof Telefono] !== undefined) {
        sets.push(`${field} = $${idx++}`);
        values.push(data[field as keyof Telefono]);
      }
    }

    if (sets.length === 0) {
      return null;
    }

    values.push(telefonoId, propietarioId);
    const query = `
      UPDATE telefonos_propietarios 
      SET ${sets.join(', ')} 
      WHERE telefono_id = $${idx++} AND propietario_id = $${idx}
      RETURNING *
    `;

    const result = await db.query(query, values);
    return result.rows[0] || null;
  }

  async delete(telefonoId: number, propietarioId: number): Promise<boolean> {
    const query = `
      DELETE FROM telefonos_propietarios 
      WHERE telefono_id = $1 AND propietario_id = $2
      RETURNING telefono_id
    `;
    const result = await db.query(query, [telefonoId, propietarioId]);
    return (result.rowCount || 0) > 0;
  }
}

export const telefonoRepository = new TelefonoRepository();
