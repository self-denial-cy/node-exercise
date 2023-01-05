// 导入 express
const express = require('express');

// 创建 Web 服务器
const app = express();

// 启动服务器
app.listen(8084, () => {
  console.log('server running at http://127.0.0.1:8084');
});
