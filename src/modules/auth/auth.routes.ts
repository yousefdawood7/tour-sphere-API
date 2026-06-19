import { Router } from 'express';
import { container } from 'tsyringe';

import { zodMiddleware } from '../../middlewares/zod-validation.middleware';
import { AuthController } from './auth.controller';
import { signupSchema } from './auth.schema';

const router = Router();

const authController = container.resolve(AuthController);

router.post(
  '/signup',
  zodMiddleware(signupSchema, 'body'),
  authController.signup,
);

export default router;
