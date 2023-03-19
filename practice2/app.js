const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const { sign, verify } = require('./utils/JWT');
const viewRouter = require('./routes/view');
const apiRouter = require('./routes/api');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  const reg = /^\/api\//;
  if (!reg.test(req.path)) return next();
  if (req.path.includes('login') || req.path.includes('register')) return next();
  try {
    const token = req.headers.authorization.split(' ')[1];
    const payload = verify(token);
    if (payload) {
      // 刷新登录凭证过期时间，只要用户一直操作，就不会过期；反之，超过设定的过期时间范围都无操作的话，登陆凭证就会失效
      // 这就是无感知刷新登陆凭证
      const newToken = sign({ id: payload.id, username: payload.username });
      // 登录凭证通过响应头返回给客户端，配合上 axios 的拦截器无感知刷新登录凭证【Good】
      res.setHeader('Authorization', newToken);
      next();
    } else {
      res.status(401).send({ ret: -1, msg: '无效的登录凭证或凭证已过期' });
    }
  } catch (err) {
    console.log(err);
    res.status(401).send({ ret: -1, msg: '无效的登录凭证或凭证已过期' });
  }
});

app.use(viewRouter);
app.use('/api', apiRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
