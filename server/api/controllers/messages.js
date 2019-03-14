import async from 'async';
import data from '../../helpers/data';
import generateId from '../../helpers/generateId';
import token from '../../helpers/token';


export default {
  newMessage: async (req, res) => {
    try {
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

          return res.status(201).json({ status: 201, data: newMessage });
        } catch (e) {
          return res.status(500).json({ status: 500, error: 'Unable to save message' });
        }
      });
    } catch (e) {
      res.status(400).json({ status: 400, error: `${e}` });
    }
  },
  getReceivedMessages: async (req, res) => {
    try {
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
      }, async () => {
        let tokenData;
        try {
          // Verify the token
          tokenData = await token.verifyToken(req.headers.token);
        } catch (error) {
          res.status(401).json({ status: 401, error: 'Invalid or missing request token' });
        }

        // Filter messages where recipient is this user
        const receivedMessages = messages.filter(msg => msg.to === tokenData.userId);
        if (receivedMessages.length <= 0) {
          return res.status(404).json({ status: 404, error: 'No received messages found.' });
        }

        return res.status(200).json({ status: 200, data: receivedMessages });
      });
    } catch (error) {
      res.status(400).json({ status: 400, error: `${error}` });
    }
  },
  getUnreadMessages: async (req, res) => {
    try {
      // List all messages in db
      const msgIds = await data.list('messages');

      // Fetch all messages for filtering
      const messages = [];
      async.forEach(msgIds, async (msgId, callback) => {
        try {
          const msgObject = await data.read('messages', msgId);
          messages.push(msgObject);
          callback();
        } catch (error) {
          res.status(500).json({ status: 500, error: 'Could not fetch message object' });
        }
      }, async () => {
        let tokenData;
        try {
          // Verify the token
          tokenData = await token.verifyToken(req.headers.token);
        } catch (error) {
          res.status(401).json({ status: 401, error: 'Invalid or missing request token' });
        }

        // Filter messages where recipient is this user and status is sent
        const unreadMessages = messages.filter(msg => msg.to === tokenData.userId && msg.status === 'sent');
        if (unreadMessages.length <= 0) {
          return res.status(404).json({ status: 404, error: 'No received messages found for this user' });
        }

        return res.status(200).json({ status: 200, data: unreadMessages });
      });
    } catch (error) {
      res.status(400).json({ status: 400, error: `${error}` });
    }
  },
  getSentMessages: async (req, res) => {
    try {
      // List all messages in db
      const msgIds = await data.list('messages');

      // Fetch all messages for filtering
      const messages = [];
      async.forEach(msgIds, async (msgId, callback) => {
        try {
          const msgObject = await data.read('messages', msgId);
          messages.push(msgObject);
          callback();
        } catch (error) {
          res.status(500).json({ status: 500, error: 'Could not fetch message object' });
        }
      }, async () => {
        let tokenData;
        try {
          // Verify the token
          tokenData = await token.verifyToken(req.headers.token);
        } catch (error) {
          res.status(401).json({ status: 401, error: 'Invalid or missing request token' });
        }

        // Filter messages where this user is the sender
        const sentMessages = messages.filter(msg => msg.from === tokenData.userId);
        if (sentMessages.length <= 0) {
          return res.status(404).json({ status: 404, error: 'No sent messages found for this user' });
        }

        return res.status(200).json({ status: 200, data: sentMessages });
      });
    } catch (error) {
      res.status(400).json({ status: 400, error: `${error}` });
    }
  },
  getOneMessage: async (req, res) => {
    try {
      let tokenData;
      try {
        // Verify the token
        tokenData = await token.verifyToken(req.headers.token);
      } catch (error) {
        res.status(401).json({ status: 401, error: 'Invalid or missing request token' });
      }

      // Get the message
      const message = await data.read('messages', req.params.messageId);

      // check if user is owner or receiver of message
      if ((message.to !== tokenData.userId) && (message.from !== tokenData.userId)) {
        return res.status(401).json({ status: 401, error: 'You are not the authorized to get this message because you are not the owner or the sender' });
      }

      // Return the messages
      return res.status(200).json({ status: 200, data: message });
    } catch (error) {
      return res.status(400).json({ status: 400, error: `${error}` });
    }
  },
  deleteOneMessage: async (req, res) => {
    try {
      let tokenData;
      try {
        // Verify the token
        tokenData = await token.verifyToken(req.headers.token);
      } catch (error) {
        res.status(401).json({ status: 401, error: 'Invalid or missing request token' });
      }

      // Get the message to be deleted
      const message = await data.read('messages', req.params.messageId);

      // check if user is owner or receiver of message
      if ((message.to !== tokenData.userId) && (message.from !== tokenData.userId)) {
        return res.status(401).json({ status: 401, error: 'You are not the authorized to delete this message because you are not the owner or the sender' });
      }

      // Delete the message
      try {
        await data.delete('messages', req.params.messageId);
        return res.status(200).json({ status: 200, data: { message: 'Message was succesfully deleted' } });
      } catch (error) {
        return res.status(500).json({ status: 500, error: `There was an error deleteting the message\n${error}` });
      }
    } catch (error) {
      return res.status(400).json({ status: 400, error: `${error}` });
    }
  },
};
