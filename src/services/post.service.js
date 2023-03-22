const validateCategories = require('../middleware/validateCategories');
const { BlogPost, PostCategory } = require('../models');

const createPost = async ({ userId, title, content, categoryIds: holder }) => {
  const categoryIds = [...new Set(holder)];
  if (!title || !content || !holder) {
    return { status: 400, message: 'Some required fields are missing' };
  }
  if (await validateCategories(holder) === 'CATEGORY_NOT_FOUND') {
    return { status: 400, message: 'one or more "categoryIds" not found' };
  }
  const response = await BlogPost.create({ title,
    userId,
    content,
    categoryIds,
    updated: new Date().toISOString(),
    published: new Date().toISOString() });
  const postIds = categoryIds.map((categoryId) => ({
    postId: response.id,
    categoryId }));
  await PostCategory.bulkCreate(postIds);
  return { status: 201, message: response };
};

module.exports = {
  createPost,
};