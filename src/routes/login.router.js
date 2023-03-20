const express = require('express');
const loginController = require('../controllers/login.controller');

const loginRouter = express.Router();

loginRouter.post('/', loginController.logIn);

module.exports = loginRouter;