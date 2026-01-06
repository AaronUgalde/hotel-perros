// src/services/alergia.service.ts
import { 
  alergiaRepository, 
  CreateMascotaAlergiaDTO 
} from '../repositories/alergia.repository';

export class AlergiaService {
  /**
   * Obtener todas las alergias de una mascota del propietario
   */
  async getAllByPet(mascotaId: number, propietarioId: number) {
    const isOwner = await alergiaRepository.verifyPetOwnership(mascotaId, propietarioId);
    
    if (!isOwner) {
      throw new Error('Mascota no encontrada o no pertenece al propietario');
    }

    return await alergiaRepository.findAllByPet(mascotaId);
  }

  /**
   * Agregar alergia a mascota
   */
  async create(data: CreateMascotaAlergiaDTO, propietarioId: number) {
    const isOwner = await alergiaRepository.verifyPetOwnership(data.mascota_id, propietarioId);
    
    if (!isOwner) {
      throw new Error('Mascota no encontrada o no pertenece al propietario');
    }

    return await alergiaRepository.create(data);
  }

  /**
   * Eliminar alergia de mascota
   */
  async delete(mascotaId: number, alergiaId: number, propietarioId: number) {
    const isOwner = await alergiaRepository.verifyPetOwnership(mascotaId, propietarioId);
    
    if (!isOwner) {
      throw new Error('Mascota no encontrada o no pertenece al propietario');
    }

    const deleted = await alergiaRepository.delete(mascotaId, alergiaId);
    
    if (!deleted) {
      throw new Error('Alergia no encontrada');
    }

    return true;
  }

  /**
   * Obtener catálogo de alergias
   */
  async getAllAlergias() {
    return await alergiaRepository.getAllAlergias();
  }
}

export const alergiaService = new AlergiaService();
