const axios = require('axios').default;
const cheerio = require('cheerio');
const fs = require('fs').promises;

(async () => {
  try {
    const { data } = await axios.get('https://www.dydytt.net/index2.htm', {
      responseType: 'arraybuffer'
    });
    // 还可以使用第三方库 iconv-lite，实现 GB2312 解码
    const html = new TextDecoder('GB2312').decode(data);
    const $ = cheerio.load(html);
    const groups = [];
    $('.co_content4').each((i, el) => {
      const group = {};
      group.title = $(el).parent().find('.title_all>p').text();
      const movies = [];
      $(el)
        .find('a')
        .each((i, el) => {
          movies.push({
            title: $(el).text(),
            link: $(el).attr('href')
          });
        });
      group.movies = movies;
      groups.push(group);
    });
    await fs.writeFile('./dytt.json', JSON.stringify(groups));
  } catch (err) {
    console.log(err);
  }
})();
