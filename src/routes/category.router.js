const express = require('express');
const categoryController = require('../controllers/category.controller');

const categoryRouter = express.Router();

categoryRouter.post('/', categoryController.addCategory);

module.exports = categoryRouter;