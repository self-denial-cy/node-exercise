const path = require('path');

// 解析路径字符串生成一个描述对象
console.log(path.parse(__filename));
// {
//   root: 'D:\\',
//   dir: 'D:\\node-exercise\\exercise1\\src\\path',
//   base: 'parse.js',
//   ext: '.js',
//   name: 'parse'
// }
