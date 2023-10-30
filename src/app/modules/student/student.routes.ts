import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

router.get('/', StudentController.getAll);

router.get('/:id', StudentController.getSingle);
router.patch('/:id', StudentController.updateOne);
router.delete('/:id', StudentController.deleteOne);

export const StudentRoutes = router;
