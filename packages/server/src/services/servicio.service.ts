// src/services/servicio.service.ts
import { 
  servicioRepository, 
  CreateServicioDTO 
} from '../repositories/servicio.repository';

export class ServicioService {
  /**
   * Obtener todos los servicios disponibles
   */
  async getAll() {
    return await servicioRepository.findAll();
  }

  /**
   * Obtener un servicio específico por ID
   */
  async getById(servicioId: number) {
    const servicio = await servicioRepository.findById(servicioId);
    
    if (!servicio) {
      throw new Error('Servicio no encontrado');
    }

    return servicio;
  }

  /**
   * Crear nuevo servicio
   */
  async create(data: CreateServicioDTO) {
    return await servicioRepository.create(data);
  }

  /**
   * Actualizar servicio existente
   */
  async update(
    servicioId: number,
    data: Partial<CreateServicioDTO>
  ) {
    // Verificar que el servicio existe
    const exists = await servicioRepository.findById(servicioId);
    if (!exists) {
      throw new Error('Servicio no encontrado');
    }

    const updated = await servicioRepository.update(servicioId, data);
    
    if (!updated) {
      throw new Error('Servicio no encontrado o nada que actualizar');
    }

    return updated;
  }

  /**
   * Eliminar servicio
   */
  async delete(servicioId: number) {
    // Verificar que el servicio existe
    const exists = await servicioRepository.findById(servicioId);
    if (!exists) {
      throw new Error('Servicio no encontrado');
    }

    // Verificar si está en uso en reservaciones
    const inUse = await servicioRepository.isInUse(servicioId);
    if (inUse) {
      throw new Error('No se puede eliminar el servicio porque está siendo usado en reservaciones');
    }

    const deleted = await servicioRepository.delete(servicioId);
    
    if (!deleted) {
      throw new Error('Servicio no encontrado');
    }

    return true;
  }
}

export const servicioService = new ServicioService();
