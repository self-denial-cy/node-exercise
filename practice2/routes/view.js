const express = require('express');
const router = express.Router();
const indexRouter = require('./views/index');
const registerRouter = require('./views/register');
const loginRouter = require('./views/login');
const chatRouter = require('./views/chat');

router.use(indexRouter);
router.use(registerRouter);
router.use(loginRouter);
router.use(chatRouter);

module.exports = router;
