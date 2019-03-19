import db from '../../../db';
import queries from '../../../db/queries';

const { newMessage, findUserByEmail } = queries;

export default {
  newMessage: async (req, res) => {
    const {
      to,
      subject,
      message,
      status,
      parentMessageId,
    } = req.body;

    // message sender
    const { id: sender } = req.user;
    // find message receiver
    try {
      const { rows } = await db.query(findUserByEmail, [to]);
      if (!rows[0]) {
        return res.status(400).json({ status: 400, message: 'Message receiver does not exist' });
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
    
  },
  getUnreadMessages: async (req, res) => {
    
  },
  getSentMessages: async (req, res) => {
    
  },
  getOneMessage: async (req, res) => {
    
  },
  deleteOneMessage: async (req, res) => {
    
  },
};
