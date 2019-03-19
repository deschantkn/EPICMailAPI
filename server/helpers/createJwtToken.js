import jwt from 'jsonwebtoken';
import environment from '../config/environments';

export default id => jwt.sign({ userId: id }, environment.secret, { expiresIn: '1d' });
