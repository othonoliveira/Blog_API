const { Category } = require('../models');

const addCategory = async (name) => {
  if (!name) return { status: 400, message: '"name" is required' };
  const response = await Category.create({ name });

  return { status: 201, message: response };
};

module.exports = {
  addCategory,
};