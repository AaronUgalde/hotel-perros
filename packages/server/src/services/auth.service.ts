// src/services/auth.service.ts
import { authRepository, CreatePropietarioDTO } from '../repositories/auth.repository';
import { hashPassword, comparePassword } from '../utils/hash.util';
import { generateToken, JwtPayload } from '../utils/jwt.util';

export interface RegisterDTO {
  email: string;
  password: string;
  nombre?: string;
  primer_apellido?: string;
  segundo_apellido?: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  propietario: {
    propietario_id: number;
    correo_electronico: string;
    nombre: string | null;
    primer_apellido: string | null;
    segundo_apellido: string | null;
    rol_id: number;
  };
}

export class AuthService {
  /**
   * Registrar nuevo propietario
   */
  async register(data: RegisterDTO): Promise<AuthResponse> {
    const correo = data.email.trim().toLowerCase();

    // Verificar si ya existe
    const existing = await authRepository.findByEmail(correo);
    if (existing) {
      throw new Error('Correo electrónico ya registrado');
    }

    // Hash password
    const hash_password = await hashPassword(data.password);

    // Crear propietario
    const createData: CreatePropietarioDTO = {
      correo_electronico: correo,
      hash_password,
      nombre: data.nombre,
      primer_apellido: data.primer_apellido,
      segundo_apellido: data.segundo_apellido,
    };

    const propietario = await authRepository.create(createData);

    // Generar token
    const payload: JwtPayload = {
      propietario_id: propietario.propietario_id,
      rol_id: propietario.rol_id,
    };

    const token = generateToken(payload);

    return {
      token,
      propietario: {
        propietario_id: propietario.propietario_id,
        correo_electronico: propietario.correo_electronico,
        nombre: propietario.nombre,
        primer_apellido: propietario.primer_apellido,
        segundo_apellido: propietario.segundo_apellido,
        rol_id: propietario.rol_id,
      },
    };
  }

  /**
   * Login de propietario
   */
  async login(data: LoginDTO): Promise<AuthResponse> {
    const correo = data.email.trim().toLowerCase();

    // Buscar usuario
    const propietario = await authRepository.findByEmail(correo);
    if (!propietario) {
      throw new Error('Credenciales inválidas');
    }

    // Verificar password
    const isValid = await comparePassword(data.password, propietario.hash_password);
    if (!isValid) {
      throw new Error('Credenciales inválidas');
    }

    // Generar token
    const payload: JwtPayload = {
      propietario_id: propietario.propietario_id,
      rol_id: propietario.rol_id,
    };

    const token = generateToken(payload);

    return {
      token,
      propietario: {
        propietario_id: propietario.propietario_id,
        correo_electronico: propietario.correo_electronico,
        nombre: propietario.nombre,
        primer_apellido: propietario.primer_apellido,
        segundo_apellido: propietario.segundo_apellido,
        rol_id: propietario.rol_id,
      },
    };
  }

  /**
   * Obtener datos del usuario autenticado
   */
  async getMe(propietarioId: number) {
    const propietario = await authRepository.findById(propietarioId);
    
    if (!propietario) {
      throw new Error('Usuario no encontrado');
    }

    return {
      propietario_id: propietario.propietario_id,
      correo_electronico: propietario.correo_electronico,
      nombre: propietario.nombre,
      primer_apellido: propietario.primer_apellido,
      segundo_apellido: propietario.segundo_apellido,
      rol_id: propietario.rol_id,
    };
  }
}

export const authService = new AuthService();