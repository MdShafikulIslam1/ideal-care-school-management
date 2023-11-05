import express from 'express';
import { TeacherController } from './teacher.controller';

const router = express.Router();

router.get('/', TeacherController.getAll);

router.get('/:id', TeacherController.getSingle);
router.patch('/:id', TeacherController.updateOne);
router.delete('/:id', TeacherController.deleteOne);
router.post('/:id/assign-subjects', TeacherController.assignSubjects);
router.delete('/:id/remove-subjects', TeacherController.removeSubjects);

export const TeacherRoutes = router;
