import { pagoRepository, Pago } from '../repositories/pago.repository';
import { reservacionRepository } from '../repositories/reservacion.repository';

export class PagoService {
  // Obtener todos los pagos de un propietario
  async getAllByOwner(propietarioId: number) {
    return await pagoRepository.findAllByOwner(propietarioId);
  }

  // Obtener pago por ID
  async getById(id: number, propietarioId: number) {
    const pago = await pagoRepository.findById(id);
    if (!pago) {
      throw new Error('Pago no encontrado');
    }
    
    // Verificar que el pago pertenece a una reservación del propietario
    if (pago.propietario_id !== propietarioId) {
      throw new Error('No autorizado');
    }
    
    return pago;
  }

  // Obtener pagos por reservación
  async getByReservacion(reservacionId: number, propietarioId: number) {
    // Verificar que la reservación pertenece al propietario
    const reservacion = await reservacionRepository.findById(reservacionId);
    if (!reservacion) {
      throw new Error('Reservación no encontrada');
    }
    if (reservacion.propietario_id !== propietarioId) {
      throw new Error('No autorizado');
    }

    const pagos = await pagoRepository.findByReservacion(reservacionId);
    const totalPagado = await pagoRepository.getTotalPagadoByReservacion(reservacionId);
    const isPagada = await pagoRepository.isReservacionPagada(reservacionId);

    return {
      pagos,
      totalPagado,
      montoTotal: reservacion.monto_total_hospedaje,
      isPagada
    };
  }

  // Crear pago
  async create(data: Partial<Pago>, propietarioId: number) {
    // Verificar que la reservación existe y pertenece al propietario
    const reservacion = await reservacionRepository.findById(data.reservacion_id!);
    if (!reservacion) {
      throw new Error('Reservación no encontrada');
    }
    if (reservacion.propietario_id !== propietarioId) {
      throw new Error('No autorizado para crear pago en esta reservación');
    }

    // Verificar que el monto no exceda el saldo pendiente
    const totalPagado = await pagoRepository.getTotalPagadoByReservacion(data.reservacion_id!);
    const saldoPendiente = (reservacion.monto_total_hospedaje || 0) - totalPagado;

    if (data.monto! > saldoPendiente) {
      throw new Error(
        `El monto del pago ($${data.monto}) excede el saldo pendiente ($${saldoPendiente.toFixed(2)})`
      );
    }

    return await pagoRepository.create(data);
  }

  // Actualizar pago
  async update(id: number, data: Partial<Pago>, propietarioId: number) {
    // Verificar propiedad
    await this.getById(id, propietarioId);

    // Si se cambia el monto, verificar que no exceda el saldo
    if (data.monto) {
      const pago = await pagoRepository.findById(id);
      const reservacion = await reservacionRepository.findById(pago!.reservacion_id);
      
      const totalPagado = await pagoRepository.getTotalPagadoByReservacion(pago!.reservacion_id);
      // Restar el monto del pago actual del total
      const totalSinPagoActual = totalPagado - pago!.monto;
      const saldoPendiente = (reservacion!.monto_total_hospedaje || 0) - totalSinPagoActual;

      if (data.monto > saldoPendiente) {
        throw new Error(
          `El monto del pago ($${data.monto}) excede el saldo pendiente ($${saldoPendiente.toFixed(2)})`
        );
      }
    }

    return await pagoRepository.update(id, data);
  }

  // Eliminar pago
  async delete(id: number, propietarioId: number) {
    // Verificar propiedad
    await this.getById(id, propietarioId);
    return await pagoRepository.delete(id);
  }

  // Catálogos
  async getMetodosPago() {
    return await pagoRepository.getMetodosPago();
  }

  async getEstadosPago() {
    return await pagoRepository.getEstadosPago();
  }
}

export const pagoService = new PagoService();
