const categoryService = require('../services/category.service');
const tokenValidation = require('../middleware/tokenValidation');

const addCategory = async (req, res) => {
  const { authorization } = req.headers;
  const { name } = req.body;

  const { email, 
    status: tokenStatus, message: tokenMessage } = await tokenValidation(authorization);
  if (!email) return res.status(tokenStatus).json({ message: tokenMessage });

  const { status, message } = await categoryService.addCategory(name);

  if (typeof message === 'string') return res.status(status).json({ message });

  return res.status(status).json(message);
};

const getAllCategories = async (req, res) => {
  const { authorization } = req.headers;

  const { email, 
    status: tokenStatus, message: tokenMessage } = await tokenValidation(authorization);
  if (!email) return res.status(tokenStatus).json({ message: tokenMessage });

  const { status, message } = await categoryService.getAllCategories();

  return res.status(status).json(message);
};

module.exports = {
  addCategory,
  getAllCategories,
};