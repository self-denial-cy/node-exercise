// 导入 http 模块
const http = require('http');

// 创建 web 服务器实例
const server = http.createServer();

// 为服务器实例绑定请求事件，监听请求
// 这里的 request 表示监听 request 事件，即请求事件
// 所有的请求都会被以下方法监听到
server.on('request', (req, res) => {
  const url = req.url; // 请求 url 地址
  const method = req.method; // 请求方法
  const content = `您请求的 url 地址是 ${url}，请求的 method 类型是 ${method}`;
  console.log(content);
  console.log('Someone visit web server');
  // 为了防止中文显示乱码的问题，需要设置响应头信息
  res.setHeader('Content-Type', 'text/html;charset=utf-8');
  // 调用 res.end 响应内容，并结束本次请求
  res.end(content);
});

// 启动服务器
server.listen(8088, () => {
  console.log('server running at http://127.0.0.1:8088');
});
