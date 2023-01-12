const express = require('express');
const { register, login } = require('./handler/user');

const router = express.Router();

// 用户注册
router.post('/register', register);

// 用户登录
router.post('/login', login);

module.exports = router;
