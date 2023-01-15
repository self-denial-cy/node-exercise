const express = require('express');
const cors = require('cors');
const Joi = require('joi');
const { expressjwt } = require('express-jwt');
const userRouter = require('./router/user');
const { secretKey } = require('./config/index');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(expressjwt({ secret: secretKey, algorithms: ['HS256'] }).unless({ path: [/^\/api\//] }));

app.use('/api', userRouter);

// 全局错误捕获
app.use((err, req, res, next) => {
  if (err instanceof Joi.ValidationError) return res.send({ ret: 0, msg: err.message });
  if (err.name === 'UnauthorizedError') {
    return res.send({ ret: -1, msg: '非法的Token或者Token已过期' });
  }
  res.send({ ret: 0, msg: '系统异常' });
});

app.listen(3001, () => {
  console.log('server running at http://127.0.0.1:3001');
});
