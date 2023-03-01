const fs = require('fs');

fs.mkdir('./dir', (err) => {
  // 回调函数第一个参数一般都是传递的 error，这种风格叫做 error-first 风格
  if (err) return console.log(err);
  setTimeout(() => {
    fs.rename('./dir', './rid', (err) => {
      if (err) return console.log(err);
      setTimeout(() => {
        fs.rmdir('./rid', (err) => {
          if (err) return console.log(err);
          console.log('Game Over');
        });
      }, 2000);
    });
  }, 2000);
});
