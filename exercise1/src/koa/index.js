const Koa = require('koa');
const static = require('koa-static');
const bodyParser = require('koa-bodyparser');
const views = require('koa-views');
const session = require('koa-session');
const path = require('path');
const router = require('./router');

// express 对比 koa：底层设计有所区别，koa 的洋葱模型需要深入研究下
const app = new Koa();

// 静态资源中间件
app.use(static(path.join(__dirname, 'public')));

// 解析请求体参数【解析不了 multipart/form-data 格式的数据】
app.use(bodyParser());

// 配置模板引擎
app.use(views(path.join(__dirname, 'views'), { extension: 'ejs' }));

// 配置 session
app.keys = ['secret1', 'secret2', 'secret3'];
app.use(
  session(
    {
      key: 'koa.session.id',
      maxAge: 1000 * 60 * 60
    },
    app
  )
);

app.use(async (ctx, next) => {
  if (ctx.url === '/favicon.ico') return;
  if (ctx.url.includes('login')) {
    await next();
    return;
  }
  if (ctx.session.isLogin) {
    await next();
    ctx.session.timestamp = Date.now(); // 刷新过期时间
  } else {
    ctx.redirect('/login');
  }
});

// 再注册成应用级中间件
app.use(router.routes()).use(router.allowedMethods()); // 对于请求路径匹配，但是请求方法不对的情况，加上 allowedMethods 时，会自动提示 405 Method Not Allowed，否则提示 404 Not Found

app.listen(3000);
