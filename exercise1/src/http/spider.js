const http = require('http');
const https = require('https');
const cheerio = require('cheerio');

const server = http.createServer((req, res) => {
  fetchData((data) => {
    const $ = cheerio.load(data);
    const $contents = $('.column.content');
    const movies = [];
    $contents.each((index, item) => {
      movies.push({
        title: $(item).find('.title').text(),
        grade: $(item).find('.grade').text(),
        actor: $(item).find('.actor').text()
      });
    });
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    res.end(JSON.stringify(movies));
  });
});

const fetchData = (callback) => {
  https.get('https://i.maoyan.com/?requestCode=af0b40dd797f89996f36d7b9c9a6d2bahgsxd#movie', (res) => {
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
};

server.listen(3005, () => {
  console.log('server running at http://127.0.0.1:3005');
});
