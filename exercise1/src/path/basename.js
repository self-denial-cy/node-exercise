const path = require('path');

const pathStr = '/a/b/c/index.html';

// 获取当前文件名称或当前目录名称
console.log(path.basename(pathStr));
console.log(path.basename(pathStr, '.html'));
console.log(path.basename(pathStr, '.js'));
console.log(path.basename('/a/b/c/'));
console.log(path.basename('/a/b/c/', '.js'));
