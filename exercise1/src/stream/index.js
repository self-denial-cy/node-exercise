const fs = require('fs');

// fs 模块中的 writeFile、readFile 等方法是直接将整个文件在内存中进行读写，文件较小时尚可，但是一旦遇到大文件就会捉襟见肘；
// 因此提供了 stream【流】 的概念，将文件向水流一样一点一点读写到内存中，速度快，性能佳

// 与 writeFile 一样都会覆盖原始内容
const write = () => {
  const ws = fs.createWriteStream('./stream.txt', 'utf8');
  ws.write('1\n');
  ws.write('22\n');
  ws.write('333\n');
  ws.write('4444\n');
  ws.write('55555\n');
  ws.write('666666\n');
  ws.write('7777777\n');
  ws.write('88888888\n');
  ws.write('999999999\n');
  ws.end();
};

const read = () => {
  const rs = fs.createReadStream('./index.js', 'utf8');
  let data = '';
  // data 事件可能会触发多次
  rs.on('data', (chunk) => {
    console.log('正在读取数据');
    console.log(chunk);
    data += chunk;
  });
  rs.on('end', () => {
    console.log('读取数据完毕');
    console.log(data);
  });
  rs.on('error', (err) => {
    console.log(err);
  });
};

const readAndWrite = () => {
  const rs = fs.createReadStream('./index.js', 'utf8');
  const ws = fs.createWriteStream('./stream.txt', 'utf8');
  // 一边读一边写，通过 pipe【管道】 传输数据
  // pipe【管道】 会自动关闭，因此不需要 end 写入流
  rs.pipe(ws);
};

write();

read();

setTimeout(readAndWrite, 4000);
