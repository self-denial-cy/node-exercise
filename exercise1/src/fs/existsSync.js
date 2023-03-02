const fs = require('fs');

console.log(fs.existsSync('./score.txt'));
console.log(fs.existsSync('./scorescore.txt'));

// fs 模块中大部分方法都有对应的 Sync 同步方法，使用 Sync 方法时要注意使用 try/catch 捕获异常，防止系统崩溃
// 在 fs 模块中，提供同步方法是为了方便使用；
// 但是由于 Node 环境执行的 Javascript 代码是服务端代码，所以，绝大部分需要在服务端运行期间反复执行业务逻辑；
// 因此最好使用异步代码，否则同步代码在执行期间，会阻塞服务端，大大影响响应速度，因为 Node 环境只有一个主执行线程
