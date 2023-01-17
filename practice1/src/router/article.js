const express = require('express');
const validate = require('../middleware/validate');
const { getArticleCategoryListHandler } = require('../handler/article');

const router = express.Router();

// 获取文章分类列表
router.get('/category/list', getArticleCategoryListHandler);

module.exports = router;
