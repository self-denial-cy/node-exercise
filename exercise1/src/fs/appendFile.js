const fs = require('fs');

const content = `\nconsole.log('this is appended content');\n`;

fs.appendFile('./file.js', content, 'utf8', (err) => {
  if (err) return console.log(err);
  console.log('追加文件内容成功');
});

// appendFile 不同于 writeFile，该方法可以追加内容，不会覆盖文件的原本内容
