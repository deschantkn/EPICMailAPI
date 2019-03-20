import jwt from 'jsonwebtoken';
import db from '../db';
import environment from '../config/environments';
import queries from '../db/queries';

const Auth = {
  verifyToken: async (req, res, next) => {
    const { token } = req.headers;
		console.log('TCL: token', token);
    if (!token) {
      return res.status(401).json({ status: 401, error: 'Token is missing' });
    }
    try {
      const decoded = await jwt.verify(token, environment.secret);
      const { getUserById } = queries;
      const { rows } = await db.query(getUserById, [decoded.id]);

      if (!rows[0]) {
        return res.status(401).json({ status: 401, error: 'Token is invalid' });
      }
      req.user = { id: decoded.id };
      return next();
    } catch (error) {
      return res.status(500).json({ status: 500, error: `Internal server error: ${error}` });
    }
  },
};

export default Auth;
