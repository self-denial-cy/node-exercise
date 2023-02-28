const http = require('http');
const https = require('https');

const server = http.createServer((req, res) => {
  fetchData((data) => {
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    res.end(data);
  });
});

const fetchData = (callback) => {
  const options = {
    headers: {
      'Content-Type': 'application/json'
    },
    hostname: 'm.xiaomiyoupin.com',
    port: 443,
    path: '/mtop/market/search/placeHolder',
    method: 'POST'
  };
  const req = https.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      console.log('获取数据中');
      console.log(chunk);
      data += chunk;
    });
    res.on('end', () => {
      console.log('数据获取完毕');
      console.log(data);
      callback(data);
    });
  });
  req.write(JSON.stringify([{}, { baseParam: { ypClient: 1 } }]));
  req.end();
};

server.listen(3003, () => {
  console.log('server running at http://127.0.0.1:3003');
});
