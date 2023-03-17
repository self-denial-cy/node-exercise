const mongoose = require('mongoose');
const { mongodbUrl, mongodbName } = require('../config');

mongoose
  .connect(mongodbUrl, {
    dbName: mongodbName,
    autoIndex: false, // 生产环境关闭自动索引选项以提升性能
    autoCreate: false //  生产环境关闭以提升性能
  })
  .catch((err) => {
    console.log('数据库连接错误');
    console.log(err);
  });

// 监听数据库连接状态
mongoose.connection.on('open', () => {
  console.log('数据库连接成功');
});

mongoose.connection.on('error', (err) => {
  console.log('数据库连接错误');
  console.log(err);
});

mongoose.connection.on('close', () => {
  console.log('数据库连接断开');
});

module.exports = mongoose;
