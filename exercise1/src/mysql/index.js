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
// const user = { user_name: '王五', password: '123456' };
// const sqlStr = 'insert into users set ?';
// db.query(sqlStr, user, (err, res) => {
//   if (err) return console.log(err.message);
//   console.log(res);
// });

// 更新
// const user = { id: 1, user_name: '蝙蝠侠', password: '654321' };
// const sqlStr = 'update users set user_name=?, password=? where id=?';
// db.query(sqlStr, [user.user_name, user.password, user.id], (err, res) => {
//   if (err) return console.log(err.message);
//   console.log(res);
// });

// 快捷更新
// const user = { id: 1, user_name: '钢铁侠', password: '7890-=' };
// const sqlStr = 'update users set ? where id=?';
// db.query(sqlStr, [user, user.id], (err, res) => {
//   if (err) return console.log(err.message);
//   console.log(res);
// });

// 物理删除
// const sqlStr = 'delete from users where id=?';
// db.query(sqlStr, 2, (err, res) => {
//   if (err) return console.log(err.message);
//   console.log(res);
// });

// 逻辑删除
const sqlStr = 'update users set status=0 where id=?';
db.query(sqlStr, 1, (err, res) => {
  if (err) return console.log(err.message);
  console.log(res);
});
