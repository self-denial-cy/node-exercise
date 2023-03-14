const Router = require('koa-router');
const apiRouter = require('./api');
const viewRouter = require('./view');
const loginRouter = require('./login');

const router = new Router();

// 统一加前缀
// router.prefix('/api');

// 先注册成路由级中间件
router.use('/api', apiRouter.routes(), apiRouter.allowedMethods());
router.use('/view', viewRouter.routes(), viewRouter.allowedMethods());
router.use('/login', loginRouter.routes(), loginRouter.allowedMethods());

// 重定向
router.redirect('/', '/view');

module.exports = router;
