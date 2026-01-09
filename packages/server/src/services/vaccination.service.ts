// src/services/vaccination.service.ts
import { 
  vaccinationRepository, 
  CreateVaccinationDTO 
} from '../repositories/vaccination.repository';

export class VaccinationService {
  /**
   * Obtener todas las vacunaciones de una mascota del propietario
   */
  async getAllByPet(mascotaId: number, propietarioId: number, rolId?: number) {
    // Admins (rol_id: 2) pueden ver todas las vacunas
    const isAdmin = rolId === 2;
    
    if (!isAdmin) {
      // Verificar que la mascota pertenece al propietario
      const isOwner = await vaccinationRepository.verifyPetOwnership(
        mascotaId, 
        propietarioId
      );
      
      if (!isOwner) {
        throw new Error('Mascota no encontrada o no pertenece al propietario');
      }
    }

    return await vaccinationRepository.findAllByPet(mascotaId);
  }

  /**
   * Obtener una vacunación específica
   */
  async getById(
    vacunaId: number, 
    mascotaId: number, 
    propietarioId: number
  ) {
    // Verificar propiedad
    const isOwner = await vaccinationRepository.verifyPetOwnership(
      mascotaId, 
      propietarioId
    );
    
    if (!isOwner) {
      throw new Error('Mascota no encontrada o no pertenece al propietario');
    }

    const vaccination = await vaccinationRepository.findById(vacunaId, mascotaId);
    
    if (!vaccination) {
      throw new Error('Vacunación no encontrada');
    }

    return vaccination;
  }

  /**
   * Crear nueva vacunación
   */
  async create(data: CreateVaccinationDTO, propietarioId: number) {
    // Verificar propiedad de la mascota
    const isOwner = await vaccinationRepository.verifyPetOwnership(
      data.mascota_id, 
      propietarioId
    );
    
    if (!isOwner) {
      throw new Error('Mascota no encontrada o no pertenece al propietario');
    }

    return await vaccinationRepository.create(data);
  }

  /**
   * Actualizar vacunación
   */
  async update(
    vacunaId: number,
    mascotaId: number,
    data: Partial<CreateVaccinationDTO>,
    propietarioId: number
  ) {
    // Verificar propiedad
    const isOwner = await vaccinationRepository.verifyPetOwnership(
      mascotaId, 
      propietarioId
    );
    
    if (!isOwner) {
      throw new Error('Mascota no encontrada o no pertenece al propietario');
    }

    const updated = await vaccinationRepository.update(vacunaId, mascotaId, data);
    
    if (!updated) {
      throw new Error('Vacunación no encontrada o nada que actualizar');
    }

    return updated;
  }

  /**
   * Eliminar vacunación
   */
  async delete(vacunaId: number, mascotaId: number, propietarioId: number) {
    // Verificar propiedad
    const isOwner = await vaccinationRepository.verifyPetOwnership(
      mascotaId, 
      propietarioId
    );
    
    if (!isOwner) {
      throw new Error('Mascota no encontrada o no pertenece al propietario');
    }

    const deleted = await vaccinationRepository.delete(vacunaId, mascotaId);
    
    if (!deleted) {
      throw new Error('Vacunación no encontrada');
    }

    return true;
  }

  /**
   * Obtener catálogo de vacunas por especie
   */
  async getVacunasByEspecie(especieId: string) {
    return await vaccinationRepository.getVacunasByEspecie(especieId);
  }
}

export const vaccinationService = new VaccinationService();
