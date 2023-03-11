const Koa = require('koa');

const app = new Koa();

app.use((ctx, next) => {
  if (ctx.url === '/favicon.ico') return;
  next();
});

// 中间件 A
app.use((ctx, next) => {
  console.log('A1');
  next();
  console.log('A2');
});

// 中间件 B
app.use((ctx, next) => {
  console.log('B1');
  next();
  console.log('B2');
});

// 中间件 C
app.use((ctx, next) => {
  console.log('C1');
  next();
  console.log('C2');
});

app.listen(3000);
