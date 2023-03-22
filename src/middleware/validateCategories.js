const categoryService = require('../services/category.service');

const validateCategories = async (categoryIds) => {
  const promise = categoryIds.map((id) => (
    categoryService.getCategoryById(id)
  ));

  const result = await Promise.all(promise);

  const response = await result.find((value) => value === 'CATEGORY_NOT_FOUND');
  if (response === 'CATEGORY_NOT_FOUND') return 'CATEGORY_NOT_FOUND';

  return null;
};

module.exports = validateCategories;