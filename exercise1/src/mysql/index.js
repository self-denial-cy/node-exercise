const mysql = require('mysql');

const db = mysql.createPool({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '123456',
  database: 'server'
});

// 查询
// db.query('select * from users', (err, res) => {
//   if (err) return console.log(err.message);
//   console.log(res);
// });

// 插入
// const user = { user_name: '蜘蛛侠', password: '123456' };
// const sqlStr = 'insert into users (user_name, password) values (?, ?)';
// db.query(sqlStr, [user.user_name, user.password], (err, res) => {
//   if (err) return console.log(err.message);
//   console.log(res);
// });

// 快捷插入
// 向表中新增数据时，如果数据对象的每个属性和数据表的字段一一对应，则可以通过以下方式快速插入数据
const user = { user_name: '王五', password: '123456' };
const sqlStr = 'insert into users set ?';
db.query(sqlStr, user, (err, res) => {
  if (err) return console.log(err.message);
  console.log(res);
});
