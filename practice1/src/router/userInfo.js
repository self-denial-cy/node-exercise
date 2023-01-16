const express = require('express');
const { getUserInfoHandler } = require('../handler/userInfo');

const router = express.Router();

// 获取当前登录用户信息
router.get('/getUserInfo', getUserInfoHandler);

module.exports = router;
