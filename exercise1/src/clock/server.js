const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer();

server.on('request', (req, res) => {
  const url = req.url;
  const filepath = path.join(__dirname, url);
  fs.readFile(filepath, 'utf8', (err, content) => {
    if (err) return res.end('<h1>404 Not Found</h1>');
    res.end(content);
  });
});

server.listen(8086, () => {
  console.log('server running at http://127.0.0.1:8086');
});
