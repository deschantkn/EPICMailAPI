import { body } from 'express-validator/check';

export default (method) => {
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

    case 'signin': {
      return [];
    }

    default:
      return [];
  }
};
