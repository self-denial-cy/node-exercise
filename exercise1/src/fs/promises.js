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
