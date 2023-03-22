const express = require('express');
const postController = require('../controllers/post.controller');

const postRouter = express.Router();

postRouter.post('/', postController.createPoste);

postRouter.get('/', postController.getAllPosts);

postRouter.get('/:id', postController.getAllPostsById);

postRouter.put('/:id', postController.updatePost);

postRouter.delete('/:id', postController.deletePost);

module.exports = postRouter;