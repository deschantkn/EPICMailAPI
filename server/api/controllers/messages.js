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
  getReceivedMessages: async (req, res, next) => {
    try {
      await validationHandler(next, validationResult(req));
      // List all messages in db
      const msgIds = await data.list('messages');

      // Fetch all messages
      const messages = [];
      async.forEach(msgIds, async (msgId, callback) => {
        try {
          const msgObject = await data.read('messages', msgId);
          messages.push(msgObject);
          callback();
        } catch (error) {
          res.status(500).json({ status: 500, error: 'Could not fetch message object' });
        }
      }, () => {
        // Filter messages where recipient is this user
        const receivedMessages = messages.filter(msg => msg.to === req.token.userId);
        if (receivedMessages.length <= 0) {
          res.status(404).json({ status: 404, error: 'No received messages found for this user' });
        }
        res.status(200).json({ status: 200, data: receivedMessages });
      });
    } catch (error) {
      res.status(400).json({ status: 400, error: `${error}` });
    }
  },
};
