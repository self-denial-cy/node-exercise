const fs = require('fs').promises;

/**
 * copyFile(src, dest[, mode])
 * src 要复制的源文件
 * dest 复制操作的目标文件
 * mode 指定复制操作行为的可选修饰符，可以创建由两个或多个值的按位或组成的掩码
 * fs.constants.COPYFILE_EXCL 如果 dest 已经存在，则复制操作将失败
 * fs.constants.COPYFILE_FICLONE
 * fs.constants.COPYFILE_FICLONE_FORCE
 * 异步地将 src 复制到 dest，默认情况下，如果 dest 已经存在，则会被覆盖
 * 无法保证复制操作的原子性，如果在打开目标文件进行写入时发生错误，则将尝试删除目标文件
 */
(async () => {
  try {
    await fs.copyFile('./score.txt', './score-copy.txt');
    console.log('score.txt was copied to score-copy.txt');
  } catch (err) {
    console.log(err);
  }

  try {
    await fs.copyFile('./score.txt', './score-copy.txt', fs.constants.COPYFILE_EXCL);
    console.log('score.txt was copied to score-copy.txt');
  } catch (err) {
    console.log(err);
  }
})();
