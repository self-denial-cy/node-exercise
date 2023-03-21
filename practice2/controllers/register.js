const { register } = require('../services/register');

module.exports = {
  register: async (req, res) => {
    try {
      const body = req.body;
      const file = req.file;
      const entity = {
        username: body.username,
        password: body.password,
        avatar: file ? `/uploads/${file.filename}` : '/images/default.png'
      };
      await register(entity);
      res.send({ ret: 1, msg: '注册成功' });
    } catch (err) {
      res.send({ ret: 0, msg: err.message });
    }
  }
};
