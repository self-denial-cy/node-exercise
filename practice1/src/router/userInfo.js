const express = require('express');
const { getUserInfoHandler, updateUserInfoHandler, updatePwdHandler } = require('../handler/userInfo');
const validate = require('../middleware/validate');
const { updateUserInfoSchema, updatePwdSchema } = require('../schema/userInfo');

const router = express.Router();

// 获取当前登录用户信息
router.get('/getUserInfo', getUserInfoHandler);

// 更新用户信息
router.post('/updateUserInfo', validate(updateUserInfoSchema), updateUserInfoHandler);

// 更新登录密码
router.post('/updatePwd', validate(updatePwdSchema), updatePwdHandler);

module.exports = router;
