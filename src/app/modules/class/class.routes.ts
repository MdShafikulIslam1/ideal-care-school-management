import express from 'express';
import { ClassController } from './class.controller';
const router = express.Router();
router.post('/create-class', ClassController.create);
router.get('/', ClassController.getAll);

router.get('/:id', ClassController.getSingle);
router.patch('/:id', ClassController.updateOne);
router.delete('/:id', ClassController.deleteOne);
export const ClassRoutes = router;
