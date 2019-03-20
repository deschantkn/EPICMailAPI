export default {
  addTables: `
    CREATE TABLE IF NOT EXISTS
    users(
      id SERIAL PRIMARY KEY,
      firstName VARCHAR(128) NOT NULL,
      lastName VARCHAR(128) NOT NULL,
      password VARCHAR(128) NOT NULL,
      email VARCHAR(128) UNIQUE NOT NULL
    );
    CREATE TABLE IF NOT EXISTS
    groups(
      id SERIAL PRIMARY KEY,
      name VARCHAR(128) NOT NULL,
      ownerId INTEGER REFERENCES users(id) 
    );
    CREATE TABLE IF NOT EXISTS
    group_members(
      id SERIAL PRIMARY KEY,
      groupId INTEGER REFERENCES groups(id),
      memberId INTEGER REFERENCES users(id)
    );
    CREATE TABLE IF NOT EXISTS
    messages(
      id SERIAL PRIMARY KEY,
      senderId INTEGER REFERENCES users(id) NOT NULL,
      receiverId INTEGER REFERENCES users(id) NOT NULL,
      parentMessageId INTEGER REFERENCES messages(id),
      subject VARCHAR(128) NOT NULL,
      message TEXT NOT NULL,
      status VARCHAR(10) NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `,
  delTables: `
    DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS messages CASCADE;
    DROP TABLE IF EXISTS groups CASCADE;
    DROP TABLE IF EXISTS group_members CASCADE;
  `,
  getUserById: 'SELECT * FROM users WHERE id = $1',
  findUserByEmail: 'SELECT id, password FROM users WHERE email = $1;',
  newUser: `
    INSERT INTO
    users(firstName, lastName, password, email)
    VALUES($1, $2, $3, $4) returning id;
  `,
  newMessage: `
    INSERT INTO messages(senderId, receiverId, parentMessageId, subject, message, status) 
    VALUES ($1, $2, $3, $4, $5, $6)
    returning *;
  `,
  getAllReceivedMessages: 'SELECT * FROM messages WHERE receiverId = $1',
  getSentMessages: 'SELECT * FROM messages WHERE senderId = $1',
  getMessagesByStatus: 'SELECT * FROM messages WHERE receiverId = $1 AND status = $2',
  getMessageById: 'SELECT * FROM messages WHERE id = $1 AND ( receiverId = $2 OR receiverId = $2);',
};
