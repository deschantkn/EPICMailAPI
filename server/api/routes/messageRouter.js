import { Router } from 'express';
import validateRequestData from '../../middleware/validateRequestData';
import messageController from '../controllers/messages';

const messageRouter = Router();
messageRouter.post('/', validateRequestData('newMessage'), messageController.newMessage);

export default messageRouter;
