// src/services/habitacion.service.ts
import { 
  habitacionRepository, 
  CreateHabitacionDTO 
} from '../repositories/habitacion.repository';

export class HabitacionService {
  /**
   * Obtener todas las habitaciones
   */
  async getAll(includeInactive: boolean = false) {
    return await habitacionRepository.findAll(includeInactive);
  }

  /**
   * Obtener una habitación específica por ID
   */
  async getById(habitacionId: number) {
    const habitacion = await habitacionRepository.findById(habitacionId);
    
    if (!habitacion) {
      throw new Error('Habitación no encontrada');
    }

    return habitacion;
  }

  /**
   * Obtener habitaciones por especie
   */
  async getByEspecie(especieId: number) {
    return await habitacionRepository.findByEspecie(especieId);
  }

  /**
   * Crear nueva habitación
   */
  async create(data: CreateHabitacionDTO) {
    // Validar que no exista otra habitación con el mismo nombre
    const exists = await habitacionRepository.existsByNombre(data.nombre_numero);
    if (exists) {
      throw new Error('Ya existe una habitación con ese nombre/número');
    }

    return await habitacionRepository.create(data);
  }

  /**
   * Actualizar habitación existente
   */
  async update(
    habitacionId: number,
    data: Partial<CreateHabitacionDTO>
  ) {
    // Verificar que la habitación existe
    const exists = await habitacionRepository.findById(habitacionId);
    if (!exists) {
      throw new Error('Habitación no encontrada');
    }

    // Si se está cambiando el nombre, validar que no exista otro con ese nombre
    if (data.nombre_numero) {
      const nombreExists = await habitacionRepository.existsByNombre(
        data.nombre_numero, 
        habitacionId
      );
      if (nombreExists) {
        throw new Error('Ya existe otra habitación con ese nombre/número');
      }
    }

    const updated = await habitacionRepository.update(habitacionId, data);
    
    if (!updated) {
      throw new Error('Habitación no encontrada o nada que actualizar');
    }

    return updated;
  }

  /**
   * Desactivar habitación (soft delete)
   */
  async softDelete(habitacionId: number) {
    // Verificar que la habitación existe
    const exists = await habitacionRepository.findById(habitacionId);
    if (!exists) {
      throw new Error('Habitación no encontrada');
    }

    const deleted = await habitacionRepository.softDelete(habitacionId);
    
    if (!deleted) {
      throw new Error('Habitación no encontrada');
    }

    return true;
  }

  /**
   * Eliminar habitación permanentemente
   */
  async delete(habitacionId: number) {
    // Verificar que la habitación existe
    const exists = await habitacionRepository.findById(habitacionId);
    if (!exists) {
      throw new Error('Habitación no encontrada');
    }

    // Verificar si está en uso en reservaciones
    const inUse = await habitacionRepository.isInUse(habitacionId);
    if (inUse) {
      throw new Error('No se puede eliminar la habitación porque tiene reservaciones asociadas');
    }

    const deleted = await habitacionRepository.delete(habitacionId);
    
    if (!deleted) {
      throw new Error('Habitación no encontrada');
    }

    return true;
  }
}

export const habitacionService = new HabitacionService();
