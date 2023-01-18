const express = require('express');
const validate = require('../middleware/validate');
const {
  getArticleCategoryListHandler,
  addArticleCategoryHandler,
  delArticleCategoryHandler
} = require('../handler/article');
const { addArticleCategorySchema, delArticleCategorySchema } = require('../schema/article');

const router = express.Router();

// 获取文章分类列表
router.get('/category/list', getArticleCategoryListHandler);

// 新增文章分类
router.post('/category/add', validate(addArticleCategorySchema), addArticleCategoryHandler);

// 删除文章分类
router.get('/category/del/:id', validate(delArticleCategorySchema), delArticleCategoryHandler);

module.exports = router;
