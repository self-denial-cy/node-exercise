const fs = require('fs');
const path = require('path');

// 定义正则表达式，匹配 style 和 script 块
const regStyle = /<style>[\s\S]*<\/style>/;
const regScript = /<script>[\s\S]*<\/script>/;

// 读取文件
fs.readFile(path.join(__dirname, './index.html'), 'utf8', (err, res) => {
  if (err) {
    return console.log(`读取文件失败：${err.message}`);
  }
  // 读取成功后对文件内容进行拆解处理
  resolveCss(res);
  resolveJs(res);
  resolveHtml(res);
});

// 定义拆解 style 块内容的方法
const resolveCss = (htmlStr) => {
  // 使用正则提取块内容
  const r1 = regStyle.exec(htmlStr);
  if (r1) {
    const cssStr = r1[0].replace('<style>', '').replace('</style>', '');
    fs.writeFile(path.join(__dirname, './clock.css'), cssStr, 'utf8', (err) => {
      if (err) return console.log(`文件写入失败：${err.message}`);
      console.log('clock.css 文件写入成功');
    });
  }
};

// 定义拆解 script 块内容的方法
const resolveJs = (htmlStr) => {
  const r2 = regScript.exec(htmlStr);
  if (r2) {
    const jsStr = '/* eslint-disable */\n' + r2[0].replace('<script>', '').replace('</script>', '');
    fs.writeFile(path.join(__dirname, './clock.js'), jsStr, 'utf8', (err) => {
      if (err) return console.log(`文件写入失败：${err.message}`);
      console.log('clock.js 文件写入成功');
    });
  }
};

const resolveHtml = (htmlStr) => {
  const content = htmlStr
    .replace(regStyle, '<link rel="stylesheet" href="./clock.css" />')
    .replace(regScript, '<script src="./clock.js"></script>');

  fs.writeFile(path.join(__dirname, './clock.html'), content, 'utf8', (err) => {
    if (err) return console.log(`文件写入失败：${err.message}`);
    console.log('clock.html 文件写入成功');
  });
};
