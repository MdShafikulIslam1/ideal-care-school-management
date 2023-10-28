import express from 'express';
import { ManagementDepartmentController } from './management-department.controller';
const router = express.Router();
router.post(
  '/create-management-department',
  ManagementDepartmentController.create
);
export const ManagementDepartmentRoutes = router;
