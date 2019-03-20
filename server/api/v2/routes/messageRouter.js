import { Router } from 'express';
import validate from '../../../middleware/validate';
import messageController from '../controllers/messages';
import Auth from '../../../middleware/Auth';

const messageRouter = Router();
const { verifyToken } = Auth;
const {
  newMessage,
  getReceivedMessages,
  getUnreadMessages,
  getSentMessages,
  getOneMessage,
  deleteOneMessage,
} = messageController;

messageRouter.post('/', verifyToken, validate(true, 'newMessage'), newMessage);
messageRouter.get('/', verifyToken, getReceivedMessages);
messageRouter.get('/unread', verifyToken, getUnreadMessages);
messageRouter.get('/sent', verifyToken, getSentMessages);
messageRouter.get('/:messageId', verifyToken, getOneMessage);
messageRouter.delete('/:messageId', verifyToken, deleteOneMessage);

export default messageRouter;
