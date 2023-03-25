const path = require('path');

console.log(path.delimiter); // 获取当前运行系统的路径定界符
console.log(process.env.PATH.split(path.delimiter));
