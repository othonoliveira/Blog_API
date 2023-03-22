const express = require('express');
const postController = require('../controllers/post.controller');

const postRouter = express.Router();

postRouter.post('/', postController.createPoste);

postRouter.get('/', postController.getAllPosts);

module.exports = postRouter;