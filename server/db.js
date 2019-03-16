/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import { Pool } from 'pg';
import environment from './config/environments';

const connect = () => {
  const pool = new Pool({
    connectionString: environment.dbUrl,
  });

  pool.on('connect', () => {
    console.log('Database successfully connected');
  });

  pool.query('SELECT NOW()', () => {
    pool.end();
  });

  pool.on('error', (err) => {
    console.error('Error acquiring client', err.message);
  });
};

const createTables = () => {
  const queryText = `
  CREATE TABLE IF NOT EXISTS
    users(
      id SERIAL PRIMARY KEY,
      firstName VARCHAR(128) NOT NULL,
      lastName VARCHAR(128) NOT NULL,
      password VARCHAR(128) NOT NULL,
      email VARCHAR(128) NOT NULL
    )
  `;
};

export { connect };
