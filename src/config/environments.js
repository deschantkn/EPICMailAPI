/**
 * Create and export environment variables
 */

const environments = {};

// Production environment
environments.test = {
  integerIdLength: process.env.ID_LENGTH,
  morgan: process.env.MORGAN,
};

// Development (default) environment
environments.development = {
  integerIdLength: process.env.ID_LENGTH,
  morgan: process.env.MORGAN,
};

// Production environment
environments.production = {
  integerIdLength: process.env.ID_LENGTH,
  morgan: process.env.MORGAN,
};

// Determine which environment we are in
const currentEnvironment = typeof (process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check that the current environment is one the envs defined above, if not default to dev
const environment = typeof (environments[currentEnvironment]) === 'object' ? environments[currentEnvironment] : environments.development;

// Export the module
export default environment;
