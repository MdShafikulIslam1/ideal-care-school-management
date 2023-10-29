import express from 'express';
import validateRequest from '../../middlewares/validateUser';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';
import Auth from '../../middlewares/Auth';
import { User_Role } from '@prisma/client';
const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
);
router.post(
  '/change-password',
  // validateRequest(AuthValidation.loginZodSchema),
  Auth(
    User_Role.ADMIN,
    User_Role.TEACHER,
    User_Role.STUDENT,
    User_Role.GUARDIAN
  ),
  AuthController.changePassword
);

export const AuthRoutes = router;
