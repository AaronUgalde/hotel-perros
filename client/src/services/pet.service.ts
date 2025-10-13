// src/services/pet.service.ts
import api from '../lib/api';

export interface Catalogo {
  id: number;
  nombre: string;
}

export interface Mascota {
  mascota_id: number;
  propietario_id: number;
  nombre: string;
  especie_id?: number;
  raza_id?: number;
  sexo_id?: number;
  fecha_nacimiento?: string;
  peso_kg?: number;
  altura_cm?: number;
  largo_cm?: number;
  patron_pelo_id?: number;
  color_principal_id?: number;
  color_ojos_id?: number;
  numero_chip?: string;
  ruac?: string;
  esterilizado?: boolean;
  senas_particulares?: string;
  origen_id?: number;
  funcion_id?: number;
  mestizo?: boolean;
  url_database_chip?: string;
  frecuency_chip?: number;
  fecha_alta?: string;
}

export interface MascotaRegistro {
  nombre: string;
  especie_id: number;
  raza_id?: number;
  sexo_id?: number;
  fecha_nacimiento?: string;
  peso_kg?: number;
  altura_cm?: number;
  largo_cm?: number;
  patron_pelo_id?: number;
  color_principal_id?: number;
  color_ojos_id?: number;
  numero_chip?: string;
  ruac?: string;
  esterilizado?: boolean;
  senas_particulares?: string;
  origen_id?: number;
  funcion_id?: number;
  mestizo?: boolean;
  url_database_chip?: string;
  frecuency_chip?: number;
}

const petService = {
  /**
   * Obtener todas las mascotas del propietario actual
   */
  async getMisMascotas(): Promise<Mascota[]> {
    const response = await api.get('/pets');
    return response.data;
  },

  /**
   * Obtener especies
   */
  async getEspecies(): Promise<Catalogo[]> {
    const response = await api.get('/pets/especies');
    return response.data.especies || response.data;
  },

  /**
   * Obtener razas por especie
   */
  async getRazas(especieId: number): Promise<Catalogo[]> {
    const response = await api.get(`/pets/razas/${especieId}`);
    return response.data.razas || response.data;
  },

  /**
   * Obtener sexos
   */
  async getSexos(): Promise<Catalogo[]> {
    const response = await api.get('/pets/sexos');
    return response.data.sexos || response.data;
  },

  /**
   * Obtener colores
   */
  async getColores(): Promise<Catalogo[]> {
    const response = await api.get('/pets/colores');
    return response.data.colores || response.data;
  },

  /**
   * Obtener patrones de pelo
   */
  async getPatronesPelo(): Promise<Catalogo[]> {
    const response = await api.get('/pets/patron_pelo');
    console.log(response)
    return response.data.patron_pelo || response.data;
  },

  /**
   * Obtener orígenes de mascota
   */
  async getOrigenMascota(): Promise<Catalogo[]> {
    const response = await api.get('/pets/origen_mascota');
    return response.data.origen_mascota || response.data;
  },

  /**
   * Obtener funciones de mascota
   */
  async getFuncionMascota(): Promise<Catalogo[]> {
    const response = await api.get('/pets/funcion_mascota');
    return response.data.funcion_mascota || response.data;
  },

  /**
   * Registrar una nueva mascota
   */
  async registrarMascota(data: MascotaRegistro): Promise<Mascota> {
    const response = await api.post('/pets', data);
    return response.data;
  },

  /**
   * Actualizar una mascota
   */
  async actualizarMascota(mascotaId: number, data: Partial<MascotaRegistro>): Promise<Mascota> {
    const response = await api.put(`/pets/${mascotaId}`, data);
    return response.data;
  },

  /**
   * Eliminar una mascota
   */
  async eliminarMascota(mascotaId: number): Promise<void> {
    await api.delete(`/pets/${mascotaId}`);
  },
};

export default petService;
