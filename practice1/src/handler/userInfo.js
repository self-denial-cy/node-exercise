const db = require('../db/index');
const bcrypt = require('bcryptjs');

// 获取当前登录用户信息
exports.getUserInfoHandler = (req, res) => {
  const auth = req.auth;
  const sqlStr = 'select id, user_no as userNo, nickname, email, avatar from ev_users where id=?';
  db.query(sqlStr, auth.id, (err, results) => {
    if (err) {
      return res.send({ ret: 0, msg: err.message });
    }
    if (!results.length) {
      return res.send({ ret: 0, msg: '查无该用户' });
    }
    const firstRow = results[0];
    res.send({ ret: 1, msg: '查询成功', data: firstRow });
  });
};

// 更新用户信息
exports.updateUserInfoHandler = (req, res) => {
  const body = req.body;
  // 因为参数与表中字段一致，可以使用快捷更新
  const sqlStr = 'update ev_users set ? where id=?';
  db.query(sqlStr, [body, body.id], (err, result) => {
    if (err) {
      return res.send({ ret: 0, msg: err.message });
    }
    if (result.affectedRows !== 1) {
      return res.send({ ret: 0, msg: '修改失败' });
    }
    res.send({ ret: 1, msg: '修改成功' });
  });
};

// 更新登录密码
exports.updatePwdHandler = (req, res) => {
  const auth = req.auth;
  const body = req.body;
  let sqlStr = 'select * from ev_users where id=?';
  db.query(sqlStr, auth.id, (err, results) => {
    if (err) {
      return res.send({ ret: 0, msg: err.message });
    }
    if (!results.length) {
      return res.send({ ret: 0, msg: '修改失败' });
    }
    const firstRow = results[0];
    const compareResult = bcrypt.compareSync(body.oldPwd, firstRow.password);
    if (!compareResult) {
      return res.send({ ret: 0, msg: '原密码错误，修改失败' });
    }
    const newPwd = bcrypt.hashSync(body.newPwd, 10);
    sqlStr = 'update ev_users set password=? where id=?';
    db.query(sqlStr, [newPwd, auth.id], (err, result) => {
      if (err) {
        return res.send({ ret: 0, msg: err.message });
      }
      if (result.affectedRows !== 1) {
        return res.send({ ret: 0, msg: '修改失败' });
      }
      res.send({ ret: 1, msg: '修改成功' });
    });
  });
};
