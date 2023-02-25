const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const urlParsed = url.parse(req.url, true);
  const data = {
    name: 'jsonp data'
  };
  // jsonp 原理
  res.end(`${urlParsed.query.callback}(${JSON.stringify(data)})`);
});

server.listen(3001, () => {
  console.log('server running at http://127.0.0.1:3001');
});

// http://127.0.0.1:3001/jsonp?callback=asada
