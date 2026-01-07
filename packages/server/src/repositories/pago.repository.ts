import { db } from '../config/database';

export interface Pago {
  pago_id: number;
  reservacion_id: number;
  monto: number;
  metodo_pago: string;
  estado_pago: string;
  fecha_pago: Date;
}

export interface PagoDetalle extends Pago {
  reservacion_mascota_nombre?: string;
  reservacion_habitacion_nombre?: string;
  propietario_id?: number;
}

export class PagoRepository {
  // Obtener todos los pagos de un propietario
  async findAllByOwner(propietarioId: number): Promise<PagoDetalle[]> {
    const query = `
      SELECT 
        p.*,
        m.nombre as reservacion_mascota_nombre,
        h.nombre_numero as reservacion_habitacion_nombre,
        m.propietario_id
      FROM pagos p
      INNER JOIN reservaciones r ON p.reservacion_id = r.reservacion_id
      INNER JOIN mascotas m ON r.mascota_id = m.mascota_id
      LEFT JOIN habitaciones h ON r.habitacion_id = h.habitacion_id
      WHERE m.propietario_id = $1
      ORDER BY p.fecha_pago DESC
    `;
    const result = await db.query(query, [propietarioId]);
    return result.rows as PagoDetalle[];
  }

  // Obtener pago por ID
  async findById(id: number): Promise<PagoDetalle | null> {
    const query = `
      SELECT 
        p.*,
        m.nombre as reservacion_mascota_nombre,
        h.nombre_numero as reservacion_habitacion_nombre,
        m.propietario_id
      FROM pagos p
      INNER JOIN reservaciones r ON p.reservacion_id = r.reservacion_id
      INNER JOIN mascotas m ON r.mascota_id = m.mascota_id
      LEFT JOIN habitaciones h ON r.habitacion_id = h.habitacion_id
      WHERE p.pago_id = $1
    `;
    const result = await db.query(query, [id]);
    return result.rows[0] as PagoDetalle || null;
  }

  // Obtener pagos por reservación
  async findByReservacion(reservacionId: number): Promise<Pago[]> {
    const query = `
      SELECT * FROM pagos 
      WHERE reservacion_id = $1 
      ORDER BY fecha_pago DESC
    `;
    const result = await db.query(query, [reservacionId]);
    return result.rows as Pago[];
  }

  // Crear pago
  async create(data: Partial<Pago>): Promise<Pago> {
    const query = `
      INSERT INTO pagos 
        (reservacion_id, monto, metodo_pago, estado_pago)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const result = await db.query(query, [
      data.reservacion_id,
      data.monto,
      data.metodo_pago,
      data.estado_pago || 'pendiente'
    ]);
    return result.rows[0] as Pago;
  }

  // Actualizar pago
  async update(id: number, data: Partial<Pago>): Promise<Pago> {
    const fields = Object.keys(data).filter(k => k !== 'pago_id' && k !== 'fecha_pago');
    const sets = fields.map((f, i) => `${f} = $${i + 1}`);
    const values = fields.map(f => data[f as keyof Pago]);
    values.push(id);

    const query = `
      UPDATE pagos 
      SET ${sets.join(', ')}
      WHERE pago_id = $${values.length}
      RETURNING *
    `;
    const result = await db.query(query, values);
    return result.rows[0] as Pago;
  }

  // Eliminar pago
  async delete(id: number): Promise<boolean> {
    const query = `DELETE FROM pagos WHERE pago_id = $1`;
    const result = await db.query(query, [id]);
    return (result.rowCount || 0) > 0;
  }

  // Calcular total pagado de una reservación
  async getTotalPagadoByReservacion(reservacionId: number): Promise<number> {
    const query = `
      SELECT COALESCE(SUM(monto), 0) as total
      FROM pagos
      WHERE reservacion_id = $1 
        AND estado_pago IN ('completado', 'aprobado')
    `;
    const result = await db.query(query, [reservacionId]);
    return parseFloat(result.rows[0].total);
  }

  // Verificar si una reservación está completamente pagada
  async isReservacionPagada(reservacionId: number): Promise<boolean> {
    const query = `
      SELECT 
        r.monto_total_hospedaje,
        COALESCE(SUM(p.monto), 0) as total_pagado
      FROM reservaciones r
      LEFT JOIN pagos p ON r.reservacion_id = p.reservacion_id 
        AND p.estado_pago IN ('completado', 'aprobado')
      WHERE r.reservacion_id = $1
      GROUP BY r.monto_total_hospedaje
    `;
    const result = await db.query(query, [reservacionId]);
    if (result.rows.length === 0) return false;
    
    const { monto_total_hospedaje, total_pagado } = result.rows[0];
    return parseFloat(total_pagado) >= parseFloat(monto_total_hospedaje);
  }

  // Obtener métodos de pago disponibles
  async getMetodosPago(): Promise<string[]> {
    return ['efectivo', 'tarjeta_credito', 'tarjeta_debito', 'transferencia', 'paypal'];
  }

  // Obtener estados de pago disponibles
  async getEstadosPago(): Promise<string[]> {
    return ['pendiente', 'procesando', 'completado', 'rechazado', 'cancelado'];
  }
}

export const pagoRepository = new PagoRepository();
