// src/services/disease.service.ts
import api from '../lib/api';

export interface Enfermedad {
  enfermedad_id: number;
  nombre: string;
  descripcion: string;
  especie_id: number;
}

export interface EnfermedadMascota {
  enfermedad_mascota_id: number;
  mascota_id: number;
  enfermedad_id: number;
  fecha_diagnostico?: string;
  observaciones?: string;
  tratamiento?: string;
  // Datos de la enfermedad (del JOIN)
  nombre?: string;
  descripcion?: string;
}

export interface EnfermedadMascotaRegistro {
  enfermedad_id: number;
  fecha_diagnostico?: string;
  observaciones?: string;
  tratamiento?: string;
}

const diseaseService = {
  /**
   * Obtener catálogo completo de enfermedades
   */
  async getCatalogoEnfermedades(): Promise<Enfermedad[]> {
    const response = await api.get('/diseases/catalog');
    return response.data;
  },

  /**
   * Obtener enfermedades por especie
   */
  async getEnfermedadesPorEspecie(especieId: number): Promise<Enfermedad[]> {
    const response = await api.get(`/diseases/enfermedades/${especieId}`);
    return response.data.enfermedades || response.data;
  },

  /**
   * Listar enfermedades de una mascota
   */
  async getEnfermedadesMascota(mascotaId: number): Promise<EnfermedadMascota[]> {
    const response = await api.get(`/diseases/${mascotaId}`);
    return response.data;
  },

  /**
   * Agregar enfermedad a una mascota
   */
  async agregarEnfermedad(
    mascotaId: number,
    enfermedad: EnfermedadMascotaRegistro
  ): Promise<EnfermedadMascota> {
    const response = await api.post(`/diseases/${mascotaId}`, enfermedad);
    return response.data;
  },

  /**
   * Actualizar enfermedad de una mascota
   */
  async actualizarEnfermedad(
    mascotaId: number,
    enfermedadMascotaId: number,
    enfermedad: Partial<Omit<EnfermedadMascotaRegistro, 'enfermedad_id'>>
  ): Promise<EnfermedadMascota> {
    const response = await api.put(
      `/diseases/${mascotaId}/${enfermedadMascotaId}`,
      enfermedad
    );
    return response.data;
  },

  /**
   * Eliminar enfermedad de una mascota
   */
  async eliminarEnfermedad(
    mascotaId: number,
    enfermedadMascotaId: number
  ): Promise<void> {
    await api.delete(`/diseases/${mascotaId}/${enfermedadMascotaId}`);
  },
};

export default diseaseService;
