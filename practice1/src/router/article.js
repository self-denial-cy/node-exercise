const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const targetDir = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir);
    }
    cb(null, targetDir);
  },
  filename: (req, file, cb) => {
    const uniqueKey = '' + Date.now() + Math.round(Math.random() * 1e9);
    const mimetype = file.mimetype;
    const suffix = mimetype.substring(mimetype.lastIndexOf('/') + 1);
    cb(null, `${uniqueKey}.${suffix}`);
  }
});
const upload = multer({ storage });
const validate = require('../middleware/validate');
const {
  getArticleCategoryListHandler,
  addArticleCategoryHandler,
  delArticleCategoryHandler,
  getArticleCategoryHandler,
  updateArticleCategoryHandler,
  addArticleHandler,
  pageArticleHandler,
  delArticleHandler
} = require('../handler/article');
const {
  addArticleCategorySchema,
  delArticleCategorySchema,
  getArticleCategorySchema,
  updateArticleCategorySchema,
  addArticleSchema,
  pageArticleSchema,
  delArticleSchema
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

// 新增文章
router.post('/add', upload.single('coverImg'), validate(addArticleSchema), addArticleHandler);

// 分页查询文章列表
router.get('/page', validate(pageArticleSchema), pageArticleHandler);

// 删除文章
router.get('/del/:id', validate(delArticleSchema), delArticleHandler);

module.exports = router;
