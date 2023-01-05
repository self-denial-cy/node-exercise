// 使用 require 加载其它模块时，会执行被加载模块中的代码
const a = require('./a');
// 加载用户自定义模块时，可以省略后缀名，因为 require 会自动补全 .js 后缀
// 省略用户自定义模块后缀名时，Node 会按顺序分别尝试加载以下文件：
// 按照确切文件名进行加载
// 补全 js 后缀尝试加载
// 补全 json 后缀尝试加载
// 补全 node 后缀尝试加载（该文件类型中不能写 js 代码）
// 加载失败，报错

console.log(a.count);

console.log(a.obj);

a.add();

a.add();

console.log(a.count);

console.log(a.obj);

// 因为导入的 obj 是 a 模块中 obj 的引用地址的一份拷贝，指向同一个对象，所以在这里修改 obj 会影响 a 模块
a.obj.count = 999;

a.add();

// 这里抛弃之前的引用地址，指向一个新的对象，所以与 a 模块中的 obj 已经是两个不同的对象了
a.obj = {
  count: 0
};

a.add();

// require 导入模块时得到的永远是模块中 module.exports 指向的对象
console.log(a.aaa);

// 内置模块是由 NodeJs 官方提供的模块，加载优先级最高
// 即使第三方模块有同名的模块，也只会加载内置模块

// require 目录时，会按照以下顺序尝试加载：
// 如果该目录中存在 package.json 文件，则尝试加载 main 字段指定的文件（npm 新增了 exports 字段，也可以指定 require 的目标文件）
// 尝试加载目录中的 index.js
// 加载失败，报错
