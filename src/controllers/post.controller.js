const postService = require('../services/post.service');
const tokenValidation = require('../middleware/tokenValidation');

const createPoste = async (req, res) => {
  const { authorization } = req.headers;
  const info = req.body;

  const { email, 
    status: tokenStatus, message: tokenMessage, id } = await tokenValidation(authorization);
  if (!email) return res.status(tokenStatus).json({ message: tokenMessage });

  const { status, message } = await postService.createPost({ ...info, userId: id });

  if (typeof message === 'string') return res.status(status).json({ message });

  return res.status(status).json(message);
};

const getAllPosts = async (req, res) => {
  const { authorization } = req.headers;

  const { email, 
    status: tokenStatus, message: tokenMessage } = await tokenValidation(authorization);
  if (!email) return res.status(tokenStatus).json({ message: tokenMessage });

  const { status, message } = await postService.getAllPosts();

  return res.status(status).json(message);
};

const getAllPostsById = async (req, res) => {
  const { authorization } = req.headers;
  const { id } = req.params;

  const { email, 
    status: tokenStatus, message: tokenMessage } = await tokenValidation(authorization);
  if (!email) return res.status(tokenStatus).json({ message: tokenMessage });

  const { status, message } = await postService.getAllPostsById(id);

  if (message === 'Post does not exist') return res.status(status).json({ message });

  return res.status(status).json(message[0]);
};

const updatePost = async (req, res) => {
  const { authorization } = req.headers;
  const { id } = req.params;
  const { title, content } = req.body;

  const { email, 
    status: tokenStatus, message: tokenMessage, id: userId } = await tokenValidation(authorization);
  if (!email) return res.status(tokenStatus).json({ message: tokenMessage });

  const targetPost = await postService.getPostById(id);

  if (targetPost.dataValues.userId !== userId) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  const { status, message } = await postService.updatePost({ title, content, id });

  if (message === 'Some required fields are missing') return res.status(status).json({ message });

  return res.status(status).json(message[0]);
};

const deletePost = async (req, res) => {
  const { authorization } = req.headers;
  const { id } = req.params;

  const { email, 
    status: tokenStatus, message: tokenMessage, id: userId } = await tokenValidation(authorization);
  if (!email) return res.status(tokenStatus).json({ message: tokenMessage });

  const targetPost = await postService.getPostById(id);
  if (!targetPost) return res.status(404).json({ message: 'Post does not exist' });

  if (targetPost.dataValues.userId !== userId) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  const { status } = await postService.deletePost(id);

  return res.status(status).json(null);
};

module.exports = {
  createPoste,
  getAllPosts,
  getAllPostsById,
  updatePost,
  deletePost,
};