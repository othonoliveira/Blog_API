const generateToken = require('../auth/generateToken');
const userValidation = require('../middleware/userValidation');
const { User } = require('../models');

const addUser = async ({ displayName, email, password, image }) => {
  const { status, message } = userValidation({ displayName, email, password });

  if (message) return { status, message };
  const tryUser = await User.findOne({ where: { email } });
  if (tryUser) return { status: 409, message: 'User already registered' };

  const newUser = await User.create({ displayName, email, password, image });

  const token = generateToken({
    expires: 6000, payload: { email, id: newUser.id } });

  return { status: 201, token };
};

const getAllUsers = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });

  return { status: 200, users };
};

const getUserById = async (id) => {
  const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });
  if (!user) return { status: 404, message: 'User does not exist' };

  return { status: 200, user };
};

module.exports = {
  addUser,
  getAllUsers,
  getUserById,
};