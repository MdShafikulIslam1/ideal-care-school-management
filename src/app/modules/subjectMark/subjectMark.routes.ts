import express from 'express';
import { SubjectMarkController } from './subjectMark.controller';
import validateRequest from '../../middlewares/validateUser';
import { SubjectMarkValidation } from './subjectMark.validation';

const router = express.Router();
router.post(
  '/create-subjectMark',
  validateRequest(SubjectMarkValidation.createSubjectMarkZodSchema),
  SubjectMarkController.create
);
router.get('/', SubjectMarkController.getAll);
export const SubjectMarkRoutes = router;
