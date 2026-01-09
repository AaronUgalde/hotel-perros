import { petRepository, Pet } from '../repositories/pet.repository';
import { vaccinationRepository, CreateVaccinationDTO } from '../repositories/vaccination.repository';
import { diseaseRepository, CreateDiseaseDTO } from '../repositories/disease.repository';
import { documentoRepository } from '../repositories/documento.repository';
import { alergiaRepository, CreateMascotaAlergiaDTO } from '../repositories/alergia.repository';
import { desparasitacionRepository, CreateDesparasitacionDTO } from '../repositories/desparasitacion.repository';
import { db } from '../config/database';

interface CreatePetWithDetailsDTO {
  pet: Partial<Pet>;
  vacunas?: CreateVaccinationDTO[];
  enfermedades?: CreateDiseaseDTO[];
  alergias?: CreateMascotaAlergiaDTO[];
  desparasitaciones?: CreateDesparasitacionDTO[];
  documentos?: Array<{
    tipo_documento_id: number | null;
    nombre_archivo: string;
    ruta_archivo: string;
  }>;
}

export class PetService {
  async getAllByOwner(propietarioId: number) {
    return await petRepository.findAllByOwner(propietarioId);
  }

  async getById(id: number, propietarioId: number, rolId?: number) {
    const pet = await petRepository.findById(id);
    if (!pet) throw new Error('Mascota no encontrada');
    
    // Admins (rol_id: 2) pueden ver todas las mascotas
    const isAdmin = rolId === 2;
    
    // Verificar que pertenece al propietario (o es admin)
    if (!isAdmin && pet.propietario_id !== propietarioId) {
      throw new Error('No autorizado');
    }
    
    return pet;
  }

  /**
   * Crear mascota con toda su información relacionada (vacunas, enfermedades, alergias, desparasitaciones, documentos)
   * en una sola transacción
   */
  async createWithDetails(data: CreatePetWithDetailsDTO, propietarioId: number) {
    const client = await db.getClient();
    
    try {
      await client.query('BEGIN');

      // 1. Crear la mascota
      const petData = {
        ...data.pet,
        propietario_id: propietarioId
      };
      
      const pet = await petRepository.create(petData);
      const mascotaId = pet.mascota_id;

      // 2. Crear vacunas si existen
      const vacunasCreadas = [];
      if (data.vacunas && data.vacunas.length > 0) {
        for (const vacuna of data.vacunas) {
          const vacunaData = {
            ...vacuna,
            mascota_id: mascotaId
          };
          const vacunaCreada = await vaccinationRepository.create(vacunaData);
          vacunasCreadas.push(vacunaCreada);
        }
      }

      // 3. Crear enfermedades si existen
      const enfermedadesCreadas = [];
      if (data.enfermedades && data.enfermedades.length > 0) {
        for (const enfermedad of data.enfermedades) {
          const enfermedadData = {
            ...enfermedad,
            mascota_id: mascotaId
          };
          const enfermedadCreada = await diseaseRepository.create(enfermedadData);
          enfermedadesCreadas.push(enfermedadCreada);
        }
      }

      // 4. Crear alergias si existen
      const alergiasCreadas = [];
      if (data.alergias && data.alergias.length > 0) {
        for (const alergia of data.alergias) {
          const alergiaData = {
            ...alergia,
            mascota_id: mascotaId
          };
          const alergiaCreada = await alergiaRepository.create(alergiaData);
          alergiasCreadas.push(alergiaCreada);
        }
      }

      // 5. Crear desparasitaciones si existen
      const desparasitacionesCreadas = [];
      if (data.desparasitaciones && data.desparasitaciones.length > 0) {
        for (const desparasitacion of data.desparasitaciones) {
          const desparasitacionData = {
            ...desparasitacion,
            mascota_id: mascotaId
          };
          const desparasitacionCreada = await desparasitacionRepository.create(desparasitacionData);
          desparasitacionesCreadas.push(desparasitacionCreada);
        }
      }

      // 6. Crear documentos si existen
      const documentosCreados = [];
      if (data.documentos && data.documentos.length > 0) {
        for (const documento of data.documentos) {
          const documentoData = {
            ...documento,
            mascota_id: mascotaId
          };
          const documentoCreado = await documentoRepository.create(documentoData);
          documentosCreados.push(documentoCreado);
        }
      }

      await client.query('COMMIT');

      // Retornar toda la información creada
      return {
        mascota: pet,
        vacunas: vacunasCreadas,
        enfermedades: enfermedadesCreadas,
        alergias: alergiasCreadas,
        desparasitaciones: desparasitacionesCreadas,
        documentos: documentosCreados
      };

    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async create(data: Partial<Pet>, propietarioId: number) {
    return await petRepository.create({
      ...data,
      propietario_id: propietarioId
    });
  }

  async update(id: number, data: Partial<Pet>, propietarioId: number, rolId?: number) {
    // Verificar propiedad
    await this.getById(id, propietarioId, rolId);
    return await petRepository.update(id, data);
  }

  async delete(id: number, propietarioId: number, rolId?: number) {
    // Verificar propiedad
    await this.getById(id, propietarioId, rolId);
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
