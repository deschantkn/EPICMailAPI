import data from './data';
import createToken from './createToken';
import environment from '../config/environments';

// Container for all the tokens methods
const token = {};

// Tokens - post
// Required data: phone, password
// Optional data: none
token.create = payload => new Promise(async (resolve, reject) => {
  const userId = payload.id;
  if (payload && userId) {
    // Lookup the user who matches that id
    try {
      await data.read('users', userId);

      // create a new token, Set expiration date 1 hour in the future
      const tokenId = createToken(19);
      const expires = Date.now() + 1000 * 60 * 60;
      const tokenObject = {
        id: tokenId,
        userId,
        expires,
      };

      // Store the token
      try {
        await data.create('tokens', tokenId, tokenObject);
        resolve(tokenObject);
      } catch (tokenCreateError) {
        reject(tokenCreateError);
      }
    } catch (userLookupErr) {
      reject(userLookupErr);
    }
  } else {
    reject(new Error('No payload or no user id in paylaod. Cannot create token'));
  }
});

// Verify if a given token is currently valid for a given user
token.verifyToken = tokenId => new Promise(async (resolve, reject) => {
  // check if admin user
  if (tokenId && environment.adminToken && tokenId === environment.adminToken) {
    const adminToken = {
      id: tokenId,
      userId: 2282995324,
      expires: Date.now() + 1000 * 60 * 60 * 5,
    };

    resolve(adminToken);
  } else {
    if (!tokenId) {
      reject();
    }
    // Lookup the token
    try {
      const tokenData = await data.read('tokens', tokenId);

      // Check that the token has not exprired and return it
      if (tokenData.expires > Date.now()) {
        resolve(tokenData);
      } else {
        resolve(false);
      }
    } catch (tokenReadErr) {
      reject(tokenReadErr);
    }
  }
});

export default token;
