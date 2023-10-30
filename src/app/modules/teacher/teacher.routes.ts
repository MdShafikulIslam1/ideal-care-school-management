import express from 'express';
import { TeacherController } from './teacher.controller';

const router = express.Router();

router.get('/', TeacherController.getAll);

router.get('/:id', TeacherController.getSingle);
router.patch('/:id', TeacherController.updateOne);
router.delete('/:id', TeacherController.deleteOne);

export const TeacherRoutes = router;
