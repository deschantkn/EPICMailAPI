import { Router } from 'express';
import authController from '../controllers/auth';
import middleware from '../../middleware';

const authRouter = Router();
authRouter.post('/signup', middleware.validate('createUser'), authController.signup);

export default authRouter;
