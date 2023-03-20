const generateToken = require('../auth/generateToken');
const userValidation = require('../middleware/userValidation');
const { User } = require('../models');

const addUser = async ({ displayName, email, password, image }) => {
  const { status, message } = userValidation({ displayName, email, password });
  console.log(status);
  if (message) return { status, message };
  const tryUser = await User.findOne({ where: { email } });
  if (tryUser) return { status: 409, message: 'User already registered' };

  const newUser = await User.create({ displayName, email, password, image });

  const token = generateToken({
    expires: 6000, payload: { email, id: newUser.id } });

  return { status: 201, token };
};

module.exports = {
  addUser,
};