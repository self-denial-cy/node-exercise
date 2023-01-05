require('./c');
require('./c');
require('./c');
require('./c');
require('./c');
// 模块在第一次加载后会被缓存，这也意味着多次 require 同一模块不会导致模块中代码被执行多次
// 注意：不论是内置模块，用户自定义模块，第三方模块都会优先从缓存中加载，从而提高模块加载效率

console.log('this is b');
