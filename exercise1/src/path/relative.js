const path = require('path');

// path.relative(from, to) 返回从 from 到 to 的相对路径
console.log(path.relative(__dirname, './relative.js'));
