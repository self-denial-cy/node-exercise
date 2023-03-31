const fs = require('fs').promises;

(async () => {
  /**
   * open(path, flags[, mode])
   * path <string> | <Buffer> | <URL>
   * flags <string> | <number> 默认值 'r'【打开文件进行读取，如果文件不存在，则会发生异常】
   * mode <string> | <integer> 默认值 0o666【可读可写】
   */
  const filehandle = await fs.open('./data.json', 'r+');

  // console.log(filehandle.fd);

  // 所有 FileHandle 实例也都是 EventEmitter 实例
  filehandle.on('close', () => {
    console.log('filehandle closed');
  });

  /**
   * filehandle.appendFile(data[, options])
   * filehandle.writeFile 的别名
   * data <string> | <Buffer> | <TypedArray> | <DataView> | <AsyncIterable> | <Iterable> | <Stream>
   * options.encoding 默认值 utf8
   * 写入时会从头开始覆盖原始内容
   */
  // await filehandle.appendFile('data to append', 'utf8');

  /**
   * filehandle.createReadStream([options])
   * encoding 字符编码
   * autoClose 默认值 true
   * emitClose 默认值 true
   * start 开始位置
   * end 结束位置 默认值 Infinity
   * start、end 配置项决定从文件中读取一定范围的字节，而不是整个文件；
   * 如果省略 start 或为 undefined，则从当前的文件位置开始向后读取【不一定是从头开始读取哦！】
   * 如果先关闭了 FileHandle，则基于该 FileHandle 创建的 ReadStream 则无法正常运行
   */
  // const rs = filehandle.createReadStream({
  //   encoding: 'utf8',
  //   autoClose: true,
  //   emitClose: true,
  //   start: 0,
  //   end: Infinity
  // });
  // let data = '';
  // rs.on('data', (chunk) => {
  //   console.log('正在读取数据');
  //   console.log(chunk);
  //   data += chunk;
  // });
  // rs.on('end', () => {
  //   console.log('读取数据完毕');
  //   console.log(data);
  //   rs.close();
  //   filehandle.close();
  // });
  // rs.on('error', (err) => {
  //   console.log(err);
  // });
  // rs.on('close', () => {
  //   console.log('rs closed');
  // });

  /**
   * filehandle.createWriteStream([options])
   * encoding 默认值 utf8
   * autoClose 默认值 true
   * emitClose 默认值 true
   * start 选项决定在文件开头的某个位置写入数据，允许值范围 [0, Number.MAX_SAFE_INTEGER]
   * 写入文件需要 filehandle 的 flags 选项设置为 'r+'
   */
  // const ws = filehandle.createWriteStream({
  //   encoding: 'utf8',
  //   autoClose: true,
  //   emitClose: true,
  //   start: 0
  // });
  // ws.on('close', () => {
  //   console.log('ws closed');
  // });
  // ws.write('written data');
  // ws.end();

  /**
   * filehandle.read(buffer, offset, length, position)
   * buffer <Buffer> | <TypedArray> | <DataView> 将填充读取的文件数据的缓冲区
   * offset 缓冲区中开始填充的位置
   * length 读取的字节数
   * position 从文件开始读取数据的位置，如果为 null，则将从当前文件位置读取数据，并更新该位置；如果为整数，则不会更新该位置
   * 成功时履行 Promise 的对象：
   * bytesRead 读取的字节数
   * buffer 对传入的 buffer 参数的引用
   */
  // const frr1 = await filehandle.read(Buffer.alloc(10), 0, 6, 0);
  // console.log(frr1.bytesRead);
  // console.log(frr1.buffer.toString());

  /**
   * filehandle.read([options])
   * buffer 将填充读取的文件数据的缓冲区，默认值 Buffer.alloc(16384)
   * offset 缓冲区中开始填充的位置，默认值 0
   * length 读取的字节数，默认值 buffer.byteLength - offset
   * position 从文件开始读取数据的位置，如果为 null，则将从当前文件位置读取数据，并更新该位置；如果为整数，则不会更新该位置，默认值 null
   * 注意：0 在这里等同于 null
   */
  // const frr2 = await filehandle.read({
  //   buffer: Buffer.alloc(50),
  //   offset: 0,
  //   length: 50,
  //   position: null
  // });
  // console.log(frr2.bytesRead);
  // console.log(frr2.buffer.toString());
  // const frr3 = await filehandle.read({
  //   buffer: Buffer.alloc(100),
  //   offset: 0,
  //   length: 100,
  //   position: 1
  // });
  // console.log(frr3.bytesRead);
  // console.log(frr3.buffer.toString());
  // const frr4 = await filehandle.read({
  //   buffer: Buffer.alloc(50),
  //   offset: 0,
  //   length: 50,
  //   position: null
  // });
  // console.log(frr4.bytesRead);
  // console.log(frr4.buffer.toString());

  /**
   * filehandle.read(buffer[, options])
   * buffer 将填充读取的文件数据的缓冲区
   * options.offset 缓冲区中开始填充的位置，默认值 0
   * options.length 读取的字节数，默认值 buffer.byteLength - offset
   * options.position 从文件开始读取数据的位置，如果为 null，则将从当前文件位置读取数据，并更新该位置；如果为整数，则不会更新该位置，默认值 null
   * 注意：0 在这里等同于 null
   */

  /**
   * filehandle.readFile(options)
   * encoding 默认值 null
   * 成功读取时使用文件内容履行 Promise，如果未指定 encoding，则数据作为 Buffer 对象返回
   * 异步读取文件的全部内容，如果在调用 readFile 之前，已经调用过 read 方法，将会从文件当前位置向后读取直到文件末尾【该方法并不总是从文件开头读取】
   */
  // console.log(await filehandle.readFile({ encoding: 'utf8' }));

  /**
   * 如果未显式关闭 FileHandle，则它将尝试自动关闭并触发进程警告，从而有助于防止内存泄漏
   * 请不要依赖此行为，因为它可能不可靠且该 FileHandle 未被关闭，而是始终显式关闭
   * 当 FileHandle 已关闭且不可再用时，触发 close 事件
   */
  // filehandle.close();
})();
