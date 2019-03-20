import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../../../db/index';
import environment from '../../../config/environments';
import queries from '../../../db/queries';

const { newUser, findUserByEmail } = queries;

export default {
  /**
   * POST - /auth/signup Create a new user
   */
  signup: async (req, res) => {
    // hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 8);

    // save user
    const values = [
      req.body.firstName,
      req.body.lastName,
      hashedPassword,
      req.body.email,
    ];

    try {
      const { rows } = await db.query(newUser, values);

      // create token
      const token = jwt.sign({ id: rows[0].id }, environment.secret, { expiresIn: 86400 });

      // return success response
      return res.status(201).json({ status: 201, data: [{ token }] });
    } catch (error) {
      return res.status(500).json({ status: 500, error: `Internal server error: ${error}` });
    }
  },
  signin: async (req, res) => {
    // Find user
    try {
      const { rows } = await db.query(findUserByEmail, [req.body.email]);
      // if no user if found
      if (rows.length === 0) {
        return res.status(401).json({ status: 400, error: 'Either password or email is invalid' });
      }

      // compare passwords
      const passwordIsValid = bcrypt.compareSync(req.body.password, rows[0].password);
      if (passwordIsValid) {
        // create token
        const token = jwt.sign({ id: rows[0].id }, environment.secret, { expiresIn: 86400 });
        return res.status(200).json({ status: 200, data: [{ token }] });
      }

      return res.status(401).json({ status: 401, error: 'Either password or email is invalid' });
    } catch (error) {
      return res.status(500).json({ status: 500, error: `Internal server error: ${error}` });
    }
  },
};
