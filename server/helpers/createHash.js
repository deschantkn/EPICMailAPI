import crypto from 'crypto';
import environment from '../config/environments';

export default (str) => {
  if (typeof (str) === 'string' && str.length > 0) {
    console.log(1);
    const hash = crypto.createHmac('sha256', environment.hashingSecret).update(str).digest('hex');
    return hash;
  }

  return false;
};
