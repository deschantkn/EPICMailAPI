import db from '../db';

export default async (req, res, next) => {
  // Check if email is taken
  const query = 'SELECT id FROM users WHERE email = $1;';

  try {
    const { rows } = await db.query(query, [req.body.email]);
    if (rows.length === 0) {
      return next();
    }

    return res.status(400).json({ status: 400, error: 'This email address is already taken. Please use a different one.' })
  } catch (error) {
    return res.status(500).json({ status: 500, error: `Internal Server Error:\n${error}` });
  }
};
