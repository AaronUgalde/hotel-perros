import { Router } from 'express';
import { empleadoController } from '../controllers/empleado.controller';
import { requireAuth } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import { 
  createEmpleadoValidator, 
  updateEmpleadoValidator, 
  empleadoIdValidator,
  especialidadQueryValidator
} from '../validators/empleado.validator';

const router = Router();

// Búsqueda por especialidad (debe ir antes de /:id para evitar conflictos)
router.get(
  '/search',
  requireAuth,
  especialidadQueryValidator,
  validate,
  empleadoController.findByEspecialidad.bind(empleadoController)
);

// CRUD Empleados (requieren auth)
router.get('/', requireAuth, empleadoController.getAll.bind(empleadoController));

router.get(
  '/:id',
  requireAuth,
  empleadoIdValidator,
  validate,
  empleadoController.getById.bind(empleadoController)
);

router.post(
  '/',
  requireAuth,
  createEmpleadoValidator,
  validate,
  empleadoController.create.bind(empleadoController)
);

router.put(
  '/:id',
  requireAuth,
  empleadoIdValidator,
  updateEmpleadoValidator,
  validate,
  empleadoController.update.bind(empleadoController)
);

router.delete(
  '/:id',
  requireAuth,
  empleadoIdValidator,
  validate,
  empleadoController.delete.bind(empleadoController)
);

// Citas del empleado
router.get(
  '/:id/citas',
  requireAuth,
  empleadoIdValidator,
  validate,
  empleadoController.getCitas.bind(empleadoController)
);

export default router;
