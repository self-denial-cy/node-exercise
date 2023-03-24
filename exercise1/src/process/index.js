const path = require('path');

// process 在 NodeJs 中是全局对象，所以不需要引入即可使用
console.log(process.cwd()); // 获取运行目录
console.log(process.version); // 获取 NodeJs 版本
console.log(process.env.NODE_ENV); // 获取环境变量，一般取 NODE_ENV 以区分是开发环境还是生产环境
console.log(process.platform); // 获取系统平台
console.log(process.uptime()); // 获取已经运行时间【单位秒】
console.log(process.argv.slice(2)); // 获取传入的命令行参数，返回值是一个数组，从索引 2 向后都是命令行参数
console.log(process.mainModule); // 获取入口模块
console.log(require.main); // 取代 process.mainModule 的新写法
console.log(process.chdir(path.join(__dirname, '../../src'))); // 更改 NodeJs 进程的当前工作目录
console.log(process.cwd());
console.log(process.env.npm_package_name); // 通过 npm scripts 运行时，会将 package.json 中的数据映射到 process.env.npm_package_xxx 中
