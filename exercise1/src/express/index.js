// 导入 express
const express = require('express');

// 创建 Web 服务器
const app = express();

app.get('/query', (req, res) => {
  // 客户端通过 ?name=zs&age=20 查询字符串形式发送到服务端的参数
  // 可以通过 req.query 对象获取到
  const query = req.query;
  res.send(query);
});

app.get('/params/:id/:action', (req, res) => {
  // 通过 req.params 对象可以访问 url 中 : 后匹配到的动态参数
  const params = req.params;
  res.send(params);
});

// get 请求
app.get('/user', (req, res) => {
  // 响应 JSON 对象
  res.send({
    name: '张三',
    age: 18,
    gender: '男'
  });
});

// post 请求
app.post('/user', (req, res) => {
  // 响应文本字符串
  res.send('POST 请求成功');
});

// 启动服务器
app.listen(8084, () => {
  console.log('server running at http://127.0.0.1:8084');
});
