import express from 'express';
import authRouter from './authRouter';
import messageRouter from './messageRouter';

const api = express();

// You may add api specific middlewares here

api.use('/auth', authRouter);
api.use('/messages', messageRouter);

export default api;
