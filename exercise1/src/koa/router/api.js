const Router = require('koa-router');
const router = new Router();
const multer = require('@koa/multer');
const path = require('path');
const fs = require('fs');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const targetDir = path.join(__dirname, '../uploads');
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

// 支持链式调用
router
  .get('/', (ctx, next) => {
    ctx.body = ctx.query;
  })
  .post('/', (ctx, next) => {
    ctx.body = ctx.request.body;
  })
  .put('/', (ctx, next) => {})
  .del('/:id', (ctx, next) => {
    ctx.body = ctx.params;
  });

router.post('/login', (ctx, next) => {
  const { username, password } = ctx.request.body;
  if (username === 'admin' && password === '123456') {
    ctx.session.isLogin = true;
    ctx.body = { status: 0 };
  } else {
    ctx.body = { status: 1 };
  }
});

router.post('/upload', upload.single('avatar'), (ctx, next) => {
  console.log(ctx.request.body);
  console.log(ctx.file);
  ctx.body = { status: 0 };
});

module.exports = router;
