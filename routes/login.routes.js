const express = require('express');
const router = express.Router();

const LoginController = require('../controllers/login.controller');
const loginController = new LoginController();

router.post('/', loginController.createUser);

module.exports = router;