import { empleadoRepository, Empleado } from '../repositories/empleado.repository';

export class EmpleadoService {
  // Obtener todos los empleados
  async getAll() {
    return await empleadoRepository.findAll();
  }

  // Obtener empleado por ID
  async getById(id: number) {
    const empleado = await empleadoRepository.findById(id);
    if (!empleado) {
      throw new Error('Empleado no encontrado');
    }
    
    return empleado;
  }

  // Crear empleado
  async create(data: Partial<Empleado>) {
    // Validar que el nombre no esté vacío
    if (!data.nombre || data.nombre.trim() === '') {
      throw new Error('El nombre del empleado es requerido');
    }

    return await empleadoRepository.create(data);
  }

  // Actualizar empleado
  async update(id: number, data: Partial<Empleado>) {
    // Verificar que existe
    await this.getById(id);

    // Validar nombre si se está actualizando
    if (data.nombre !== undefined && data.nombre.trim() === '') {
      throw new Error('El nombre del empleado no puede estar vacío');
    }

    return await empleadoRepository.update(id, data);
  }

  // Eliminar empleado
  async delete(id: number) {
    // Verificar que existe
    await this.getById(id);
    
    return await empleadoRepository.delete(id);
  }

  // Buscar por especialidad
  async findByEspecialidad(especialidad: string) {
    return await empleadoRepository.findByEspecialidad(especialidad);
  }

  // Obtener citas de un empleado
  async getCitas(id: number) {
    // Verificar que existe
    await this.getById(id);
    
    return await empleadoRepository.getCitasByEmpleado(id);
  }
}

export const empleadoService = new EmpleadoService();
