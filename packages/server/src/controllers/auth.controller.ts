// src/controllers/auth.controller.ts
import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth.service';
import { setAuthCookie, clearAuthCookie } from '../utils/cookie.util';

export class AuthController {
  /**
   * POST /api/auth/register
   */
  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password, nombre, primer_apellido, segundo_apellido, remember } = req.body;

      const result = await authService.register({
        email,
        password,
        nombre,
        primer_apellido,
        segundo_apellido,
      });

      setAuthCookie(res, result.token, remember);

      res.status(201).json({
        success: true,
        data: { propietario: result.propietario },
      });
    } catch (error: any) {
      if (error.message === 'Correo electrónico ya registrado') {
        res.status(400).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }

  /**
   * POST /api/auth/login
   */
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, correo_electronico, password, remember } = req.body;
      const correo = email || correo_electronico;

      const result = await authService.login({ email: correo, password });

      setAuthCookie(res, result.token, remember);

      res.json({
        success: true,
        data: { propietario: result.propietario },
      });
    } catch (error: any) {
      if (error.message === 'Credenciales inválidas') {
        res.status(400).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }

  /**
   * POST /api/auth/logout
   */
  logout(req: Request, res: Response): void {
    clearAuthCookie(res);
    res.json({ success: true, message: 'Sesión cerrada' });
  }

  /**
   * GET /api/auth/me
   */
  async getMe(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ success: false, error: 'No autenticado' });
        return;
      }

      const propietario = await authService.getMe(req.user.propietario_id);

      res.json({
        success: true,
        data: { propietario },
      });
    } catch (error: any) {
      if (error.message === 'Usuario no encontrado') {
        res.status(404).json({ success: false, error: error.message });
        return;
      }
      next(error);
    }
  }
}

export const authController = new AuthController();