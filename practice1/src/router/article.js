const express = require('express');
const validate = require('../middleware/validate');
const {
  getArticleCategoryListHandler,
  addArticleCategoryHandler,
  delArticleCategoryHandler,
  getArticleCategoryHandler,
  updateArticleCategoryHandler
} = require('../handler/article');
const {
  addArticleCategorySchema,
  delArticleCategorySchema,
  getArticleCategorySchema,
  updateArticleCategorySchema
} = require('../schema/article');

const router = express.Router();

// 获取文章分类列表
router.get('/category/list', getArticleCategoryListHandler);

// 新增文章分类
router.post('/category/add', validate(addArticleCategorySchema), addArticleCategoryHandler);

// 删除文章分类
router.get('/category/del/:id', validate(delArticleCategorySchema), delArticleCategoryHandler);

// 获取单个文章分类详情
router.get('/category/get/:id', validate(getArticleCategorySchema), getArticleCategoryHandler);

// 修改单个文章分类
router.post('/category/update', validate(updateArticleCategorySchema), updateArticleCategoryHandler);

module.exports = router;
