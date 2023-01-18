const express = require('express');
const validate = require('../middleware/validate');
const { getArticleCategoryListHandler, addArticleCategoryHandler } = require('../handler/article');
const { addArticleCategorySchema } = require('../schema/article');

const router = express.Router();

// 获取文章分类列表
router.get('/category/list', getArticleCategoryListHandler);

// 新增文章分类
router.post('/category/add', validate(addArticleCategorySchema), addArticleCategoryHandler);

module.exports = router;
