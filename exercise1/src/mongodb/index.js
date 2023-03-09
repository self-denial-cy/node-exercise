const express = require('express');
const User = require('./db/model/user');
const Pet = require('./db/model/pet');
const Comment = require('./db/model/comment');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/api/user/add', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send({ ret: 1, msg: '添加成功' });
  } catch (err) {
    console.log(err);
    res.send({ ret: 0, msg: err.message });
  }
});

app.get('/api/user/findByName', async (req, res) => {
  const query = req.query;
  try {
    // 通过查询辅助方法
    // const data = await User.find().findByName(query.name);
    // 通过静态方法
    const data = await User.findByName(query.name);
    console.log(data);
    res.send({ ret: 1, msg: '查询成功', data });
  } catch (err) {
    console.log(err);
    res.send({ ret: 0, msg: err.message });
  }
});

app.get('/api/user/get/:id', async (req, res) => {
  const params = req.params;
  try {
    const user = await User.findById(params.id).select('-__v').exec();
    const pets = await user.findPets();
    res.send({ ret: 1, msg: '查询成功', data: { ...user.toObject(), pets } });
  } catch (err) {
    console.log(err);
    res.send({ ret: 0, msg: err.message });
  }
});

app.post('/api/pet/add', async (req, res) => {
  const pet = new Pet(req.body);
  try {
    await pet.save();
    res.send({ ret: 1, msg: '添加成功' });
  } catch (err) {
    console.log(err);
    res.send({ ret: 0, msg: err.message });
  }
});

app.get('/api/pet/get/:id', async (req, res) => {
  const params = req.params;
  const query = req.query;
  try {
    const pet = await Pet.findById(params.id).select('-__v').exec();
    console.log(pet.desc); // 虚拟属性
    pet.desc = `${query.name} ${query.age}`;
    console.log(pet.desc); // setter 后需要 save 之后才会持久化保存到数据库
    res.send({ ret: 1, msg: '查询成功', data: pet });
  } catch (err) {
    console.log(err);
    res.send({ ret: 0, msg: err.message });
  }
});

app.post('/api/comment/add', async (req, res) => {
  const comment = new Comment(req.body);
  try {
    await comment.save();
    res.send({ ret: 1, msg: '添加成功' });
  } catch (err) {
    console.log(err);
    res.send({ ret: 0, msg: err.message });
  }
});

app.listen(8091, () => {
  console.log('server running at http://127.0.0.1:8091');
});
