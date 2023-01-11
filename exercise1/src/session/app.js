const express = require('express');
const session = require('express-session');

const app = express();

// 配置 session 中间件
// 只有成功配置了 session 中间件后，req 中才存在 session 属性
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
  })
);
app.use(express.static('./pages'));
app.use(express.urlencoded({ extended: true }));

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
  // 清空当前客户端对应的 session 信息
  req.session.destroy();
  res.send({ status: 0, msg: '退出登录' });
});

app.listen(8101, () => {
  console.log('server running at http://127.0.0.1:8101');
});
