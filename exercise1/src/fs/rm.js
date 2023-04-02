const fs = require('fs').promises;

/**
 * rm(path[, options])
 * path <string> | <Buffer> | <URL>
 * options.force 当为 true 时，如果 path 不存在，则异常将被忽略，默认值 false
 * options.maxRetries 如果遇到错误，NodeJs 将在每次尝试时以 retryDelay 毫秒的线性退避等待时间重试该操作，此选项表示重试次数，如果 recursive 选项不为 true，则忽略该选项，默认值 0
 * options.recursive 如果为 true，则执行递归目录删除，在递归模式下，操作将在失败时重试，默认值 false
 * options.retryDelay 重试之间等待的时间（以毫秒为单位），如果 recursive 选项不为 true，则忽略此选项，默认值 100
 */
(async () => {
  await fs.rm('./score.txt', {
    force: true
  });
})();
