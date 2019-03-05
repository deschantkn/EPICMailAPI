import express from 'express';
import authRouter from './routes/authRouter';

const api = express();

// You may add api specific middlewares here

api.use('/auth', authRouter);

export default api;
