import express from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { ClassRoutes } from '../modules/class/class.routes';
import { ManagementDepartmentRoutes } from '../modules/management-department/management-department.routes';
import { AuthRoutes } from '../modules/auth/auth.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/class',
    route: ClassRoutes,
  },
  {
    path: '/management-departments',
    route: ManagementDepartmentRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
