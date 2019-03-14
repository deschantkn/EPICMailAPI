import { Router } from 'express';
import validate from '../../middleware/validate';
import messageController from '../controllers/messages';

const messageRouter = Router();
messageRouter.post('/', validate(true, 'newMessage'), messageController.newMessage);
messageRouter.get('/', messageController.getReceivedMessages);
messageRouter.get('/unread', messageController.getUnreadMessages);
messageRouter.get('/sent', messageController.getSentMessages);
messageRouter.get('/:messageId', messageController.getOneMessage);
messageRouter.delete('/:messageId', messageController.deleteOneMessage);

export default messageRouter;
