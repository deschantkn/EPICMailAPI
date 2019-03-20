import db from '../../../db';
import queries from '../../../db/queries';

const { newMessage, findUserByEmail, getAllReceivedMessages, getMessagesByStatus } = queries;

export default {
  newMessage: async (req, res) => {
    const {
      receiverEmail,
      subject,
      message,
      status,
      parentMessageId,
    } = req.body;

    // message sender
    const { id: sender } = req.user;
    // find message receiver
    try {
      const { rows } = await db.query(findUserByEmail, [receiverEmail]);
      if (!rows[0]) {
        return res.status(400).json({ status: 400, error: 'Message receiver does not exist' });
      }
      const { id: receiver } = rows[0];

      // create message
      const { rows: savedMessage } = await db.query(
        newMessage,
        [sender, receiver, parentMessageId, subject, message, status],
      );
      return res.status(201).json({ status: 201, data: [savedMessage[0]] });
    } catch (error) {
      return res.status(500).json({ status: 500, error: `Internal server error: ${error}` });
    }
  },
  getReceivedMessages: async (req, res) => {
    const { id: currentUser } = req.user;
    try {
      const { rows: receivedMessages } = await db.query(getAllReceivedMessages, [currentUser]);
      return res.status(200).json({ status: 200, data: [receivedMessages[0]] });
    } catch (error) {
      return res.status(500).json({ status: 500, error: `Internal server error: ${error}` });
    }
  },
  getUnreadMessages: async (req, res) => {
    try {
      const { rows: receivedMessages } = await db.query(getMessagesByStatus, ['sent']);
      return res.status(200).json({ status: 200, data: receivedMessages });
    } catch (error) {
      return res.status(500).json({ status: 500, error: `Internal server error: ${error}` });
    }
  },
  getSentMessages: async (req, res) => {
    
  },
  getOneMessage: async (req, res) => {
    
  },
  deleteOneMessage: async (req, res) => {
    
  },
};
