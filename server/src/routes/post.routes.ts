import { Router } from 'express';
import { getAll, getById, create, update, remove } from '../controllers/post.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', authMiddleware, create);
router.put('/:id', authMiddleware, update);
router.delete('/:id', authMiddleware, remove);

export default router;
