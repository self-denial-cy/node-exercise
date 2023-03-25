const path = require('path');

// 该方法将路径或路径片段的序列解析为绝对路径
// 给定的序列从右向左处理，每个片段都会被追加到前面，直到构建成绝对路径就停止
// 如果在处理完所有片段后还没有生成绝对路径，则在前面再追加当前工作目录路径
// 生成的路径被规范化，并删除尾部斜杠【除非结果是根目录】

console.log(path.resolve('/'));
console.log(path.resolve()); // 不传参数，则返回当前工作目录的绝对路径【不同于 __dirname，该结果会随着执行 Node 进程的运行目录而改变】
console.log(path.resolve('/foo', '/bar', 'baz')); // D:\bar\baz 只要生成绝对路径，就会停止向前追加了
console.log(path.resolve('/foo/bar', '/tmp/file/')); // D:\tmp\file
console.log(path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif')); // 到最后依旧未生成绝对路径，就会追加当前工作目录路径
