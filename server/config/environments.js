import dotenv from 'dotenv';
/**
 * Create and export environment variables
 */
dotenv.config();
const environments = {};

environments.test = {
  integerIdLength: process.env.ID_LENGTH,
  morgan: process.env.MORGAN,
  hashingSecret: process.env.HASHING_SECRET,
  adminToken: process.env.ADMIN_TOKEN,
  secret: process.env.TOKEN_SECRET,
  salt: process.env.SALT,
  dbUrl: process.env.DB_URL,
};

environments.local = {
  integerIdLength: process.env.ID_LENGTH,
  morgan: process.env.MORGAN,
  hashingSecret: process.env.HASHING_SECRET,
  adminToken: process.env.ADMIN_TOKEN,
  secret: process.env.TOKEN_SECRET,
  salt: process.env.SALT,
  dbUrl: process.env.DB_URL,
};

environments.dev = {
  integerIdLength: process.env.ID_LENGTH,
  morgan: process.env.MORGAN,
  hashingSecret: process.env.HASHING_SECRET,
  dbUrl: process.env.DB_URL,
  secret: process.env.TOKEN_SECRET,
  salt: process.env.SALT,
};

environments.staging = {
  integerIdLength: process.env.ID_LENGTH,
  morgan: process.env.MORGAN,
  hashingSecret: process.env.HASHING_SECRET,
  dbUrl: process.env.DATABASE_URL,
  salt: process.env.SALT,
  secret: process.env.TOKEN_SECRET,
};

// Determine which environment we are in
const currentEnvironment = typeof (process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check that the current environment is one the envs defined above, if not default to dev
const environment = typeof (environments[currentEnvironment]) === 'object'
  ? environments[currentEnvironment] : environments.development;

// Export the module
export default environment;
