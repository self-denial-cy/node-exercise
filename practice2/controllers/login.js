const { login } = require('../services/login');

module.exports = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const result = await login(username, password);
      if (!result) return res.send({ ret: 0, msg: '登录失败，用户或密码错误' });
      res.setHeader('Authorization', result.token);
      res.send({
        ret: 1,
        msg: '登录成功',
        data: {
          id: result.id,
          username: result.username
        }
      });
    } catch (err) {
      res.send({ ret: 0, msg: err.message });
    }
  }
};
