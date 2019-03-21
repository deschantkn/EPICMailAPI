import { Router } from 'express';
import groupController from '../controllers/groups';
import Auth from '../../../middleware/Auth';
import validate from '../../../middleware/validate';


const groupRouter = Router();

const { verifyToken } = Auth;
const { newGroup } = groupController;

groupRouter.post('/', verifyToken, validate(true, 'newGroup'), newGroup);

export default groupRouter;
