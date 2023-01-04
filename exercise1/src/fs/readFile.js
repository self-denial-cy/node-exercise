// 导入 fs 模块，来操作文件
const fs = require('fs');
// fs.readFile 读取文件，参数1：文件路径；参数2：读取文件时使用的编码格式，一般指定 utf8；参数3：回调函数，接收读取失败或成功的结果
fs.readFile('./file.js', 'utf8', (err, res) => {
  if (err) {
    return console.log(`文件读取失败：${err.message}`);
  }
  return console.log(`文件读取成功：${res}`);
  // 如果读取成功，err 为 null，读取失败，err 为错误对象
  console.log(err);
  console.log('--------');
  // 如果读取失败，res 为 undefined，读取成功，res 为文件内容
  console.log(res);
});
