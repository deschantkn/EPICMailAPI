import express from 'express';
import authRouter from './authRouter';
import messageRouter from './messageRouter';

const v2 = express();

v2.use('/auth', authRouter);
v2.use('/messages', messageRouter);

export default v2;
