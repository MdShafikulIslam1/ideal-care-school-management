import express from 'express';
import { SubjectController } from './subject.controller';
import validateRequest from '../../middlewares/validateUser';
import { SubjectValidation } from './subject.validation';

const router = express.Router();
router.post(
  '/create-subject',
  validateRequest(SubjectValidation.createSubjectZodSchema),
  SubjectController.create
);
router.get('/', SubjectController.getAll);
router.get('/:id', SubjectController.getSingle);
router.patch(
  '/:id',
  validateRequest(SubjectValidation.updateSubjectZodSchema),
  SubjectController.updateOne
);
router.delete('/:id', SubjectController.deleteOne);

export const SubjectRoutes = router;
