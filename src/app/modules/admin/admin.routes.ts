import express from 'express';
import { AdminController } from './admin.controller';

const router = express.Router();

router.get('/', AdminController.getAll);

router.get('/:id', AdminController.getSingle);
router.patch('/:id', AdminController.updateOne);
router.delete('/:id', AdminController.deleteOne);

export const AdminRoutes = router;
