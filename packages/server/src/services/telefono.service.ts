import { telefonoRepository, Telefono } from '../repositories/telefono.repository';

export class TelefonoService {
  // Catálogos
  async getTiposTelefono() {
    return await telefonoRepository.getTiposTelefono();
  }

  // CRUD Teléfonos
  async getAllByOwner(propietarioId: number) {
    return await telefonoRepository.findAllByOwner(propietarioId);
  }

  async getById(telefonoId: number, propietarioId: number) {
    const telefono = await telefonoRepository.findById(telefonoId, propietarioId);
    if (!telefono) {
      throw new Error('Teléfono no encontrado');
    }
    return telefono;
  }

  async create(data: Partial<Telefono>, propietarioId: number) {
    // Si se marca como principal, desmarcar otros
    if (data.es_principal) {
      await telefonoRepository.clearPrincipalPhone(propietarioId);
    }

    return await telefonoRepository.create({
      ...data,
      propietario_id: propietarioId,
    });
  }

  async update(telefonoId: number, data: Partial<Telefono>, propietarioId: number) {
    // Verificar que exista
    await this.getById(telefonoId, propietarioId);

    // Si se marca como principal, desmarcar otros
    if (data.es_principal) {
      await telefonoRepository.clearPrincipalPhone(propietarioId);
    }

    const updated = await telefonoRepository.update(telefonoId, propietarioId, data);
    if (!updated) {
      throw new Error('Nada que actualizar');
    }
    return updated;
  }

  async delete(telefonoId: number, propietarioId: number) {
    // Verificar que exista
    await this.getById(telefonoId, propietarioId);

    const deleted = await telefonoRepository.delete(telefonoId, propietarioId);
    if (!deleted) {
      throw new Error('Error al eliminar teléfono');
    }
    return true;
  }
}

export const telefonoService = new TelefonoService();
