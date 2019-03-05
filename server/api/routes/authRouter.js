import { Router } from 'express';
import authController from '../controllers/auth';
import validateRequestData from '../../middleware/validateRequestData';

const authRouter = Router();
authRouter.post('/signup', validateRequestData('createUser'), authController.signup);
authRouter.post('/signin', validateRequestData('signin'), authController.signin);

export default authRouter;
