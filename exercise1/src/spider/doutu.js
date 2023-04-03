const axios = require('axios').default;
const cheerio = require('cheerio');
const path = require('path');
const fs = require('fs');

(async () => {
  const download = async (filename, src) => {
    try {
      const { data } = await axios.get(src, { responseType: 'stream' });
      const ws = fs.createWriteStream(path.join(__dirname, './images', filename));
      data.pipe(ws);
      console.log(`${filename} 保存成功`);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchByPage = async (page) => {
    try {
      const { data } = await axios.get(`https://www.pkdoutu.com/article/list/?page=${page}`);
      const $ = cheerio.load(data);
      $('.random_article img').each((i, el) => {
        setTimeout(() => {
          const imgSrc = $(el).attr('data-original');
          if (!imgSrc) return;
          const filename = path.parse(imgSrc).base;
          download(filename, imgSrc);
        }, i * 500);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const main = (pageNum) => {
    for (let i = 1; i <= pageNum; i++) {
      setTimeout(() => {
        fetchByPage(i);
      }, (i - 1) * 500);
    }
  };

  main(5);
})();
