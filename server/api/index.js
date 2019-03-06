import express from 'express';
import authRouter from './routes/authRouter';
import messageRouter from './routes/messageRouter';

const api = express();

// You may add api specific middlewares here

api.use('/auth', authRouter);
api.use('/messages', messageRouter);

export default api;
