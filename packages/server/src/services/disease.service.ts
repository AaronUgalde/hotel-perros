// src/services/disease.service.ts
import { 
  diseaseRepository, 
  CreateDiseaseDTO 
} from '../repositories/disease.repository';

export class DiseaseService {
  /**
   * Obtener todas las enfermedades de una mascota del propietario
   */
  async getAllByPet(mascotaId: number, propietarioId: number) {
    // Verificar que la mascota pertenece al propietario
    const isOwner = await diseaseRepository.verifyPetOwnership(
      mascotaId, 
      propietarioId
    );
    
    if (!isOwner) {
      throw new Error('Mascota no encontrada o no pertenece al propietario');
    }

    return await diseaseRepository.findAllByPet(mascotaId);
  }

  /**
   * Obtener una enfermedad específica
   */
  async getById(
    enfermedadId: number, 
    mascotaId: number, 
    propietarioId: number
  ) {
    // Verificar propiedad
    const isOwner = await diseaseRepository.verifyPetOwnership(
      mascotaId, 
      propietarioId
    );
    
    if (!isOwner) {
      throw new Error('Mascota no encontrada o no pertenece al propietario');
    }

    const disease = await diseaseRepository.findById(enfermedadId, mascotaId);
    
    if (!disease) {
      throw new Error('Enfermedad no encontrada');
    }

    return disease;
  }

  /**
   * Registrar nueva enfermedad
   */
  async create(data: CreateDiseaseDTO, propietarioId: number) {
    // Verificar propiedad de la mascota
    const isOwner = await diseaseRepository.verifyPetOwnership(
      data.mascota_id, 
      propietarioId
    );
    
    if (!isOwner) {
      throw new Error('Mascota no encontrada o no pertenece al propietario');
    }

    return await diseaseRepository.create(data);
  }

  /**
   * Actualizar enfermedad
   */
  async update(
    enfermedadId: number,
    mascotaId: number,
    data: Partial<CreateDiseaseDTO>,
    propietarioId: number
  ) {
    // Verificar propiedad
    const isOwner = await diseaseRepository.verifyPetOwnership(
      mascotaId, 
      propietarioId
    );
    
    if (!isOwner) {
      throw new Error('Mascota no encontrada o no pertenece al propietario');
    }

    const updated = await diseaseRepository.update(enfermedadId, mascotaId, data);
    
    if (!updated) {
      throw new Error('Enfermedad no encontrada o nada que actualizar');
    }

    return updated;
  }

  /**
   * Eliminar enfermedad
   */
  async delete(enfermedadId: number, mascotaId: number, propietarioId: number) {
    // Verificar propiedad
    const isOwner = await diseaseRepository.verifyPetOwnership(
      mascotaId, 
      propietarioId
    );
    
    if (!isOwner) {
      throw new Error('Mascota no encontrada o no pertenece al propietario');
    }

    const deleted = await diseaseRepository.delete(enfermedadId, mascotaId);
    
    if (!deleted) {
      throw new Error('Enfermedad no encontrada');
    }

    return true;
  }

  /**
   * Obtener catálogo de enfermedades por especie
   */
  async getEnfermedadesByEspecie(especieId: string) {
    return await diseaseRepository.getEnfermedadesByEspecie(especieId);
  }
}

export const diseaseService = new DiseaseService();
