import { Router } from 'express';
import groupController from '../controllers/groups';
import Auth from '../../../middleware/Auth';
import validate from '../../../middleware/validate';


const groupRouter = Router();

const { verifyToken } = Auth;
const {
  newGroup,
  getGroups,
  updateGroupName,
} = groupController;

groupRouter.post('/', verifyToken, validate(true, 'newGroup'), newGroup);
groupRouter.get('/', verifyToken, getGroups);
groupRouter.patch('/:groupId/name', validate(true, 'newGroup'), verifyToken, updateGroupName);

export default groupRouter;
