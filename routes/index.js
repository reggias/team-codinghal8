const express = require('express');
const router = express.Router();

const reviewRouter = require('./review.post')
const userRouter = require('./user.routes')

router.use('/',reviewRouter)
router.use('/',userRouter)

module.exports = router;