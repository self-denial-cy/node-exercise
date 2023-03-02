const fs = require('fs');

fs.stat('./stat.js', (err, data) => {
  if (err) return console.log(err);
  console.log(data.isDirectory());
  console.log(data.isFile());
});
