const express = require('express');
const router = express.Router();
const userRouter = require('./apis/user');
const registerRouter = require('./apis/register');
const loginRouter = require('./apis/login');

router.use(userRouter);
router.use(registerRouter);
router.use(loginRouter);

module.exports = router;
