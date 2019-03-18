import express from 'express';
import { createTables, dropTables } from '../db';

const v2 = express();

// You may add api specific middlewares here
if (process.env.NODE_ENV === 'test') {
  dropTables().then(() => {
    createTables();
  });
} else {
  createTables();
}
export default v2;
