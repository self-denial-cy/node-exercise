const fs = require('fs');

fs.writeFile('./unlink.txt', 'ready to unlink', 'utf8', (err) => {
  if (err) return console.log(err);
  setTimeout(() => {
    fs.unlink('./unlink.txt', (err) => {
      if (err) return console.log(err);
      console.log('文件删除成功');
    });
  }, 3000);
});
