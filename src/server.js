import express from 'express';
import dotenv from 'dotenv';
import middleware from './middleware';
import api from './api';

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();

// Serve static assets (documentation url)

// Register middleware
middleware.register(app);

app.use('/api/v1', api);

app.listen(port, () => {
  console.log(`✅    Server listening on port: ${port} in ${process.env.NODE_ENV} mode`);
});

// Export server for testing
export default app;
