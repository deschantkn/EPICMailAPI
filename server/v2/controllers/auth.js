import async from 'async';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../../db/index';
import data from '../../helpers/data';
import generateId from '../../helpers/generateId';
import createHash from '../../helpers/createHash';
import environment from '../../config/environments';

export default {
  /**
   * POST - /auth/signup Create a new user
   */
  signup: async (req, res) => {
    // hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 8);

    // save user
    const text = `INSERT INTO
      users(firstName, lastName, password, email)
      VALUES($1, $2, $3, $4) returning id;
    `;
    const values = [
      req.body.firstName,
      req.body.lastName,
      hashedPassword,
      req.body.email,
    ];

    try {
      const { rows } = await db.query(text, values);

      // create token
      const token = jwt.sign({ id: rows[0].id }, environment.secret, { expiresIn: 86400 });

      // return success response
      return res.status(201).json({ status: 201, data: [{ token }] });
    } catch (error) {
      return res.status(500).json({ status: 500, error: `Error creating user account, ${error}` });
    }
  },
  // signin: async (req, res) => {

  // },
};
