const express = require('express');
const {
  getUserInfoHandler,
  updateUserInfoHandler,
  updatePwdHandler,
  updateAvatarHandler
} = require('../handler/userInfo');
const validate = require('../middleware/validate');
const { updateUserInfoSchema, updatePwdSchema, updateAvatarSchema } = require('../schema/userInfo');

const router = express.Router();

// 获取当前登录用户信息
router.get('/getUserInfo', getUserInfoHandler);

// 更新用户信息
router.post('/updateUserInfo', validate(updateUserInfoSchema), updateUserInfoHandler);

// 更新登录密码
router.post('/updatePwd', validate(updatePwdSchema), updatePwdHandler);

// 更新头像
router.post('/updateAvatar', validate(updateAvatarSchema), updateAvatarHandler);

module.exports = router;
