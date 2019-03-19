import '@babel/polyfill';
import express from 'express';
import dotenv from 'dotenv';
import api from './api/routes';
import v2 from './v2/routes';
import { createTables, dropTables } from './helpers/db';
import registerMiddleware from './middleware/registerMiddleware';

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();

// Serve static assets (documentation url)
app.use('/', express.static(`${__dirname}/docs`));

// Register middleware
registerMiddleware(app);

// You may add api specific middlewares here
if (process.env.NODE_ENV === 'dev') {
  dropTables().then(() => {
    createTables();
  });
} else {
  createTables();
}

app.use('/api/v1', api);
app.use('/api/v2', v2);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port: ${port} in ${process.env.NODE_ENV} mode`);
});

// Export server for testing
export default app;
