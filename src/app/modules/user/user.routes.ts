import express from 'express';
import { UserController } from './user.controller';
const router = express.Router();

router.post(
  '/create-student',
  //   validateRequest(UserValidation.createStudentZodSchema),
  //   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.createStudent
);

// router.post(
//   '/create-faculty',
//   validateRequest(UserValidation.createFacultyZodSchema),
//   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
//   UserController.createFaculy
// );

// router.post(
//   '/create-admin',
//   validateRequest(UserValidation.createAdminZodSchema),
//   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
//   UserController.createAdmin
// );

export const UserRoutes = router;
