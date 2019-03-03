import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import middleware from './middleware';
import api from './api';

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

// Serve static assets (documentation url)

// Register middleware
middleware.register(app);

app.use('/api/v1', api);

server.listen(port, () => {
  console.log(`✅    Server listening on port: ${port} in ${process.env.NODE_ENV} mode`);
});
