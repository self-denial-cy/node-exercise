const { update, del, list } = require('../services/user');

module.exports = {
  update: async (req, res) => {
    try {
      await update(req.params.id, req.body);
      res.send({ ret: 1, msg: '更新成功' });
    } catch (err) {
      res.send({ ret: 0, msg: err.message });
    }
  },
  del: async (req, res) => {
    try {
      await del(req.params.id);
      res.send({ ret: 1, msg: '删除成功' });
    } catch (err) {
      res.send({ ret: 0, msg: err.message });
    }
  },
  list: async (req, res) => {
    try {
      const data = await list();
      res.send({ ret: 1, msg: '查询成功', data });
    } catch (err) {
      res.send({ ret: 0, msg: err.message });
    }
  }
};
