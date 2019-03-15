import '@babel/polyfill';
import express from 'express';
import dotenv from 'dotenv';
import api from './api';
import v2 from './v2';
import registerMiddleware from './middleware/registerMiddleware';
import { connect } from './db';

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();

// Serve static assets (documentation url)
app.use('/', express.static(`${__dirname}/docs`));

// Register middleware
registerMiddleware(app);

app.use('/api/v1', api);
connect();
app.use('/api/v2', v2);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port: ${port} in ${process.env.NODE_ENV} mode`);
});

// Export server for testing
export default app;
