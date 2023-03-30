const fs = require('fs');

/**
 * fs.access(path[, mode])
 * 测试用户对 path 指定的文件或目录的权限，mode 参数是可选的整数，指定要执行的可访问性检查
 * F_OK 指示文件对调用进程可见的标志。 这对于确定文件是否存在很有用，但没有说明 rwx 权限。 未指定模式时的默认值。
 * R_OK	指示文件可以被调用进程读取的标志。
 * W_OK 指示文件可以被调用进程写入的标志。
 * X_OK 指示文件可以被调用进程执行的标志。 这在 Windows 上不起作用（行为类似于 fs.constants.F_OK）。
 */
fs.access('./score-ok.txt', fs.constants.R_OK | fs.constants.W_OK, (err) => {
  if (err) return console.log(err);
  console.log('access ok'); // 对该文件有可读可写的权限
});
