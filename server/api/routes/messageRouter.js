import { Router } from 'express';
import validate from '../../middleware/validate';
import messageController from '../controllers/messages';

const messageRouter = Router();
messageRouter.post('/', validate('newMessage'), messageController.newMessage);
messageRouter.get('/', validate('checkToken'), messageController.getReceivedMessages);
messageRouter.get('/unread', validate('checkToken'), messageController.getUnreadMessages);

export default messageRouter;
