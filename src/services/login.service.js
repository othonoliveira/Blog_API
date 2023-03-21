const { User } = require('../models');
const generateToken = require('../auth/generateToken');

const logIn = async ({ email, password }) => {
  const user = await User.findOne({ where: { email, password } });

  if (!user) return { status: 400, message: 'Invalid fields' };

  const token = generateToken({
    expires: 6000,
    payload: { email, id: user.id },
  });
  return token;
};

module.exports = {
  logIn,
};