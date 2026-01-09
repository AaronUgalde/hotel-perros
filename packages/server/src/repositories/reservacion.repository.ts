import { db } from '../config/database';

export interface Reservacion {
  reservacion_id: number;
  mascota_id: number;
  habitacion_id: number;
  fecha_reservacion: Date;
  fecha_inicio: Date;
  fecha_fin: Date;
  estado_id: number;
  monto_total_hospedaje: number | null;
  notas_especiales: string | null;
}

export interface ReservacionDetalle extends Reservacion {
  mascota_nombre?: string;
  habitacion_nombre?: string;
  estado_nombre?: string;
  propietario_id?: number;
  propietario_nombre?: string;
  propietario_email?: string;
  servicios?: Array<{
    reservacion_servicio_id: number;
    servicio_id: number;
    cantidad: number;
    precio_al_momento: number;
    servicio_nombre?: string;
    servicio_descripcion?: string;
  }>;
}

export interface ReservacionServicio {
  reservacion_servicio_id: number;
  reservacion_id: number;
  servicio_id: number;
  cantidad: number;
  precio_al_momento: number;
}

export class ReservacionRepository {
  // Obtener TODAS las reservaciones (solo para admin)
  async findAll(): Promise<ReservacionDetalle[]> {
    const query = `
      SELECT 
        r.*,
        m.nombre as mascota_nombre,
        h.nombre_numero as habitacion_nombre,
        er.nombre as estado_nombre,
        m.propietario_id,
        p.nombre as propietario_nombre,
        p.correo_electronico as propietario_email
      FROM reservaciones r
      INNER JOIN mascotas m ON r.mascota_id = m.mascota_id
      INNER JOIN propietarios p ON m.propietario_id = p.propietario_id
      LEFT JOIN habitaciones h ON r.habitacion_id = h.habitacion_id
      LEFT JOIN estados_reservacion er ON r.estado_id = er.estado_id
      ORDER BY r.fecha_reservacion DESC
    `;
    const result = await db.query(query);
    return result.rows as ReservacionDetalle[];
  }

  // Obtener todas las reservaciones de un propietario
  async findAllByOwner(propietarioId: number): Promise<ReservacionDetalle[]> {
    const query = `
      SELECT 
        r.*,
        m.nombre as mascota_nombre,
        h.nombre_numero as habitacion_nombre,
        er.nombre as estado_nombre,
        m.propietario_id
      FROM reservaciones r
      INNER JOIN mascotas m ON r.mascota_id = m.mascota_id
      LEFT JOIN habitaciones h ON r.habitacion_id = h.habitacion_id
      LEFT JOIN estados_reservacion er ON r.estado_id = er.estado_id
      WHERE m.propietario_id = $1
      ORDER BY r.fecha_reservacion DESC
    `;
    const result = await db.query(query, [propietarioId]);
    return result.rows as ReservacionDetalle[];
  }

  // Obtener reservación por ID
  async findById(id: number): Promise<ReservacionDetalle | null> {
    const query = `
      SELECT 
        r.*,
        m.nombre as mascota_nombre,
        h.nombre_numero as habitacion_nombre,
        er.nombre as estado_nombre,
        m.propietario_id
      FROM reservaciones r
      INNER JOIN mascotas m ON r.mascota_id = m.mascota_id
      LEFT JOIN habitaciones h ON r.habitacion_id = h.habitacion_id
      LEFT JOIN estados_reservacion er ON r.estado_id = er.estado_id
      WHERE r.reservacion_id = $1
    `;
    const result = await db.query(query, [id]);
    const reservacion = result.rows[0] as ReservacionDetalle;
    
    if (!reservacion) return null;
    
    // Cargar servicios de la reservación
    const serviciosQuery = `
      SELECT 
        rs.*,
        s.nombre as servicio_nombre,
        s.descripcion as servicio_descripcion
      FROM reservaciones_servicios rs
      INNER JOIN servicios s ON rs.servicio_id = s.servicio_id
      WHERE rs.reservacion_id = $1
    `;
    const serviciosResult = await db.query(serviciosQuery, [id]);
    reservacion.servicios = serviciosResult.rows;
    
    return reservacion;
  }

  // Crear reservación
  async create(data: Partial<Reservacion>): Promise<Reservacion> {
    const query = `
      INSERT INTO reservaciones 
        (mascota_id, habitacion_id, fecha_inicio, fecha_fin, estado_id, monto_total_hospedaje, notas_especiales)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    const result = await db.query(query, [
      data.mascota_id,
      data.habitacion_id,
      data.fecha_inicio,
      data.fecha_fin,
      data.estado_id || 1,
      data.monto_total_hospedaje,
      data.notas_especiales
    ]);
    return result.rows[0] as Reservacion;
  }

  // Actualizar reservación
  async update(id: number, data: Partial<Reservacion>): Promise<Reservacion> {
    const fields = Object.keys(data).filter(k => k !== 'reservacion_id' && k !== 'fecha_reservacion');
    const sets = fields.map((f, i) => `${f} = $${i + 1}`);
    const values = fields.map(f => data[f as keyof Reservacion]);
    values.push(id);

    const query = `
      UPDATE reservaciones 
      SET ${sets.join(', ')}
      WHERE reservacion_id = $${values.length}
      RETURNING *
    `;
    const result = await db.query(query, values);
    return result.rows[0] as Reservacion;
  }

  // Eliminar reservación
  async delete(id: number): Promise<boolean> {
    const query = `DELETE FROM reservaciones WHERE reservacion_id = $1`;
    const result = await db.query(query, [id]);
    return (result.rowCount || 0) > 0;
  }

  // Verificar disponibilidad de habitación
  async checkRoomAvailability(
    habitacionId: number, 
    fechaInicio: Date, 
    fechaFin: Date, 
    excludeReservacionId?: number
  ): Promise<boolean> {
    let query = `
      SELECT COUNT(*) as count
      FROM reservaciones
      WHERE habitacion_id = $1
        AND estado_id != 3  -- Excluir canceladas
        AND (
          (fecha_inicio <= $2 AND fecha_fin >= $2) OR
          (fecha_inicio <= $3 AND fecha_fin >= $3) OR
          (fecha_inicio >= $2 AND fecha_fin <= $3)
        )
    `;
    const params: any[] = [habitacionId, fechaInicio, fechaFin];

    if (excludeReservacionId) {
      query += ` AND reservacion_id != $4`;
      params.push(excludeReservacionId);
    }

    const result = await db.query(query, params);
    return parseInt(result.rows[0].count) === 0;
  }

  // Servicios de reservación
  async addServicioToReservacion(data: Partial<ReservacionServicio>): Promise<ReservacionServicio> {
    const query = `
      INSERT INTO reservaciones_servicios 
        (reservacion_id, servicio_id, cantidad, precio_al_momento)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const result = await db.query(query, [
      data.reservacion_id,
      data.servicio_id,
      data.cantidad || 1,
      data.precio_al_momento
    ]);
    return result.rows[0] as ReservacionServicio;
  }

  async getServiciosByReservacion(reservacionId: number): Promise<any[]> {
    const query = `
      SELECT 
        rs.*,
        s.nombre as servicio_nombre,
        s.descripcion as servicio_descripcion
      FROM reservaciones_servicios rs
      INNER JOIN servicios s ON rs.servicio_id = s.servicio_id
      WHERE rs.reservacion_id = $1
    `;
    const result = await db.query(query, [reservacionId]);
    return result.rows;
  }

  async removeServicioFromReservacion(reservacionServicioId: number): Promise<boolean> {
    const query = `DELETE FROM reservaciones_servicios WHERE reservacion_servicio_id = $1`;
    const result = await db.query(query, [reservacionServicioId]);
    return (result.rowCount || 0) > 0;
  }

  // Catálogos
  async getEstadosReservacion() {
    const result = await db.query(`SELECT * FROM estados_reservacion ORDER BY nombre`);
    return result.rows;
  }

  async getHabitaciones() {
    const query = `
      SELECT h.*, e.nombre as especie_nombre
      FROM habitaciones h
      LEFT JOIN especies e ON h.especie_id = e.especie_id
      WHERE h.activa = true
      ORDER BY h.nombre_numero
    `;
    const result = await db.query(query);
    return result.rows;
  }

  async getServicios() {
    const result = await db.query(`SELECT * FROM servicios ORDER BY nombre`);
    return result.rows;
  }
}

export const reservacionRepository = new ReservacionRepository();
