const zlib = require('zlib');
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  // 客户端和服务端传输数据时，数据量较大时会比较慢，因此通过 zlib 可以按照一种压缩解压缩格式大大压缩数据量；
  // 当前示例中使用 gzip 这种格式压缩，在客户端和服务端压缩或解压缩都很快；
  // 服务端压缩数据，传输到客户端进行解压缩，这样就大大加快传输速度
  const gzip = zlib.createGzip();
  res.setHeader('Content-Type', 'application/json;charset=utf-8');
  res.setHeader('Content-Encoding', 'gzip'); // 响应头信息中得告知客户端压缩格式，否则客户端不知道按照哪种格式解压缩数据
  // res 本身就是一个 WritableStream【写入流】，因此支持通过 pipe【管道】 传输数据
  const rs = fs.createReadStream('../../package-lock.json', 'utf8');
  // pipe【管道】 会自动关闭，因此不需要 end 写入流
  rs.pipe(gzip).pipe(res);
  // 没使用 gzip 时，传输数据大小为 145kb；
  // 使用 gzip 时，传输数据大小为 42kb；
  // 当数据量越大时，优化效果越明显
});

server.listen(3006, () => {
  console.log('server running at http://127.0.0.1:3006');
});
