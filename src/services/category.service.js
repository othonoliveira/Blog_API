const { Category } = require('../models');

const getAllCategories = async () => {
  const response = await Category.findAll({ order: [['id', 'ASC']] });

  return { status: 200, message: response };
};

const addCategory = async (name) => {
  if (!name) return { status: 400, message: '"name" is required' };
  const response = await Category.create({ name });

  return { status: 201, message: response };
};

module.exports = {
  addCategory,
  getAllCategories,
};