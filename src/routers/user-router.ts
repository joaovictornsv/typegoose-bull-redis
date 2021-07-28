import { Router } from 'express';
import { UserController } from '../controllers/user-controller';

const router = Router();
const userController = new UserController();

router.get('/', userController.index);
router.get('/:id', userController.indexById);
router.get('/verify-email/:id', userController.verifyEmail);
router.post('/', userController.create);

export { router as UserRouter };
