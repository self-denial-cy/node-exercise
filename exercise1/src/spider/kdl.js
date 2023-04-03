const axios = require('axios').default;
const cheerio = require('cheerio');
const path = require('path');
const fs = require('fs').promises;

(async () => {
  const save = async (json) => {
    try {
      await fs.writeFile(path.join(__dirname, './kdl.json'), json);
      console.log('保存成功');
    } catch (err) {
      console.log(err);
    }
  };

  const fetchByPage = async (page) => {
    try {
      const { data } = await axios.get(`https://www.kuaidaili.com/free/inha/${page}`);
      const $ = cheerio.load(data);
      $('#list tbody tr').each((i, el) => {
        const host = $(el).children().eq(0).text();
        const port = $(el).children().eq(1).text();
        const protocol = $(el).children().eq(3).text().toLowerCase();
        proxys.push({ host, port, protocol });
        if (proxys.length === 15 * pageNum) {
          save(JSON.stringify(proxys));
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  let proxys = [];
  const pageNum = 10;

  const main = (pageNum) => {
    proxys = [];
    for (let i = 1; i <= pageNum; i++) {
      setTimeout(() => {
        fetchByPage(i);
      }, (i - 1) * 1500);
    }
  };

  main(pageNum);
})();
