const fs = require('fs').promises;

fs.readFile('./file.js', 'utf8')
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

fs.readFile('./123.js', 'utf8')
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

// fs 模块还有对应的 Promise 版本，防止回调地狱的糟糕情况，与 async/await 语法糖结合使用尤佳
// Promise 版本 API 使用底层的 NodeJs 线程池在事件循环线程之外执行文件系统操作，这些操作不是同步的也不是线程安全的；【回调版本 API 同理，也不是同步的也不是线程安全的】
// 对同一文件执行多个并发操作时必须小心，否则可能会损坏数据
