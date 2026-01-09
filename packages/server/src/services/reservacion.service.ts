import { 
  reservacionRepository, 
  Reservacion, 
  ReservacionServicio 
} from '../repositories/reservacion.repository';
import { petRepository } from '../repositories/pet.repository';

export class ReservacionService {
  // Obtener TODAS las reservaciones (solo para admin)
  async getAll() {
    return await reservacionRepository.findAll();
  }

  // Obtener todas las reservaciones de un propietario
  async getAllByOwner(propietarioId: number) {
    return await reservacionRepository.findAllByOwner(propietarioId);
  }

  // Obtener reservación por ID
  async getById(id: number, propietarioId: number, rolId?: number) {
    const reservacion = await reservacionRepository.findById(id);
    if (!reservacion) {
      throw new Error('Reservación no encontrada');
    }
    
    // Admins (rol_id: 2) pueden ver todas las reservaciones
    const isAdmin = rolId === 2;
    
    // Verificar que la mascota pertenece al propietario (o es admin)
    if (!isAdmin && reservacion.propietario_id !== propietarioId) {
      throw new Error('No autorizado');
    }
    
    // Obtener servicios de la reservación
    const servicios = await reservacionRepository.getServiciosByReservacion(id);
    
    return {
      ...reservacion,
      servicios
    };
  }

  // DEPRECADO: Usar getById con rolId en su lugar
  // Obtener reservación por ID (admin puede ver cualquiera)
  async getByIdAdmin(id: number) {
    const reservacion = await reservacionRepository.findById(id);
    if (!reservacion) {
      throw new Error('Reservación no encontrada');
    }
    
    // Obtener servicios de la reservación
    const servicios = await reservacionRepository.getServiciosByReservacion(id);
    
    return {
      ...reservacion,
      servicios
    };
  }

  // Crear reservación
  async create(data: Partial<Reservacion>, propietarioId: number) {
    // Verificar que la mascota pertenece al propietario
    const pet = await petRepository.findById(data.mascota_id!);
    if (!pet || pet.propietario_id !== propietarioId) {
      throw new Error('No autorizado para crear reservación con esta mascota');
    }

    // Verificar disponibilidad de habitación
    const isAvailable = await reservacionRepository.checkRoomAvailability(
      data.habitacion_id!,
      data.fecha_inicio!,
      data.fecha_fin!
    );

    if (!isAvailable) {
      throw new Error('La habitación no está disponible para las fechas seleccionadas');
    }

    return await reservacionRepository.create(data);
  }

  // Actualizar reservación
  async update(id: number, data: Partial<Reservacion>, propietarioId: number, rolId?: number) {
    // Verificar propiedad
    await this.getById(id, propietarioId, rolId);

    // Si se cambia habitación o fechas, verificar disponibilidad
    if (data.habitacion_id || data.fecha_inicio || data.fecha_fin) {
      const reservacion = await reservacionRepository.findById(id);
      
      const habitacionId = data.habitacion_id || reservacion!.habitacion_id;
      const fechaInicio = data.fecha_inicio || reservacion!.fecha_inicio;
      const fechaFin = data.fecha_fin || reservacion!.fecha_fin;

      const isAvailable = await reservacionRepository.checkRoomAvailability(
        habitacionId,
        fechaInicio,
        fechaFin,
        id
      );

      if (!isAvailable) {
        throw new Error('La habitación no está disponible para las fechas seleccionadas');
      }
    }

    return await reservacionRepository.update(id, data);
  }

  // Eliminar reservación
  async delete(id: number, propietarioId: number, rolId?: number) {
    // Verificar propiedad
    await this.getById(id, propietarioId, rolId);
    return await reservacionRepository.delete(id);
  }

  // Gestión de servicios
  async addServicio(reservacionId: number, data: Partial<ReservacionServicio>, propietarioId: number, rolId?: number) {
    // Verificar que la reservación pertenece al propietario
    await this.getById(reservacionId, propietarioId, rolId);

    return await reservacionRepository.addServicioToReservacion({
      ...data,
      reservacion_id: reservacionId
    });
  }

  async removeServicio(reservacionServicioId: number, propietarioId: number, rolId?: number) {
    // Obtener el servicio para verificar la reservación
    const servicios = await reservacionRepository.getServiciosByReservacion(0);
    const servicio = servicios.find(s => s.reservacion_servicio_id === reservacionServicioId);
    
    if (servicio) {
      await this.getById(servicio.reservacion_id, propietarioId, rolId);
    }

    return await reservacionRepository.removeServicioFromReservacion(reservacionServicioId);
  }

  // Catálogos
  async getEstadosReservacion() {
    return await reservacionRepository.getEstadosReservacion();
  }

  async getHabitaciones() {
    return await reservacionRepository.getHabitaciones();
  }

  async getServicios() {
    return await reservacionRepository.getServicios();
  }
}

export const reservacionService = new ReservacionService();
