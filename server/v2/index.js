import express from 'express';
import authRouter from './routes/authRouter';

const v2 = express();

v2.use('/auth', authRouter);

export default v2;
