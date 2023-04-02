const fs = require('fs').promises;

/**
 * watch(filename[, options])
 * filename <string> | <Buffer> | <URL>
 * options.persistent 指示只要正在监视文件，进程是否应继续运行，默认值 true
 * options.recursive 指示是应监视所有子目录，还是仅监视当前目录，默认值 false【在指定目录时适用，且仅在受支持的平台上有效】
 * options.encoding 指定用于传给监听器的文件名的字符编码，默认值 utf8
 * options.signal 用于指示监听器何时应停止的 AbortSignal
 * 返回异步迭代器，其监听 filename 的变化，filename 可以指定文件或目录
 */
const ac = new AbortController();
const { signal } = ac;
setTimeout(() => {
  ac.abort();
}, 10000);

(async () => {
  try {
    const watcher = fs.watch(__filename, { signal });
    for await (const event of watcher) {
      console.log(event);
    }
  } catch (err) {
    if (err.name === 'AbortError') return;
    console.log(err);
  }
})();
