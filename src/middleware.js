import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import expressValidator from 'express-validator';
import { body } from 'express-validator/check';

const middleware = {};

middleware.validate = (method) => {
  const passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})');

  switch (method) {
    case 'createUser': {
      return [
        body('firstName', 'firstName is required')
          .not().isEmpty()
          .trim()
          .escape(),
        body('lastName', 'lastName is required')
          .not().isEmpty()
          .trim()
          .escape(),
        body('email', 'Invalid email')
          .isEmail()
          .normalizeEmail(),
        body('password', 'Password is invalid').matches(passwordRegex),
      ];
    }
    default:
      console.log('default');
  }

  return false;
};

middleware.register = (app) => {
  app
    // Parse req object and make data available on req.body
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(expressValidator())
    // Allow cross origin requests
    .use(cors())
    // Logging http requests
    .use(morgan(process.env.MORGAN_OPTION));
};

export default middleware;
