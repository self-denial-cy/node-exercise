const db = require('../db/index');
// 对密码进行加密后，无法逆向解密
// 同一明文密码多次加密后的结果不相同，安全性更高
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secretKey, expiresIn } = require('../config/index');

// 用户注册接口 handler
exports.registerHandler = (req, res) => {
  const userInfo = req.body;
  // 非空判断
  // if (!userInfo.userNo || !userInfo.password) {
  //   return res.send({ ret: 0, msg: '用户名或密码不能为空' });
  // }
  let sqlStr = 'select * from ev_users where user_no=?';
  db.query(sqlStr, userInfo.userNo, (err, results) => {
    if (err) {
      return res.send({ ret: 0, msg: err.message });
    }
    // 判断用户名是否被占用
    if (results.length) {
      return res.send({ ret: 0, msg: '用户名已被占用，请更换' });
    }
    // 用户名唯一，可以注册
    // 调用 bcrypt.hashSync 对明文密码进行加密
    // 参数列表：要加密的明文密码、加盐长度
    userInfo.password = bcrypt.hashSync(userInfo.password, 10);
    // 插入用户数据
    sqlStr = 'insert into ev_users set ?';
    db.query(sqlStr, { user_no: userInfo.userNo, password: userInfo.password }, (err, result) => {
      if (err) {
        return res.send({ ret: 0, msg: err.message });
      }
      if (result.affectedRows !== 1) return res.send({ ret: 0, msg: '注册失败，请稍后再试' });
      res.send({ ret: 1, msg: '恭喜用户注册成功' });
    });
  });
};

// 用户登录接口 handler
exports.loginHandler = (req, res) => {
  const userInfo = req.body;
  const sqlStr = 'select * from ev_users where user_no=?';
  db.query(sqlStr, userInfo.userNo, (err, results) => {
    if (err) {
      return res.send({ ret: 0, msg: err.message });
    }
    // 账号错误，该账号未注册
    if (!results.length) {
      return res.send({ ret: 0, msg: '登录失败，账号或密码错误' });
    }
    const firstRow = results[0];
    const compareResult = bcrypt.compareSync(userInfo.password, firstRow.password);
    // 密码错误
    if (!compareResult) {
      return res.send({ ret: 0, msg: '登录失败，账号或密码错误' });
    }
    // 登录成功，生成 Token 返回
    const user = { ...firstRow };
    delete user.password;
    delete user.avatar;
    const token = jwt.sign(user, secretKey, { expiresIn });
    res.send({ ret: 1, msg: '登录成功', data: `Bearer ${token}` });
  });
};
