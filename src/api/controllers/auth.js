import validationHandler from '../../helpers/validationHandler';
import { validationResult } from 'express-validator/check';

export default {
  /**
   * POST - /auth/signup Create a new user
   */
  signup: async (req, res, next) => {
    try {
      await validationHandler(next, validationResult(req));
      
      res.json({ data: req.body });
    } catch (e) {
      res.status(400).json({ status: 400, error: e });
    }
  },
};
