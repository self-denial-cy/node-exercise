const express = require('express');
const { registerHandler, loginHandler } = require('../handler/user');
const validate = require('../middleware/validate');
const { registerSchema } = require('../schema/user');

const router = express.Router();

// 用户注册【局部中间件校验参数】
router.post('/register', validate(registerSchema), registerHandler);

// 用户登录
router.post('/login', loginHandler);

module.exports = router;
