import { 
  citaServicioRepository, 
  CitaServicio 
} from '../repositories/cita-servicio.repository';
import { reservacionRepository } from '../repositories/reservacion.repository';
import { JwtPayload } from '../utils/jwt.util';

export class CitaServicioService {
  // Obtener todas las citas de un propietario
  async getAllByOwner(user: JwtPayload) {
    return await citaServicioRepository.findAllByOwner(user);
  }

  // Obtener citas por reservación
  async getByReservacion(reservacionId: number, propietarioId: number, rolId?: number) {
    // Admins pueden ver citas de cualquier reservación
    const isAdmin = rolId === 2;
    
    // Verificar que la reservación pertenece al propietario (o es admin)
    const reservacion = await reservacionRepository.findById(reservacionId);
    if (!reservacion) {
      throw new Error('Reservación no encontrada');
    }
    
    if (!isAdmin && reservacion.propietario_id !== propietarioId) {
      throw new Error('No autorizado');
    }

    return await citaServicioRepository.findByReservacion(reservacionId);
  }

  // Obtener cita por ID
  async getById(id: number, propietarioId: number, rolId?: number) {
    const cita = await citaServicioRepository.findById(id);
    if (!cita) {
      throw new Error('Cita no encontrada');
    }
    
    // Admins pueden ver cualquier cita
    const isAdmin = rolId === 2;
    
    // Verificar que la mascota pertenece al propietario (o es admin)
    if (!isAdmin && cita.propietario_id !== propietarioId) {
      throw new Error('No autorizado');
    }
    
    return cita;
  }

  // Crear cita de servicio
  async create(data: Partial<CitaServicio>, propietarioId: number, rolId?: number) {
    // Admins (rol_id: 2) pueden crear citas en cualquier reservación
    const isAdmin = rolId === 2;
    
    // Verificar que la reservación pertenece al propietario (o es admin)
    const reservacion = await reservacionRepository.findById(data.reservacion_id!);
    if (!reservacion) {
      throw new Error('Reservación no encontrada');
    }
    
    if (!isAdmin && reservacion.propietario_id !== propietarioId) {
      throw new Error('No autorizado para crear cita en esta reservación');
    }

    // Validar que fecha_hora_fin sea posterior a fecha_hora_inicio
    if (data.fecha_hora_fin! <= data.fecha_hora_inicio!) {
      throw new Error('La fecha/hora de fin debe ser posterior a la fecha/hora de inicio');
    }

    // Si se asigna empleado, verificar disponibilidad
    if (data.empleado_id) {
      const isAvailable = await citaServicioRepository.checkEmpleadoAvailability(
        data.empleado_id,
        data.fecha_hora_inicio!,
        data.fecha_hora_fin!
      );

      if (!isAvailable) {
        throw new Error('El empleado no está disponible en el horario seleccionado');
      }
    }

    return await citaServicioRepository.create(data);
  }

  // Actualizar cita de servicio
  async update(id: number, data: Partial<CitaServicio>, propietarioId: number, rolId?: number) {
    // Verificar propiedad
    await this.getById(id, propietarioId, rolId);

    // Validar fechas si se actualizan
    if (data.fecha_hora_inicio && data.fecha_hora_fin) {
      if (data.fecha_hora_fin <= data.fecha_hora_inicio) {
        throw new Error('La fecha/hora de fin debe ser posterior a la fecha/hora de inicio');
      }
    }

    // Si se cambia empleado o fechas, verificar disponibilidad
    if (data.empleado_id || data.fecha_hora_inicio || data.fecha_hora_fin) {
      const cita = await citaServicioRepository.findById(id);
      
      const empleadoId = data.empleado_id || cita!.empleado_id;
      const fechaInicio = data.fecha_hora_inicio || cita!.fecha_hora_inicio;
      const fechaFin = data.fecha_hora_fin || cita!.fecha_hora_fin;

      if (empleadoId) {
        const isAvailable = await citaServicioRepository.checkEmpleadoAvailability(
          empleadoId,
          fechaInicio,
          fechaFin,
          id
        );

        if (!isAvailable) {
          throw new Error('El empleado no está disponible en el horario seleccionado');
        }
      }
    }

    return await citaServicioRepository.update(id, data);
  }

  // Eliminar cita de servicio
  async delete(id: number, propietarioId: number, rolId?: number) {
    // Verificar propiedad
    await this.getById(id, propietarioId, rolId);
    return await citaServicioRepository.delete(id);
  }

  // Obtener citas por empleado
  async getByEmpleado(empleadoId: number) {
    return await citaServicioRepository.findByEmpleado(empleadoId);
  }

  // Obtener citas por rango de fechas
  async getByDateRange(fechaInicio: string, fechaFin: string) {
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);

    if (fin <= inicio) {
      throw new Error('La fecha de fin debe ser posterior a la fecha de inicio');
    }

    return await citaServicioRepository.findByDateRange(inicio, fin);
  }
}

export const citaServicioService = new CitaServicioService();
