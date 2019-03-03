import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

const middleware = {};

middleware.register = (app) => {
  app
    // Parse req object and make data available on req.body
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    // Allow cross origin requests
    .use(cors())
    // Logging http requests
    .use(morgan(process.env.MORGAN_OPTION));
};

export default middleware;
