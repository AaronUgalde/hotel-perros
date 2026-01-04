import { db } from '../config/database';

export interface Direccion {
  direccion_id: number;
  propietario_id: number;
  tipo_domicilio_id: number;
  calle: string | null;
  num_exterior: string | null;
  num_interior: string | null;
  colonia_id: number | null;
  estado_id: number | null;
  municipio_id: number | null;
  codigo_postal: string | null;
  notas: string | null;
  es_predeterminada: boolean;
  fecha_inicio: Date;
  fecha_fin: Date | null;
}

export interface TipoDomicilio {
  tipo_domicilio_id: number;
  nombre: string;
}

export interface Estado {
  estado_id: number;
  nombre: string;
}

export interface Municipio {
  municipio_id: number;
  estado_id: number;
  nombre: string;
}

export interface Colonia {
  colonia_id: number;
  municipio_id: number;
  codigo_postal: string;
  nombre: string;
}

export interface CodigoPostalInfo {
  colonias: Array<{ id: number; nombre: string }>;
  municipio: string;
  municipio_id: number;
  estado: string;
  estado_id: number;
}

export class DireccionRepository {
  // Catálogos
  async getTiposDomicilio(): Promise<TipoDomicilio[]> {
    const query = `SELECT * FROM tipos_domicilio ORDER BY nombre`;
    const result = await db.query(query);
    return result.rows;
  }

  async getEstados(): Promise<Estado[]> {
    const query = `SELECT estado_id as id, nombre FROM estados ORDER BY nombre`;
    const result = await db.query(query);
    return result.rows;
  }

  async getMunicipiosByEstado(estadoId: number): Promise<Municipio[]> {
    const query = `
      SELECT municipio_id as id, nombre 
      FROM municipios 
      WHERE estado_id = $1 
      ORDER BY nombre
    `;
    const result = await db.query(query, [estadoId]);
    return result.rows;
  }

  async getColoniasByMunicipioAndCP(municipioId: number, codigoPostal: string): Promise<Colonia[]> {
    // Remover leading zeros del código postal
    const cpNormalizado = parseInt(codigoPostal, 10).toString();
    
    const query = `
      SELECT colonia_id as id, nombre 
      FROM colonias 
      WHERE municipio_id = $1 AND codigo_postal = $2 
      ORDER BY nombre
    `;
    const result = await db.query(query, [municipioId, cpNormalizado]);
    return result.rows;
  }

  async getInfoByCodigoPostal(codigoPostal: string): Promise<CodigoPostalInfo | null> {
    // Remover leading zeros del código postal
    const cpNormalizado = parseInt(codigoPostal, 10).toString();
    
    const query = `
      SELECT
        c.colonia_id,
        c.nombre AS colonia_nombre,
        c.codigo_postal,
        m.municipio_id,
        m.nombre AS municipio_nombre,
        e.estado_id,
        e.nombre AS estado_nombre
      FROM colonias c
      JOIN municipios m ON c.municipio_id = m.municipio_id
      JOIN estados e ON m.estado_id = e.estado_id
      WHERE c.codigo_postal = $1
      ORDER BY c.nombre
    `;
    const result = await db.query(query, [cpNormalizado]);

    if (result.rows.length === 0) {
      return null;
    }

    const primerRegistro = result.rows[0];
    const colonias = result.rows.map((r) => ({
      id: r.colonia_id,
      nombre: r.colonia_nombre,
    }));

    return {
      colonias,
      municipio: primerRegistro.municipio_nombre,
      municipio_id: primerRegistro.municipio_id,
      estado: primerRegistro.estado_nombre,
      estado_id: primerRegistro.estado_id,
    };
  }

  // CRUD Direcciones
  async findAllByOwner(propietarioId: number): Promise<Direccion[]> {
    const query = `
      SELECT * FROM direcciones_propietarios 
      WHERE propietario_id = $1 
      ORDER BY fecha_inicio DESC
    `;
    const result = await db.query(query, [propietarioId]);
    return result.rows;
  }

  async findById(direccionId: number, propietarioId: number): Promise<Direccion | null> {
    const query = `
      SELECT * FROM direcciones_propietarios 
      WHERE direccion_id = $1 AND propietario_id = $2
    `;
    const result = await db.query(query, [direccionId, propietarioId]);
    return result.rows[0] || null;
  }

  async clearDefaultAddresses(propietarioId: number): Promise<void> {
    const query = `
      UPDATE direcciones_propietarios 
      SET es_predeterminada = false 
      WHERE propietario_id = $1
    `;
    await db.query(query, [propietarioId]);
  }

  async create(data: Partial<Direccion>): Promise<Direccion> {
    // Normalizar código postal (remover leading zeros)
    const cpNormalizado = data.codigo_postal 
      ? parseInt(data.codigo_postal, 10).toString() 
      : null;
    
    const query = `
      INSERT INTO direcciones_propietarios (
        propietario_id, tipo_domicilio_id, calle, num_exterior, num_interior,
        colonia_id, estado_id, municipio_id, codigo_postal,
        notas, es_predeterminada, fecha_inicio, fecha_fin
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
      RETURNING *
    `;

    const result = await db.query(query, [
      data.propietario_id,
      data.tipo_domicilio_id,
      data.calle || null,
      data.num_exterior || null,
      data.num_interior || null,
      data.colonia_id || null,
      data.estado_id || null,
      data.municipio_id || null,
      cpNormalizado,
      data.notas || null,
      data.es_predeterminada || false,
      data.fecha_inicio || new Date(),
      data.fecha_fin || null,
    ]);

    return result.rows[0];
  }

  async update(direccionId: number, propietarioId: number, data: Partial<Direccion>): Promise<Direccion | null> {
    // Normalizar código postal si está presente (remover leading zeros)
    if (data.codigo_postal) {
      data.codigo_postal = parseInt(data.codigo_postal, 10).toString();
    }
    
    const updatable = [
      'tipo_domicilio_id', 'calle', 'num_exterior', 'num_interior',
      'colonia_id', 'estado_id', 'municipio_id', 'codigo_postal',
      'notas', 'es_predeterminada', 'fecha_inicio', 'fecha_fin'
    ];

    const sets: string[] = [];
    const values: any[] = [];
    let idx = 1;

    for (const field of updatable) {
      if (data[field as keyof Direccion] !== undefined) {
        sets.push(`${field} = $${idx++}`);
        values.push(data[field as keyof Direccion]);
      }
    }

    if (sets.length === 0) {
      return null;
    }

    values.push(direccionId, propietarioId);
    const query = `
      UPDATE direcciones_propietarios 
      SET ${sets.join(', ')} 
      WHERE direccion_id = $${idx++} AND propietario_id = $${idx}
      RETURNING *
    `;

    const result = await db.query(query, values);
    return result.rows[0] || null;
  }

  async delete(direccionId: number, propietarioId: number): Promise<boolean> {
    const query = `
      DELETE FROM direcciones_propietarios 
      WHERE direccion_id = $1 AND propietario_id = $2
      RETURNING *
    `;
    const result = await db.query(query, [direccionId, propietarioId]);
    return (result.rowCount || 0) > 0;
  }
}

export const direccionRepository = new DireccionRepository();
