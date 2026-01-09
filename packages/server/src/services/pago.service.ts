import { pagoRepository, Pago } from '../repositories/pago.repository';
import { reservacionRepository } from '../repositories/reservacion.repository';

export class PagoService {
  // Obtener todos los pagos de un propietario
  async getAllByOwner(propietarioId: number) {
    return await pagoRepository.findAllByOwner(propietarioId);
  }

  // Obtener pago por ID
  async getById(id: number, propietarioId: number, rolId?: number) {
    const pago = await pagoRepository.findById(id);
    if (!pago) {
      throw new Error('Pago no encontrado');
    }
    
    // Admins (rol_id: 2) pueden ver todos los pagos
    const isAdmin = rolId === 2;
    
    // Verificar que el pago pertenece a una reservación del propietario (o es admin)
    if (!isAdmin && pago.propietario_id !== propietarioId) {
      throw new Error('No autorizado');
    }
    
    return pago;
  }

  // Obtener pagos por reservación
  async getByReservacion(reservacionId: number, propietarioId: number, rolId?: number) {
    // Verificar que la reservación pertenece al propietario
    const reservacion = await reservacionRepository.findById(reservacionId);
    if (!reservacion) {
      throw new Error('Reservación no encontrada');
    }
    
    // Admins (rol_id: 2) pueden ver todas las reservaciones
    const isAdmin = rolId === 2;
    
    if (!isAdmin && reservacion.propietario_id !== propietarioId) {
      throw new Error('No autorizado');
    }

    const pagos = await pagoRepository.findByReservacion(reservacionId);
    const totalPagado = await pagoRepository.getTotalPagadoByReservacion(reservacionId);
    
    // Calcular el monto total incluyendo servicios
    const montoHospedaje = Number(reservacion.monto_total_hospedaje || 0);
    const montoServicios = reservacion.servicios?.reduce(
      (sum: number, s: any) => sum + (Number(s.cantidad) * Number(s.precio_al_momento)), 
      0
    ) || 0;
    const montoTotal = montoHospedaje + montoServicios;
    
    const isPagada = totalPagado >= montoTotal;

    return {
      pagos,
      totalPagado,
      montoTotal,
      isPagada
    };
  }

  // Crear pago
  async create(data: Partial<Pago>, propietarioId: number, rolId?: number) {
    // Verificar que la reservación existe y pertenece al propietario
    const reservacion = await reservacionRepository.findById(data.reservacion_id!);
    if (!reservacion) {
      throw new Error('Reservación no encontrada');
    }
    
    // Admins (rol_id: 2) pueden crear pagos en cualquier reservación
    const isAdmin = rolId === 2;
    
    if (!isAdmin && reservacion.propietario_id !== propietarioId) {
      throw new Error('No autorizado para crear pago en esta reservación');
    }

    // Calcular el total incluyendo servicios
    const montoHospedaje = Number(reservacion.monto_total_hospedaje || 0);
    const montoServicios = reservacion.servicios?.reduce(
      (sum: number, s: any) => sum + (Number(s.cantidad) * Number(s.precio_al_momento)), 
      0
    ) || 0;
    const montoTotalReservacion = montoHospedaje + montoServicios;

    // Debug: Ver qué datos tiene la reservación
    console.log('=== DEBUG PAGO ===');
    console.log('Hospedaje:', montoHospedaje);
    console.log('Servicios en reservación:', reservacion.servicios);
    console.log('Monto servicios:', montoServicios);
    console.log('Total reservación:', montoTotalReservacion);
    console.log('==================');

    // Verificar que el monto no exceda el saldo pendiente
    const totalPagado = await pagoRepository.getTotalPagadoByReservacion(data.reservacion_id!);
    const saldoPendiente = montoTotalReservacion - totalPagado;

    if (data.monto! > saldoPendiente) {
      throw new Error(
        `El monto del pago ($${data.monto}) excede el saldo pendiente ($${saldoPendiente.toFixed(2)})`
      );
    }

    return await pagoRepository.create(data);
  }

  // Actualizar pago
  async update(id: number, data: Partial<Pago>, propietarioId: number, rolId?: number) {
    // Verificar propiedad
    await this.getById(id, propietarioId, rolId);

    // Si se cambia el monto, verificar que no exceda el saldo
    if (data.monto) {
      const pago = await pagoRepository.findById(id);
      const reservacion = await reservacionRepository.findById(pago!.reservacion_id);
      
      // Calcular el total incluyendo servicios
      const montoHospedaje = Number(reservacion!.monto_total_hospedaje || 0);
      const montoServicios = reservacion!.servicios?.reduce(
        (sum: number, s: any) => sum + (Number(s.cantidad) * Number(s.precio_al_momento)), 
        0
      ) || 0;
      const montoTotalReservacion = montoHospedaje + montoServicios;

      const totalPagado = await pagoRepository.getTotalPagadoByReservacion(pago!.reservacion_id);
      // Restar el monto del pago actual del total
      const totalSinPagoActual = totalPagado - pago!.monto;
      const saldoPendiente = montoTotalReservacion - totalSinPagoActual;

      if (data.monto > saldoPendiente) {
        throw new Error(
          `El monto del pago ($${data.monto}) excede el saldo pendiente ($${saldoPendiente.toFixed(2)})`
        );
      }
    }

    return await pagoRepository.update(id, data);
  }

  // Eliminar pago
  async delete(id: number, propietarioId: number, rolId?: number) {
    // Verificar propiedad
    await this.getById(id, propietarioId, rolId);
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
