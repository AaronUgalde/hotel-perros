import { db } from '../config/database';

export interface CitaServicio {
  cita_id: number;
  reservacion_id: number;
  servicio_id: number;
  empleado_id: number | null;
  fecha_hora_inicio: Date;
  fecha_hora_fin: Date;
  notas: string | null;
}

export interface CitaServicioDetalle extends CitaServicio {
  reservacion_fecha_inicio?: Date;
  reservacion_fecha_fin?: Date;
  mascota_id?: number;
  mascota_nombre?: string;
  servicio_nombre?: string;
  servicio_descripcion?: string;
  empleado_nombre?: string;
  empleado_especialidad?: string;
  propietario_id?: number;
}

export class CitaServicioRepository {
  // Obtener todas las citas de un propietario
  async findAllByOwner(propietarioId: number): Promise<CitaServicioDetalle[]> {
    const query = `
      SELECT 
        cs.*,
        r.fecha_inicio as reservacion_fecha_inicio,
        r.fecha_fin as reservacion_fecha_fin,
        m.mascota_id,
        m.nombre as mascota_nombre,
        s.nombre as servicio_nombre,
        s.descripcion as servicio_descripcion,
        e.nombre as empleado_nombre,
        e.especialidad as empleado_especialidad,
        m.propietario_id
      FROM citas_servicios cs
      INNER JOIN reservaciones r ON cs.reservacion_id = r.reservacion_id
      INNER JOIN mascotas m ON r.mascota_id = m.mascota_id
      LEFT JOIN servicios s ON cs.servicio_id = s.servicio_id
      LEFT JOIN empleados e ON cs.empleado_id = e.empleado_id
      WHERE m.propietario_id = $1
      ORDER BY cs.fecha_hora_inicio DESC
    `;
    const result = await db.query(query, [propietarioId]);
    return result.rows as CitaServicioDetalle[];
  }

  // Obtener citas por reservación
  async findByReservacion(reservacionId: number): Promise<CitaServicioDetalle[]> {
    const query = `
      SELECT 
        cs.*,
        s.nombre as servicio_nombre,
        s.descripcion as servicio_descripcion,
        e.nombre as empleado_nombre,
        e.especialidad as empleado_especialidad
      FROM citas_servicios cs
      LEFT JOIN servicios s ON cs.servicio_id = s.servicio_id
      LEFT JOIN empleados e ON cs.empleado_id = e.empleado_id
      WHERE cs.reservacion_id = $1
      ORDER BY cs.fecha_hora_inicio
    `;
    const result = await db.query(query, [reservacionId]);
    return result.rows as CitaServicioDetalle[];
  }

  // Obtener cita por ID
  async findById(id: number): Promise<CitaServicioDetalle | null> {
    const query = `
      SELECT 
        cs.*,
        r.fecha_inicio as reservacion_fecha_inicio,
        r.fecha_fin as reservacion_fecha_fin,
        m.mascota_id,
        m.nombre as mascota_nombre,
        s.nombre as servicio_nombre,
        s.descripcion as servicio_descripcion,
        e.nombre as empleado_nombre,
        e.especialidad as empleado_especialidad,
        m.propietario_id
      FROM citas_servicios cs
      INNER JOIN reservaciones r ON cs.reservacion_id = r.reservacion_id
      INNER JOIN mascotas m ON r.mascota_id = m.mascota_id
      LEFT JOIN servicios s ON cs.servicio_id = s.servicio_id
      LEFT JOIN empleados e ON cs.empleado_id = e.empleado_id
      WHERE cs.cita_id = $1
    `;
    const result = await db.query(query, [id]);
    return result.rows[0] as CitaServicioDetalle || null;
  }

  // Crear cita de servicio
  async create(data: Partial<CitaServicio>): Promise<CitaServicio> {
    const query = `
      INSERT INTO citas_servicios 
        (reservacion_id, servicio_id, empleado_id, fecha_hora_inicio, fecha_hora_fin, notas)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const result = await db.query(query, [
      data.reservacion_id,
      data.servicio_id,
      data.empleado_id,
      data.fecha_hora_inicio,
      data.fecha_hora_fin,
      data.notas
    ]);
    return result.rows[0] as CitaServicio;
  }

  // Actualizar cita de servicio
  async update(id: number, data: Partial<CitaServicio>): Promise<CitaServicio> {
    const fields = Object.keys(data).filter(k => k !== 'cita_id');
    const sets = fields.map((f, i) => `${f} = $${i + 1}`);
    const values = fields.map(f => data[f as keyof CitaServicio]);
    values.push(id);

    const query = `
      UPDATE citas_servicios 
      SET ${sets.join(', ')}
      WHERE cita_id = $${values.length}
      RETURNING *
    `;
    const result = await db.query(query, values);
    return result.rows[0] as CitaServicio;
  }

  // Eliminar cita de servicio
  async delete(id: number): Promise<boolean> {
    const query = `DELETE FROM citas_servicios WHERE cita_id = $1`;
    const result = await db.query(query, [id]);
    return (result.rowCount || 0) > 0;
  }

  // Verificar disponibilidad de empleado
  async checkEmpleadoAvailability(
    empleadoId: number,
    fechaHoraInicio: Date,
    fechaHoraFin: Date,
    excludeCitaId?: number
  ): Promise<boolean> {
    let query = `
      SELECT COUNT(*) as count
      FROM citas_servicios
      WHERE empleado_id = $1
        AND (
          (fecha_hora_inicio <= $2 AND fecha_hora_fin >= $2) OR
          (fecha_hora_inicio <= $3 AND fecha_hora_fin >= $3) OR
          (fecha_hora_inicio >= $2 AND fecha_hora_fin <= $3)
        )
    `;
    const params: any[] = [empleadoId, fechaHoraInicio, fechaHoraFin];

    if (excludeCitaId) {
      query += ` AND cita_id != $4`;
      params.push(excludeCitaId);
    }

    const result = await db.query(query, params);
    return parseInt(result.rows[0].count) === 0;
  }

  // Obtener citas por empleado
  async findByEmpleado(empleadoId: number): Promise<CitaServicioDetalle[]> {
    const query = `
      SELECT 
        cs.*,
        r.fecha_inicio as reservacion_fecha_inicio,
        r.fecha_fin as reservacion_fecha_fin,
        m.mascota_id,
        m.nombre as mascota_nombre,
        s.nombre as servicio_nombre,
        s.descripcion as servicio_descripcion
      FROM citas_servicios cs
      INNER JOIN reservaciones r ON cs.reservacion_id = r.reservacion_id
      INNER JOIN mascotas m ON r.mascota_id = m.mascota_id
      LEFT JOIN servicios s ON cs.servicio_id = s.servicio_id
      WHERE cs.empleado_id = $1
      ORDER BY cs.fecha_hora_inicio DESC
    `;
    const result = await db.query(query, [empleadoId]);
    return result.rows as CitaServicioDetalle[];
  }

  // Obtener citas por fecha
  async findByDateRange(fechaInicio: Date, fechaFin: Date): Promise<CitaServicioDetalle[]> {
    const query = `
      SELECT 
        cs.*,
        m.nombre as mascota_nombre,
        s.nombre as servicio_nombre,
        e.nombre as empleado_nombre,
        e.especialidad as empleado_especialidad
      FROM citas_servicios cs
      INNER JOIN reservaciones r ON cs.reservacion_id = r.reservacion_id
      INNER JOIN mascotas m ON r.mascota_id = m.mascota_id
      LEFT JOIN servicios s ON cs.servicio_id = s.servicio_id
      LEFT JOIN empleados e ON cs.empleado_id = e.empleado_id
      WHERE cs.fecha_hora_inicio >= $1 AND cs.fecha_hora_inicio <= $2
      ORDER BY cs.fecha_hora_inicio
    `;
    const result = await db.query(query, [fechaInicio, fechaFin]);
    return result.rows as CitaServicioDetalle[];
  }
}

export const citaServicioRepository = new CitaServicioRepository();
