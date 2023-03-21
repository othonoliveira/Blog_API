const tokenValidation = require('../middleware/tokenValidation');
const userService = require('../services/user.service');

const addUser = async (req, res) => {
  const info = req.body;

  const { status, message, token } = await userService.addUser(info);
  if (message) return res.status(status).json({ message });

  return res.status(status).json({ token });
};

const getAllUsers = async (req, res) => {
  const { authorization } = req.headers;

  const { email, id, status, message } = await tokenValidation(authorization);
  if (!email || !id) return res.status(status).json({ message });

  const response = await userService.getAllUsers();

  return res.status(200).json(response.users);
};

const getUserById = async (req, res) => {
  const { authorization } = req.headers;
  const { id } = req.params;

  const { email, 
    status: tokenStatus, message: tokenMessage } = await tokenValidation(authorization);
  if (!email) return res.status(tokenStatus).json({ message: tokenMessage });

  const { status, message, user } = await userService.getUserById(id);

  if (message) return res.status(status).json({ message });

  return res.status(200).json(user);
};

module.exports = {
  addUser,
  getAllUsers,
  getUserById,
};