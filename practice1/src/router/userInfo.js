const express = require('express');
const { getUserInfoHandler, updateUserInfoHandler } = require('../handler/userInfo');
const validate = require('../middleware/validate');
const { updateUserInfoSchema } = require('../schema/userInfo');

const router = express.Router();

// 获取当前登录用户信息
router.get('/getUserInfo', getUserInfoHandler);

// 更新用户信息
router.post('/updateUserInfo', validate(updateUserInfoSchema), updateUserInfoHandler);

module.exports = router;
