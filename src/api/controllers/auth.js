import { validationResult } from 'express-validator/check';
import validationHandler from '../../helpers/validationHandler';
import data from '../../helpers/data';

export default {
  /**
   * POST - /auth/signup Create a new user
   */
  signup: async (req, res, next) => {
    try {
      await validationHandler(next, validationResult(req));
      const id = generateId();
      // Make sure user does not exist
      data.read('users', )
      res.json({ data: req.body });
    } catch (e) {
      res.status(400).json({ status: 400, error: e });
    }
  },
};
