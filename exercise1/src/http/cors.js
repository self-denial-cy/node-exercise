const http = require('http');

const server = http.createServer((req, res) => {
  const data = {
    name: 'cors data'
  };
  res.setHeader('Content-Type', 'application/json;charset=utf-8');
  // 实现简易的 CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify(data));
});

server.listen(3001, () => {
  console.log('server running at http://127.0.0.1:3001');
});
