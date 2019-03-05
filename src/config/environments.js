/**
 * Create and export environment variables
 */

const environments = {};

// Development (default) environment
environments.development = {
  integerIdLength: 10,
};

// Production environment
environments.production = {
  integerIdLength: 10, 
};

// Determine which environment was passed as command-line argurment
const currentEnvironment = typeof (process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check that the current environment is one the envs defined above, if not default to staging
const environmentToExport = typeof (environments[currentEnvironment]) === 'object' ? environments[currentEnvironment] : environments.development;

// Export the module
export default environmentToExport;
