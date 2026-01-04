import { petRepository, Pet } from '../repositories/pet.repository';

export class PetService {
  async getAllByOwner(propietarioId: number) {
    return await petRepository.findAllByOwner(propietarioId);
  }

  async getById(id: number, propietarioId: number) {
    const pet = await petRepository.findById(id);
    if (!pet) throw new Error('Mascota no encontrada');
    
    // Verificar que pertenece al propietario
    if (pet.propietario_id !== propietarioId) {
      throw new Error('No autorizado');
    }
    
    return pet;
  }

  async create(data: Partial<Pet>, propietarioId: number) {
    return await petRepository.create({
      ...data,
      propietario_id: propietarioId
    });
  }

  async update(id: number, data: Partial<Pet>, propietarioId: number) {
    // Verificar propiedad
    await this.getById(id, propietarioId);
    return await petRepository.update(id, data);
  }

  async delete(id: number, propietarioId: number) {
    // Verificar propiedad
    await this.getById(id, propietarioId);
    return await petRepository.delete(id);
  }

  // Catálogos
  async getSexos() { return await petRepository.getSexos(); }
  async getPatronPelo() { return await petRepository.getPatronPelo(); }
  async getOrigenMascota() { return await petRepository.getOrigenMascota(); }
  async getFuncionMascota() { return await petRepository.getFuncionMascota(); }
  async getColores() { return await petRepository.getColores(); }
  async getEspecies() { return await petRepository.getEspecies(); }
  async getRazasByEspecie(especieId: string) {
    return await petRepository.getRazasByEspecie(especieId);
  }
}

export const petService = new PetService();