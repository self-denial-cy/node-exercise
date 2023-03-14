const Router = require('koa-router');
const router = new Router();

router.get('/', async (ctx, next) => {
  await ctx.render('view', { message: 'hello koa' }); // 异步读取模板文件
});

module.exports = router;
