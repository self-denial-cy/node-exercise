// 练习——使用 fs 文件系统模块，将 score.txt 文件中的数据，整理到 score-ok.txt 文件中
const fs = require('fs');
fs.readFile('./score.txt', 'utf8', (err, res) => {
  if (err) {
    return console.log(`读取文件失败：${err.message}`);
  }
  const contentStr = res.replace(/\r\n/g, ' ').trim();
  const contentArr = contentStr.split(' ').map((str) => {
    return str.replace(/=/g, '：');
  });
  const generatedContent = contentArr.join('\r\n') + '\r\n';
  fs.writeFile('./score-ok.txt', generatedContent, 'utf8', (err) => {
    if (err) {
      return console.log(`文件写入失败：${err.message}`);
    }
    console.log('文件写入成功');
  });
});
