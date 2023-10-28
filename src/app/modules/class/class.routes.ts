import express from 'express';
import { ClassController } from './class.controller';
const router = express.Router();
router.post('/create-class', ClassController.create);
export const ClassRoutes = router;
