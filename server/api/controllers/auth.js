import async from 'async';
import data from '../../helpers/data';
import generateId from '../../helpers/generateId';
import createHash from '../../helpers/createHash';
import token from '../../helpers/token';

export default {
  /**
   * POST - /auth/signup Create a new user
   */
  signup: async (req, res) => {
    try {
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
            id,
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
            res.status(500).json({ status: 500, error: `${createErr}` });
          }
        } else {
          res.status(500).json({ status: 500, error: 'Could not hash password' });
        }
      }
    } catch (e) {
      res.status(400).json({ status: 400, error: `${e}` });
    }
  },
  /**
   * POST - /auth/sign Signin user
   */
  signin: async (req, res) => {
    try {
      // Lists all users in database
      const userIds = await data.list('users');

      // Fetch all users
      const users = [];
      async.forEach(userIds, async (userId, callback) => {
        try {
          const userObject = await data.read('users', userId);
          users.push(userObject);
          callback();
        } catch (error) {
          res.status(500).json({ status: 500, error: 'Could not fetch user object' });
        }
      }, async () => {
        // Look for current user
        const foundUser = users.filter(user => user.email === req.body.email);
        if (foundUser.length <= 0) {
          return res.status(404).json({ status: 404, error: 'Email not found' });
        }

        // Extract user and compare hashed passwords
        const [currentUser] = foundUser;
        const hashedPassword = createHash(req.body.password);

        if (currentUser.password === hashedPassword) {
          // Create auth token
          const payload = {
            id: currentUser.id,
          };
          const newToken = await token.create(payload);

          return res.status(200).json({ status: 200, data: { token: newToken.id } });
        }

        return res.status(401).json({ status: 401, error: 'Invalid password' });
      });
    } catch (e) {
      res.status(400).json({ status: 400, error: `${e}` });
    }
  },
};
