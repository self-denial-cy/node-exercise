const http = require('http');
const https = require('https');

const server = http.createServer((req, res) => {
  fetchData((data) => {
    res.setHeader('Content-Type', 'text/html;charset=utf-8');
    res.end(data);
  });
});

const fetchData = (callback) => {
  // Node 可以充当中间层角色，因为不是浏览器环境，没有跨域请求拦截；
  // 因为调用的是 https 协议的接口，所以必须使用 https 模块
  https.get('https://i.maoyan.com/api/mmdb/movie/v3/list/hot.json?ct=%E6%98%86%E5%B1%B1&ci=403&channelId=4', (res) => {
    let data = '';
    // data 事件监听数据流传输
    res.on('data', (chunk) => {
      console.log('获取数据中');
      console.log(chunk);
      data += chunk;
    });
    // end 事件监听数据流传输完毕
    res.on('end', () => {
      console.log('数据获取完毕');
      console.log(data);
      callback(data);
    });
  });
};

server.listen(3002, () => {
  console.log('server running at http://127.0.0.1:3002');
});
