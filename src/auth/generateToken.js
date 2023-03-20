const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'vaquinhas';

module.exports = ({ expires, payload }) => {
  try {
    const jwtConfig = {
      expiresIn: expires,
      algorithm: 'HS256',
    };

    return jwt.sign({ data: payload }, secret, jwtConfig);
  } catch (err) {
    return err;
  }
};