import express from 'express';
import authRouter from './authRouter';
import messageRouter from './messageRouter';
import groupRouter from './groupRouter';

const v2 = express();

v2.use('/auth', authRouter);
v2.use('/messages', messageRouter);
v2.use('/groups', groupRouter);

export default v2;
