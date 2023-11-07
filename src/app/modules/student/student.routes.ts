import express from 'express';
import { StudentController } from './student.controller';
import Auth from '../../middlewares/Auth';
import { User_Role } from '@prisma/client';

const router = express.Router();
router.get(
  '/get-my-result',
  Auth(User_Role.student),
  StudentController.getMyResult
);
router.get('/', StudentController.getAll);

router.get('/:id', StudentController.getSingle);
router.patch('/:id', StudentController.updateOne);
router.delete('/:id', StudentController.deleteOne);

export const StudentRoutes = router;
