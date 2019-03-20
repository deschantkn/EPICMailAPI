/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import { Pool } from 'pg';
import environment from '../config/environments';
import queries from '../db/queries';

const { addTables, delTables } = queries;

const pool = new Pool({
  connectionString: environment.dbUrl,
});

pool.on('connect', () => {
  console.log('Database successfully connected');
});

pool.on('error', (err) => {
  console.error('Error acquiring client', err.message);
});

const createTables = () => new Promise(async (resolve, reject) => {
  console.log('Creating tables');

  try {
    await pool.query(addTables);
    resolve();
  } catch (error) {
    reject(error);
  }
});

const dropTables = async () => new Promise(async (resolve, reject) => {
  console.log('Dropping tables');
  try {
    await pool.query(delTables);
    resolve();
  } catch (error) {
    reject(error);
  }
});

export { createTables, dropTables };
