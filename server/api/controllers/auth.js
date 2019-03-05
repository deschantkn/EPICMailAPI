import { validationResult } from 'express-validator/check';
import validationHandler from '../../helpers/validationHandler';
import data from '../../helpers/data';
import generateId from '../../helpers/generateId';
import createHash from '../../helpers/createHash';
import token from '../../helpers/token';

export default {
  /**
   * POST - /auth/signup Create a new user
   */
  signup: async (req, res, next) => {
    try {
      await validationHandler(next, validationResult(req));
      const id = generateId();
      // Make sure user does not exist
      try {
        await data.read('users', id);
        res.status(400).json({ status: 400, error: `User with id ${id} already exists. Try again.` });
      } catch (readErr) {
        // User does not exist so we create one
        // first we hash the password
        const hashedPassword = createHash(req.body.password);

        if (hashedPassword) {
          // Create new user object
          const userObject = {
            ...req.body,
            password: hashedPassword,
          };

          try {
            await data.create('users', id, userObject);
            // Create auth token
            const payload = {
              id,
            };
            const newToken = await token.create(payload);

            res.status(201).json({ status: 201, data: { token: newToken.id } });
          } catch (createErr) {
            res.status(503).json({ status: 500, error: 'Could not create new user' });
          }
        } else {
          res.status(500).json({ status: 500, error: 'Could not hash password' });
        }
      }
    } catch (e) {
      res.status(400).json({ status: 400, error: e });
    }
  },
};
