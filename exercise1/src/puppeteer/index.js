const puppeteer = require('puppeteer');

(async () => {
  try {
    // 启动浏览器
    const browser = await puppeteer.launch({
      headless: false,
      args: ['--start-maximized'],
      defaultViewport: {
        width: 1024,
        height: 768
      }
    });

    // 打开一个标签页
    const page = await browser.newPage();
    // 监听 console
    page.on('console', (msg) => {});
    // 监听页面加载完成，包括所有相关资源，例如样式表、脚本、iframe、图片等资源
    page.once('load', async () => {
      /**
       * page.$ 等同于 document.querySelector、page.$$ 等同于 document.querySelectorAll
       */
      const search = await page.$('.ivu-input-with-search>.ivu-input'); // 获取到查询输入框
      await page.type('.ivu-input-with-search>.ivu-input', '许嵩', {
        delay: 100
      });
      await page.click('.ivu-input-with-search>.ivu-input-search');
      await page.waitForSelector('.ivu-table-tbody .ivu-table-row .ivu-table-column-center a', {
        visible: true,
        timeout: 0
      });
      const pageNum = await page.$$eval('.ivu-page .ivu-page-item', (els) => els[els.length - 1].textContent); // 获取总页数
      console.log(pageNum);

      // TODO
    });
    // 监听页面发送请求
    page.on('request', (req) => {});
    // 监听页面请求成功完成
    page.on('requestfinished', (req) => {});
    // 监听页面接收到响应
    page.on('response', (res) => {});

    await page.goto('https://music.y444.cn/', {
      timeout: 0
    });
  } catch (err) {
    console.log(err);
  }
})();
