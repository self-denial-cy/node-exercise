const express = require('express');
const { registerHandler, loginHandler } = require('../handler/user');

const router = express.Router();

// 用户注册
router.post('/register', registerHandler);

// 用户登录
router.post('/login', loginHandler);

module.exports = router;
