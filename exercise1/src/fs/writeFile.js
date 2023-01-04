const fs = require('fs');

const content = `console.log('this is content writed by node:fs');\n`;

// fs.writeFile 写入文件，参数1：文件路径；参数2：写入文件的内容；参数3：写入文件时使用的编码格式，一般指定 utf8；参数4：回调函数，接收写入失败的结果
fs.writeFile('./file.js', content, 'utf8', (err) => {
  if (err) {
    return console.log(`写入文件失败：${err.message}`);
  }
  return console.log('写入文件成功');
});
