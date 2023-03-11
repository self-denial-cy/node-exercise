const express = require('express');

const app = express();

app.use((req, res, next) => {
  if (req.url === '/favicon.ico') return;
  next();
});

// 中间件 A
app.use((req, res, next) => {
  console.log('A1');
  next();
  console.log('A2');
});

// 中间件 B
app.use((req, res, next) => {
  console.log('B1');
  next();
  console.log('B2');
});

// 中间件 C
app.use((req, res, next) => {
  console.log('C1');
  next();
  console.log('C2');
});

app.listen(3000);
