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
    const originalname = file.originalname;
    const suffix = originalname.substring(originalname.lastIndexOf('.'));
    cb(null, `${uniqueKey}${suffix}`);
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
  addArticleHandler
} = require('../handler/article');
const {
  addArticleCategorySchema,
  delArticleCategorySchema,
  getArticleCategorySchema,
  updateArticleCategorySchema,
  addArticleSchema
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

module.exports = router;
