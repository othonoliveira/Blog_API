const express = require('express');
const postController = require('../controllers/post.controller');

const postRouter = express.Router();

postRouter.post('/', postController.createPoste);

module.exports = postRouter;