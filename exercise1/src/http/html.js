const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
  let content = '<h1>404 Not Found</h1>';
  const url = req.url;
  if (url === '/' || url === '/index.html') {
    content = '<h1>首页</h1>';
  } else if (url === '/about.html') {
    content = '<h1>关于</h1>';
  }
  res.setHeader('Content-Type', 'text/html;charset=utf-8');
  res.end(content);
});

server.listen(8085, () => {
  console.log('server running at http://127.0.0.1:8085');
});
