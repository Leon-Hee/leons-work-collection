import { Router } from 'express';
import authRoutes from './auth.routes';
import postRoutes from './post.routes';
import projectRoutes from './project.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/posts', postRoutes);
router.use('/projects', projectRoutes);

export default router;
