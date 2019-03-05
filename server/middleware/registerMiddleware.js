import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import expressValidator from 'express-validator';
import environment from '../config/environments';

export default (app) => {
  app
    // Parse req object and make data available on req.body
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(expressValidator())
    // Allow cross origin requests
    .use(cors());

  if (process.env.NODE_ENV !== 'test') {
    // Logging http requests
    app.use(morgan(environment.morgan));
  }
};
