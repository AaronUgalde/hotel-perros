// src/services/vaccination.service.ts
import api from '../lib/api';

export interface Vacuna {
  vacuna_id: number;
  nombre_vacuna: string;
  especie_id: number;
}

export interface VacunaMascota {
  vacuna_mascota_id: number;
  mascota_id: number;
  vacuna_id?: number;
  nombre_vacuna?: string;
  fecha_aplicacion?: string;
  vigencia_hasta?: string;
  veterinario?: string;
  notas?: string;
}

export interface VacunaMascotaRegistro {
  vacuna_id?: number;
  nombre_vacuna?: string;
  fecha_aplicacion?: string;
  vigencia_hasta?: string;
  veterinario?: string;
  notas?: string;
}

const vaccinationService = {
  /**
   * Obtener vacunas por especie
   */
  async getVacunasPorEspecie(especieId: number): Promise<Vacuna[]> {
    const response = await api.get(`/pet-vaccinations/vacunas/${especieId}`);
    return response.data.vacunas || response.data;
  },

  /**
   * Listar vacunas de una mascota
   */
  async getVacunasMascota(mascotaId: number): Promise<VacunaMascota[]> {
    const response = await api.get(`/pet-vaccinations/${mascotaId}`);
    return response.data;
  },

  /**
   * Agregar vacuna a una mascota
   */
  async agregarVacuna(
    mascotaId: number,
    vacuna: VacunaMascotaRegistro
  ): Promise<VacunaMascota> {
    const response = await api.post(`/pet-vaccinations/${mascotaId}`, vacuna);
    return response.data;
  },

  /**
   * Actualizar vacuna de una mascota
   */
  async actualizarVacuna(
    mascotaId: number,
    vacunaMascotaId: number,
    vacuna: Partial<VacunaMascotaRegistro>
  ): Promise<VacunaMascota> {
    const response = await api.put(
      `/pet-vaccinations/${mascotaId}/${vacunaMascotaId}`,
      vacuna
    );
    return response.data;
  },

  /**
   * Eliminar vacuna de una mascota
   */
  async eliminarVacuna(mascotaId: number, vacunaMascotaId: number): Promise<void> {
    await api.delete(`/pet-vaccinations/${mascotaId}/${vacunaMascotaId}`);
  },
};

export default vaccinationService;
