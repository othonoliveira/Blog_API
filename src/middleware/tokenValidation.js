const validateToken = require('../auth/validateToken');

const tokenValidation = (authorization) => {
    if (!authorization) return { status: 401, message: 'Token not found' };

    const userData = validateToken(authorization);
    if (userData === 'INVALID_TOKEN') return { status: 401, message: 'Expired or invalid token' };
    return userData;
};

module.exports = tokenValidation;