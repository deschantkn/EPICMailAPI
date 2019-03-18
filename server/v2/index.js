import express from 'express';
import { createTables, dropTables } from '../db';
import authRouter from './routes/authRouter';

const v2 = express();

// You may add api specific middlewares here
if (process.env.NODE_ENV === 'test') {
  dropTables().then(() => {
    createTables();
  });
} else {
  createTables();
}

v2.use('/auth', authRouter);

export default v2;
