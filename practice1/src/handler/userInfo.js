const db = require('../db/index');

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
