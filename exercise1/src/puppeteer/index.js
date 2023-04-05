const puppeteer = require('puppeteer');

(async () => {
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
  page.on('console', (msg) => {
    console.log(msg.text());
  });
  await page.goto('http://www.rdshu.cc/');
})();
