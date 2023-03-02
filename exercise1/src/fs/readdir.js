const fs = require('fs');

fs.readdir('../../src', (err, data) => {
  if (err) return console.log(err);
  console.log(data);
});

fs.readdir('../fs', (err, data) => {
  if (err) return console.log(err);
  console.log(data);
});
