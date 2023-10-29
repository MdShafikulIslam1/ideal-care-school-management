import express from 'express';
import validateRequest from '../../middlewares/validateUser';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';
const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
);

export const AuthRoutes = router;
