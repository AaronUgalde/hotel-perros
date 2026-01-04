import { Router } from 'express';
import { ownerController } from '../controllers/owner.controller';
import { requireAuth } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validation.middleware';
import { updateOwnerValidator, registerCompleteValidator } from '../validators/owner.validator';

const router = Router();

router.post(
  '/register-complete',
  registerCompleteValidator,
  validate,
  ownerController.registerComplete.bind(ownerController)
);

router.get('/me', requireAuth, ownerController.getMe.bind(ownerController));

router.put(
  '/me',
  requireAuth,
  updateOwnerValidator,
  validate,
  ownerController.updateMe.bind(ownerController)
);

export default router;