import express from 'express';
import { StudentResultController } from './studentResult.controller';
import validateRequest from '../../middlewares/validateUser';
import { SubjectMarkValidation } from './studentResult.validation';

const router = express.Router();
router.post(
  '/create-result',
  validateRequest(SubjectMarkValidation.createSubjectMarkZodSchema),
  StudentResultController.create
);
router.get('/', StudentResultController.getAll);
export const StudentResultRoutes = router;
