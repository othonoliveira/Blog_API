const validateCategories = require('../middleware/validateCategories');
const { BlogPost, PostCategory, User, Category } = require('../models');

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

const getAllPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ] });

  return { status: 200, message: posts };
};

const getAllPostsById = async (id) => {
  const posts = await BlogPost.findAll({
    where: { id },
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ] });

  if (posts.length === 0) return { status: 404, message: 'Post does not exist' };

  return { status: 200, message: posts };
};

const getPostById = async (id) => {
  const response = await BlogPost.findByPk(id);

  return response;
};

const updatePost = async ({ title, content, id }) => {
  if (!title || !content || !id) {
    return { status: 400, message: 'Some required fields are missing' };
  }

  await BlogPost.update(
    { title, content, updated: new Date().toISOString() },
    { where: { id } },
    );
  
  const response = await getAllPostsById(id);

  return { status: 200, message: response.message };
};

const deletePost = async (id) => {
  BlogPost.destroy({ where: { id }, force: true });

  return { status: 204 };
};

module.exports = {
  createPost,
  getAllPosts,
  getAllPostsById,
  updatePost,
  getPostById,
  deletePost,
};