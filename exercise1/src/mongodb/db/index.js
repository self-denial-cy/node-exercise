const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017', {
  dbName: 'db',
  autoIndex: false // 生产环境关闭自动索引选项以提升性能
});

// 监听数据库连接状态
mongoose.connection.once('open', () => {
  console.log('数据库连接成功');
});

mongoose.connection.once('close', () => {
  console.log('数据库连接断开');
});

module.exports = mongoose;
