const path = require('path');

const pathStr = '/a/b/c/index.html';

// 获取文件扩展名
console.log(path.extname(pathStr));
console.log(path.extname('/a/b/c'));
