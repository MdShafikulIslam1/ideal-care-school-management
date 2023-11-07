import express from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { ClassRoutes } from '../modules/class/class.routes';
import { ManagementDepartmentRoutes } from '../modules/management-department/management-department.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { StudentRoutes } from '../modules/student/student.routes';
import { TeacherRoutes } from '../modules/teacher/teacher.routes';
import { AdminRoutes } from '../modules/admin/admin.routes';
import { SubjectRoutes } from '../modules/subject/subject.routes';
import { SubjectMarkRoutes } from '../modules/subjectMark/subjectMark.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/teachers',
    route: TeacherRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
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
    path: '/subjects',
    route: SubjectRoutes,
  },
  {
    path: '/subjectMarks',
    route: SubjectMarkRoutes,
  },
  {
    path: '/management-departments',
    route: ManagementDepartmentRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
