const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res) => {
  res.redirect('/index');
});

router.get('/index', (req, res) => {
  res.render('index');
});

router.post('/api/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.send({ ret: 1, msg: '注册成功' });
  } catch (err) {
    res.send({ ret: 0, msg: err.message });
  }
});

router.post('/api/user/update/:id', async (req, res) => {
  try {
    await User.updateOne({ _id: req.params.id }, { ...req.body });
    res.send({ ret: 1, msg: '更新成功' });
  } catch (err) {
    res.send({ ret: 0, msg: err.message });
  }
});

router.get('/api/user/delete/:id', async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.send({ ret: 1, msg: '删除成功' });
  } catch (err) {
    res.send({ ret: 0, msg: err.message });
  }
});

router.get('/api/user/list', async (req, res) => {
  try {
    const data = await User.find().select('_id username').sort({ username: 1 }).exec();
    res.send({ ret: 1, msg: '查询成功', data });
  } catch (err) {
    res.send({ ret: 0, msg: err.message });
  }
});

module.exports = router;
