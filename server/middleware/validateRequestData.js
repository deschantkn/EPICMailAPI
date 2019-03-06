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
        body('password', 'Password is missing or invalid')
          .not().isEmpty()
          .matches(passwordRegex),
      ];
    }

    case 'signin': {
      return [
        body('email', 'Valid email is required')
          .isEmail()
          .normalizeEmail(),
        body('password', 'Password is invalid')
          .not().isEmpty()
          .matches(passwordRegex),
      ];
    }

    case 'newMessage': {
      return [
        body('from', 'Email address of sender is missing or invalid')
          .isEmail()
          .normalizeEmail(),
        body('to', 'Email address of recipient is missing or invalid')
          .isEmail()
          .normalizeEmail(),
        body('subject', 'Subject is required')
          .not().isEmpty()
          .isString(),
        body('message', 'Email must contain a message')
          .not().isEmpty()
          .isString(),
      ];
    }

    default:
      return [];
  }
};
