import db from '../../../db';
import queries from '../../../db/queries';

const {
  newMessage,
  findUserByEmail,
  getAllReceivedMessages,
  getMessagesByStatus,
  getSentMessages,
  getMessageById
} = queries;

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
    const { id: currentUser } = req.user;
    try {
      const { rows: unreadMessages } = await db.query(getMessagesByStatus, [currentUser, 'sent']);
      return res.status(200).json({ status: 200, data: unreadMessages });
    } catch (error) {
      return res.status(500).json({ status: 500, error: `Internal server error: ${error}` });
    }
  },
  getSentMessages: async (req, res) => {
    const { id: currentUser } = req.user;
    try {
      const { rows: sentMessages } = await db.query(getSentMessages, [currentUser]);
      return res.status(200).json({ status: 200, data: sentMessages });
    } catch (error) {
      return res.status(500).json({ status: 500, error: `Internal server error: ${error}` });
    }
  },
  getOneMessage: async (req, res) => {
    const { id: currentUser } = req.user;
    const { messageId } = req.params;
    try {
      const { rows: fetchedMessage } = await db.query(getMessageById, [currentUser, parseInt(messageId, 10)]);
      return res.status(200).json({ status: 200, data: fetchedMessage });
    } catch (error) {
      return res.status(500).json({ status: 500, error: `Internal server error: ${error}` });
    }
  },
  deleteOneMessage: async (req, res) => {
    
  },
};
