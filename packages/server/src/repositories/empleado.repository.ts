import { db } from '../config/database';

export interface Empleado {
  empleado_id: number;
  nombre: string;
  especialidad: string | null;
}

export class EmpleadoRepository {
  // Obtener todos los empleados
  async findAll(): Promise<Empleado[]> {
    const query = `
      SELECT * FROM empleados 
      ORDER BY nombre
    `;
    const result = await db.query(query);
    return result.rows as Empleado[];
  }

  // Obtener empleado por ID
  async findById(id: number): Promise<Empleado | null> {
    const query = `SELECT * FROM empleados WHERE empleado_id = $1`;
    const result = await db.query(query, [id]);
    return result.rows[0] as Empleado || null;
  }

  // Crear empleado
  async create(data: Partial<Empleado>): Promise<Empleado> {
    const query = `
      INSERT INTO empleados 
        (nombre, especialidad)
      VALUES ($1, $2)
      RETURNING *
    `;
    const result = await db.query(query, [
      data.nombre,
      data.especialidad
    ]);
    return result.rows[0] as Empleado;
  }

  // Actualizar empleado
  async update(id: number, data: Partial<Empleado>): Promise<Empleado> {
    const fields = Object.keys(data).filter(k => k !== 'empleado_id');
    const sets = fields.map((f, i) => `${f} = $${i + 1}`);
    const values = fields.map(f => data[f as keyof Empleado]);
    values.push(id);

    const query = `
      UPDATE empleados 
      SET ${sets.join(', ')}
      WHERE empleado_id = $${values.length}
      RETURNING *
    `;
    const result = await db.query(query, values);
    return result.rows[0] as Empleado;
  }

  // Eliminar empleado
  async delete(id: number): Promise<boolean> {
    const query = `DELETE FROM empleados WHERE empleado_id = $1`;
    const result = await db.query(query, [id]);
    return (result.rowCount || 0) > 0;
  }

  // Buscar empleados por especialidad
  async findByEspecialidad(especialidad: string): Promise<Empleado[]> {
    const query = `
      SELECT * FROM empleados 
      WHERE especialidad ILIKE $1
      ORDER BY nombre
    `;
    const result = await db.query(query, [`%${especialidad}%`]);
    return result.rows as Empleado[];
  }

  // Obtener citas de un empleado
  async getCitasByEmpleado(empleadoId: number): Promise<any[]> {
    const query = `
      SELECT 
        cs.*,
        r.fecha_inicio,
        r.fecha_fin,
        m.nombre as mascota_nombre,
        s.nombre as servicio_nombre
      FROM citas_servicios cs
      INNER JOIN reservaciones r ON cs.reservacion_id = r.reservacion_id
      INNER JOIN mascotas m ON r.mascota_id = m.mascota_id
      LEFT JOIN servicios s ON cs.servicio_id = s.servicio_id
      WHERE cs.empleado_id = $1
      ORDER BY cs.fecha_hora_inicio DESC
    `;
    const result = await db.query(query, [empleadoId]);
    return result.rows;
  }
}

export const empleadoRepository = new EmpleadoRepository();
