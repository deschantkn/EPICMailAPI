import { validationResult } from 'express-validator/check';
import async from 'async';
import validationHandler from '../../helpers/validationHandler';
import data from '../../helpers/data';
import generateId from '../../helpers/generateId';


export default {
  newMessage: async (req, res, next) => {
    try {
      await validationHandler(next, validationResult(req));
      // Find the receiver and sender
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
        // @TODO require token and lookup to see if it is still valid
        // Look for email sender
        const sender = users.filter(user => user.email === req.body.from);
        if (sender.length <= 0) {
          return res.status(404).json({ status: 404, error: 'Sender email not found' });
        }
        const [from] = sender;

        // Look for email receiver
        const recipient = users.filter(user => user.email === req.body.to);
        if (recipient.length <= 0) {
          return res.status(404).json({ status: 404, error: 'Recipient email not found' });
        }
        const [to] = recipient;

        // Create and save message object
        const id = generateId();
        const newMessage = {
          id,
          ...req.body,
          from: from.id,
          to: to.id,
          createdOn: new Date(),
        };

        try {
          await data.create('messages', id, newMessage);

          return res.status(201).json({ status: 201, data: [newMessage] });
        } catch (e) {
          return res.status(500).json({ status: 500, error: 'Unable to save message' });
        }
      });
    } catch (e) {
      res.status(400).json({ status: 400, error: `${e}` });
    }
  },
  getReceivedMessages: (req, res) => {
    // Get all messages where current user is the recipient
  },
};
