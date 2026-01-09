// features/pets/types/pet.types.ts

// ============= Entidades Base =============
export interface Pet {
  mascota_id: number;
  propietario_id: number;
  nombre: string;
  especie_id: number;
  raza_id?: number;
  sexo_id: number;
  fecha_nacimiento: string;
  peso_kg?: number;
  altura_cm?: number;
  largo_cm?: number;
  patron_pelo_id?: number;
  color_principal_id?: number;
  color_ojos_id?: number;
  numero_chip?: number;
  ruac?: number;
  esterilizado?: boolean;
  senas_particulares?: string;
  fecha_alta?: string;
  origen_id?: number;
  funcion_id?: number;
  mestizo?: boolean;
  url_database_chip?: number;
  frecuency_chip?: number;
  // Campos adicionales que vienen del JOIN (solo para admin)
  propietario_nombre?: string;
  propietario_email?: string;
  especie_nombre?: string;
  raza_nombre?: string;
  sexo_nombre?: string;
}

export interface Catalogo {
  id: number;
  nombre: string;
}

// ============= DTOs para Crear/Actualizar =============
export interface CreatePetData {
  nombre: string;
  especie_id: number;
  sexo_id: number;
  fecha_nacimiento: string;
  raza_id?: number;
  peso_kg?: number;
  altura_cm?: number;
  largo_cm?: number;
  patron_pelo_id?: number;
  color_principal_id?: number;
  color_ojos_id?: number;
  numero_chip?: number;
  ruac?: number;
  esterilizado?: boolean;
  senas_particulares?: string;
  fecha_alta?: string;
  origen_id?: number;
  funcion_id?: number;
  mestizo?: boolean;
  url_database_chip?: number;
  frecuency_chip?: number;
}

export interface UpdatePetData extends Partial<CreatePetData> {}

// ============= Response DTOs =============
export interface PetResponse {
  success: boolean;
  data: Pet;
}

export interface PetsListResponse {
  success: boolean;
  data: Pet[];
}

export interface CatalogResponse {
  success: boolean;
  data: Catalogo[];
}