const path = require('path');

console.log(path.dirname(__filename));
console.log(path.dirname(__dirname)); // 如果传入参数是目录路径的话，会忽略最后一层目录
