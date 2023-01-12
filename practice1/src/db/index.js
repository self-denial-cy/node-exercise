const mysql = require('mysql');

// 创建连接池
const db = mysql.createPool({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '123456',
  database: 'server'
});

module.exports = db;
