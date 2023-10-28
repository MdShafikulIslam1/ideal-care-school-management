import express from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { ClassRoutes } from '../modules/class/class.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/class',
    route: ClassRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
