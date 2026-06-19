import { Router } from 'express';
import { container } from 'tsyringe';

import { zodMiddleware } from '../../middlewares/zod-validation.middleware';
import { AuthController } from './auth.controller';
import { loginSchema, signupSchema } from './auth.schema';

const router = Router();

const authController = container.resolve(AuthController);

router.post(
  '/signup',
  zodMiddleware(signupSchema, 'body'),
  authController.signup,
);

router.post('/login', zodMiddleware(loginSchema, 'body'), authController.login);

export default router;
