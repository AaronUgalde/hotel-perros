// src/routes/auth.routes.ts
import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { requireAuth } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import { registerValidator, loginValidator } from '../validators/auth.validator';

const router = Router();

// POST /api/auth/register
router.post(
  '/register',
  registerValidator,
  validate,
  authController.register.bind(authController)
);

// POST /api/auth/login
router.post(
  '/login',
  loginValidator,
  validate,
  authController.login.bind(authController)
);

// POST /api/auth/logout
router.post('/logout', authController.logout.bind(authController));

// GET /api/auth/me
router.get('/me', requireAuth, authController.getMe.bind(authController));

export default router;