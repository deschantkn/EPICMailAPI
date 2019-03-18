import { Router } from 'express';
import authController from '../controllers/auth';
import validate from '../../middleware/validate';

const authRouter = Router();
authRouter.post('/signup', validate(true, 'createUser'), authController.signup);
// authRouter.post('/signin', validate(true, 'signin'), authController.signin);

export default authRouter;
