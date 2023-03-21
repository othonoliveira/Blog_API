const jwt = require('jsonwebtoken');
require('dotenv/config');

const secret = process.env.JWT_SECRET || 'vaquinhas';

const validateToken = (token) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded.data;
  } catch (err) {
    return 'INVALID_TOKEN';
  }
};

module.exports = validateToken;