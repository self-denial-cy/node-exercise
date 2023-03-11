const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo'); // connect-redis 连接 redis 将 session 存储到 redis 中

const app = express();

// CSRF 攻击【请求伪造】：浏览器会自动带上 cookie，而不会自动带上 token
// cookie：用户点击了链接，cookie 未失效，导致发起请求后后端以为是用户正常操作，于是进行相关操作【一般针对 GET 这种将参数放在链接中的情况，比较好伪造】
// token：用户点击链接，由于浏览器不会自动带上 token，所以即使发送了请求，后端的 token 验证也不会通过

// 配置 session 中间件
// 只有成功配置了 session 中间件后，req 中才存在 session 属性
app.use(
  session({
    name: 'express.session.id', // 默认名为 connect.sid
    secret: 'secret',
    cookie: {
      // 单位为毫秒【过期时间】
      maxAge: 1000 * 60 * 60 * 24, // 24h
      // 网站通过 https 协议访问时，可以设置为 true
      secure: false
    },
    resave: true, // 为 true 时表示每次设置 session 对象后会重新计算过期时间
    saveUninitialized: false, // 为 true 时会在第一次访问时就生成 cookie，但是这个 cookie 无效【未激活状态】【无副作用】
    // 默认情况下，session 对象都存储在内存中，每次服务重启都会清空内存，所有的 session 对象也都无了
    // 因此可以将 session 对象持久化保存到数据库中【mongodb、redis】
    store: MongoStore.create({
      mongoUrl: 'mongodb://127.0.0.1:27017',
      dbName: 'sessions', // 库
      collectionName: 'sessions', // 集合
      // 单位为秒
      ttl: 60 * 60 * 24 // session 过期时间，如果已经设置了 【cookie.maxAge】 后，ttl 会自动继承该选项
    })
  })
);
app.use(express.static('./pages'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/api/login', (req, res) => {
  const body = req.body;
  if (body.username !== 'admin' || body.password !== '123456') {
    return res.send({ status: 1, msg: '登录失败' });
  }
  // 向 session 中存数据
  req.session.user = body;
  req.session.isLogin = true;
  res.send({ status: 0, msg: '登录成功' });
});

app.get('/api/username', (req, res) => {
  if (!req.session.isLogin) {
    return res.send({ status: 1, msg: 'fail' });
  }
  // 从 session 中取数据
  res.send({ status: 0, msg: 'success', username: req.session.user.username });
});

app.post('/api/logout', (req, res) => {
  // 清空当前客户端对应的 session 信息【只是清除了 session，但是客户端的 cookie 没有清除】
  req.session.destroy();
  res.send({ status: 0, msg: '退出登录' });
});

app.listen(8101, () => {
  console.log('server running at http://127.0.0.1:8101');
});
