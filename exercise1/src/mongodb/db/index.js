const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017', { dbName: 'db' });

// 监听数据库连接状态
mongoose.connection.once('open', () => {
  console.log('数据库连接成功');
});

mongoose.connection.once('close', () => {
  console.log('数据库连接断开');
});

module.exports = mongoose;
