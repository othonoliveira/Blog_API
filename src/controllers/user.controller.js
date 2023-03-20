const userService = require('../services/user.service');

const addUser = async (req, res) => {
  const info = req.body;

  const { status, message, token } = await userService.addUser(info);
  if (message) return res.status(status).json({ message });

  return res.status(status).json({ token });
};

module.exports = {
  addUser,
};