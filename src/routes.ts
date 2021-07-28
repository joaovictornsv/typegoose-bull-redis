import { Router } from 'express';
import { UserRouter } from './routers/user-router';

const router = Router();

router.use('/users', UserRouter);

export { router };
