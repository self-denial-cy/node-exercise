const path = require('path');

// 判断传入参数是否为绝对路径
console.log(path.isAbsolute(__dirname));
console.log(path.isAbsolute(__filename));

console.log(path.isAbsolute('./isAbsolute.js'));
