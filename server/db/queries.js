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
      name VARCHAR(128) NOT NULL
    );
    CREATE TABLE IF NOT EXISTS
    group_members(
      id SERIAL PRIMARY KEY,
      groupId INTEGER REFERENCES groups(id) ON DELETE CASCADE,
      memberId INTEGER REFERENCES users(id),
      role VARCHAR(50) NOT NULL
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
  getAllReceivedMessages: 'SELECT * FROM messages WHERE receiverId = $1;',
  getSentMessages: 'SELECT * FROM messages WHERE senderId = $1;',
  getMessagesByStatus: 'SELECT * FROM messages WHERE receiverId = $1 AND status = $2;',
  getMessageById: 'SELECT * FROM messages WHERE id = $1 AND ( receiverId = $2 OR senderId = $2);',
  deleteMessageById: 'DELETE FROM messages WHERE id = $1 AND ( receiverId = $2 ) returning *;',
  newGroup: 'INSERT INTO groups(name) VALUES ($1) returning *;',
  insertGroupMember: 'INSERT INTO group_members(groupId, memberId, role) VALUES ($1, $2, $3) returning *;',
  getGroupById: `
    SELECT groups.id, groups.name, group_members.role
    FROM groups, group_members 
    WHERE groups.id = $1
    AND group_members.memberId = $2;`,
  getMyGroup: `
    SELECT groups.id, groups.name, group_members.role
    FROM groups, group_members 
    WHERE groups.name = $1
    AND groups.id = $4
    AND group_members.memberId = $2
    AND group_members.role = $3;`,
  getMyGroups: `
    SELECT groupId
    FROM group_members AS gm 
    WHERE gm.memberId = $1 AND gm.role = $2;`,
  newGroupName: `
    UPDATE groups
    SET name = $1
    FROM group_members
    WHERE group_members.memberId = $2 AND groups.id = $3 AND group_members.role = $4
    returning groups.id, name, role;`,
  deleteMyGroup: `
    DELETE FROM groups 
    USING group_members
    WHERE groups.id = $1 AND group_members.memberId = $2 AND group_members.role = $3
    returning groups.id, groups.name, group_members.role;
  `,
};
