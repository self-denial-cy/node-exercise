const { register } = require('../services/register');

module.exports = {
  register: async (req, res) => {
    try {
      await register(req.body);
      res.send({ ret: 1, msg: '注册成功' });
    } catch (err) {
      res.send({ ret: 0, msg: err.message });
    }
  }
};
