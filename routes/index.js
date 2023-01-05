const express = require('express');
const router = express.Router();


const authMiddleware = require('../middlewares/auth-middleware');
const signupRouter = require('./signup.route');
const loginRouter = require('./login.route');

router.use('/signup', signupRouter);
router.use('/login', loginRouter);

router.get('/users/me', authMiddleware, async (req, res) => {
    res.json({ result: 'success', user: res.locals.user });
  });

module.exports = router;