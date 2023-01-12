const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken'); // 用于生成 JWT 字符串
const { expressjwt } = require('express-jwt'); // 用于将 JWT 字符串解析还原成 JSON 对象

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// 为了保证 JWT 字符串的安全性，防止 JWT 字符串在网络传输过程中被别人破解篡改，需要专门定义一个用于加密和解密的 secret 密钥
const secretKey = '1qazXSW@#EDCvfr4%TGBnhy6&UJM,ki8(OL>/;p0';
// 客户端每次访问那些需要身份认证的接口时，都需要主动通过请求头中的 【Authorization】 字段，以 【Bearer token】 形式发送到服务器进行身份认证
// 此时，服务器可以通过 express-jwt 中间件，自动将客户端发送的 token 解析还原为 JSON 对象
app.use(expressjwt({ secret: secretKey, algorithms: ['HS256'] }).unless({ path: [/^\/api\//] })); // unless 方法排除不需要身份认证的接口
// 配置好 express-jwt 中间件后，req 对象上会新增 auth 属性，是解密后的用户信息对象

app.post('/api/login', (req, res) => {
  const body = req.body;
  if (body.username !== 'admin' || body.password !== '123456') {
    return res.send({ ret: 0, msg: '登录失败' });
  }
  const user = { id: 1, name: '蝙蝠侠', gender: '男' };
  // 参数列表：用户信息对象、密钥、配置对象（有效期）
  const token = jwt.sign(user, secretKey, { expiresIn: '30s' });
  res.send({ ret: 1, msg: '登录成功', data: token });
});

app.get('/userInfo', (req, res) => {
  res.send({ ret: 1, msg: '获取用户信息成功', data: req.auth });
});

// 当 token 过期或者不合法，会产生一个解析失败的错误，影响项目正常运行，可以通过全局错误捕获处理
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.send({ ret: -1, msg: '非法的Token或者Token已过期' });
  }
  res.send({ ret: 0, msg: '系统异常' });
});

app.listen(8102, () => {
  console.log('server running at http://127.0.0.1:8102');
});
