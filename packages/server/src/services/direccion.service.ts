import { direccionRepository, Direccion } from '../repositories/direccion.repository';

export class DireccionService {
  // Catálogos
  async getTiposDomicilio() {
    return await direccionRepository.getTiposDomicilio();
  }

  async getEstados() {
    return await direccionRepository.getEstados();
  }

  async getMunicipiosByEstado(estadoId: number) {
    return await direccionRepository.getMunicipiosByEstado(estadoId);
  }

  async getColoniasByMunicipioAndCP(municipioId: number, codigoPostal: string) {
    return await direccionRepository.getColoniasByMunicipioAndCP(municipioId, codigoPostal);
  }

  async getInfoByCodigoPostal(codigoPostal: string) {
    const info = await direccionRepository.getInfoByCodigoPostal(codigoPostal);
    if (!info) {
      throw new Error('Código postal no encontrado');
    }
    return info;
  }

  // CRUD Direcciones
  async getAllByOwner(propietarioId: number) {
    return await direccionRepository.findAllByOwner(propietarioId);
  }

  async getById(direccionId: number, propietarioId: number) {
    const direccion = await direccionRepository.findById(direccionId, propietarioId);
    if (!direccion) {
      throw new Error('Dirección no encontrada');
    }
    return direccion;
  }

  async create(data: Partial<Direccion>, propietarioId: number) {
    // Si se marca como predeterminada, quitar predeterminada de otras
    if (data.es_predeterminada) {
      await direccionRepository.clearDefaultAddresses(propietarioId);
    }

    return await direccionRepository.create({
      ...data,
      propietario_id: propietarioId,
    });
  }

  async update(direccionId: number, data: Partial<Direccion>, propietarioId: number) {
    // Verificar que exista
    await this.getById(direccionId, propietarioId);

    // Si se marca como predeterminada, quitar predeterminada de otras
    if (data.es_predeterminada) {
      await direccionRepository.clearDefaultAddresses(propietarioId);
    }

    const updated = await direccionRepository.update(direccionId, propietarioId, data);
    if (!updated) {
      throw new Error('Nada que actualizar');
    }
    return updated;
  }

  async delete(direccionId: number, propietarioId: number) {
    // Verificar que exista
    await this.getById(direccionId, propietarioId);

    const deleted = await direccionRepository.delete(direccionId, propietarioId);
    if (!deleted) {
      throw new Error('Error al eliminar dirección');
    }
    return true;
  }
}

export const direccionService = new DireccionService();
