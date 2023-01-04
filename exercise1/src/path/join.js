const path = require('path');

// 路径拼接
console.log(path.join('/a', '/b/c', '../', './d', 'e'));
console.log(path.join(__dirname, './index.js'));
