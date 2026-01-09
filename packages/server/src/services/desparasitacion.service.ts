// src/services/desparasitacion.service.ts
import { 
  desparasitacionRepository, 
  CreateDesparasitacionDTO 
} from '../repositories/desparasitacion.repository';

export class DesparasitacionService {
  /**
   * Obtener todas las desparasitaciones de una mascota del propietario
   */
  async getAllByPet(mascotaId: number, propietarioId: number, rolId?: number) {
    const isAdmin = rolId === 2;
    
    if (!isAdmin) {
      const isOwner = await desparasitacionRepository.verifyPetOwnership(
        mascotaId, 
        propietarioId
      );
      
      if (!isOwner) {
        throw new Error('Mascota no encontrada o no pertenece al propietario');
      }
    }

    return await desparasitacionRepository.findAllByPet(mascotaId);
  }

  /**
   * Obtener una desparasitación específica
   */
  async getById(
    desparasitacionId: number, 
    mascotaId: number, 
    propietarioId: number
  ) {
    const isOwner = await desparasitacionRepository.verifyPetOwnership(
      mascotaId, 
      propietarioId
    );
    
    if (!isOwner) {
      throw new Error('Mascota no encontrada o no pertenece al propietario');
    }

    const desparasitacion = await desparasitacionRepository.findById(
      desparasitacionId, 
      mascotaId
    );
    
    if (!desparasitacion) {
      throw new Error('Desparasitación no encontrada');
    }

    return desparasitacion;
  }

  /**
   * Registrar nueva desparasitación
   */
  async create(data: CreateDesparasitacionDTO, propietarioId: number) {
    const isOwner = await desparasitacionRepository.verifyPetOwnership(
      data.mascota_id, 
      propietarioId
    );
    
    if (!isOwner) {
      throw new Error('Mascota no encontrada o no pertenece al propietario');
    }

    return await desparasitacionRepository.create(data);
  }

  /**
   * Actualizar desparasitación
   */
  async update(
    desparasitacionId: number,
    mascotaId: number,
    data: Partial<CreateDesparasitacionDTO>,
    propietarioId: number
  ) {
    const isOwner = await desparasitacionRepository.verifyPetOwnership(
      mascotaId, 
      propietarioId
    );
    
    if (!isOwner) {
      throw new Error('Mascota no encontrada o no pertenece al propietario');
    }

    const updated = await desparasitacionRepository.update(
      desparasitacionId, 
      mascotaId, 
      data
    );
    
    if (!updated) {
      throw new Error('Desparasitación no encontrada o nada que actualizar');
    }

    return updated;
  }

  /**
   * Eliminar desparasitación
   */
  async delete(
    desparasitacionId: number, 
    mascotaId: number, 
    propietarioId: number
  ) {
    const isOwner = await desparasitacionRepository.verifyPetOwnership(
      mascotaId, 
      propietarioId
    );
    
    if (!isOwner) {
      throw new Error('Mascota no encontrada o no pertenece al propietario');
    }

    const deleted = await desparasitacionRepository.delete(
      desparasitacionId, 
      mascotaId
    );
    
    if (!deleted) {
      throw new Error('Desparasitación no encontrada');
    }

    return true;
  }
}

export const desparasitacionService = new DesparasitacionService();
