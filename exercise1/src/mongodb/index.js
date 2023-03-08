const express = require('express');
const User = require('./db/model/user');
const Pet = require('./db/model/pet');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/api/user/add', (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then((data) => {
      console.log(data);
      res.send({ ret: 1, msg: '添加成功', data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ ret: 0, msg: err.message });
    });
});

app.post('/api/pet/add', async (req, res) => {
  const pet = new Pet(req.body);
  try {
    const data = await pet.save();
    console.log(data);
    res.send({ ret: 1, msg: '添加成功', data });
  } catch (err) {
    console.log(err);
    res.send({ ret: 0, msg: err.message });
  }
});

app.get('/api/user/search', (req, res) => {
  const query = req.query;

  // 通过查询辅助方法
  // User.find()
  //   .byName(query.name)
  //   .then((data) => {
  //     console.log(data);
  //     res.send({ ret: 1, msg: '查询成功', data });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.send({ ret: 0, msg: err.message });
  //   });

  // 通过静态方法
  User.findByName(query.name)
    .then((data) => {
      console.log(data);
      res.send({ ret: 1, msg: '查询成功', data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ ret: 0, msg: err.message });
    });
});

app.get('/api/user/get/:id', async (req, res) => {
  const params = req.params;
  try {
    const user = await User.findById(params.id).exec();
    const pets = await user.findPets();
    // TODO 合并数据，目前合并的数据结果错误
    res.send({ ret: 1, msg: '查询成功', data: { ...user, pets } });
  } catch (err) {
    console.log(err);
    res.send({ ret: 0, msg: err.message });
  }
});

app.listen(8091, () => {
  console.log('server running at http://127.0.0.1:8091');
});
