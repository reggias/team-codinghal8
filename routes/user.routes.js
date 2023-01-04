const express = require('express');
const router = express.Router();

const middleware = require('../middlewares/auth-middleware')

const LoginController = require('../controllers/user.controller');
const loginController = new LoginController();

router.post('/', loginController.createUser);
router.post('/', loginController.find);

module.exports = userRouter;