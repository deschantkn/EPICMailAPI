import { Router } from 'express';
import authController from '../controllers/auth';
import validate from '../../../middleware/validate';
import checkEmailIsUnique from '../../../middleware/checkEmailIsUnique';

const authRouter = Router();
const { signin, signup } = authController;

authRouter.post('/signup', validate(true, 'createUser'), checkEmailIsUnique, signup);
authRouter.post('/signin', validate(true, 'signin'), signin);

export default authRouter;
