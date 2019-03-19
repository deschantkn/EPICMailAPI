import express from 'express';
import authRouter from './authRouter';
import messageRouter from './messageRouter';

const v1 = express();
// You may add api specific middlewares here

v1.use('/auth', authRouter);
v1.use('/messages', messageRouter);

export default v1;
