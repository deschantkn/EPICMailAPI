import '@babel/polyfill';
import express from 'express';
import dotenv from 'dotenv';
import api from './api';
import registerMiddleware from './middleware/registerMiddleware';

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();

// Serve static assets (documentation url)

// Register middleware
registerMiddleware(app);

app.use('/api/v1', api);

app.listen(port, () => {
  console.log(`Server listening on port: ${port} in ${process.env.NODE_ENV} mode`);
});

// Export server for testing
export default app;
