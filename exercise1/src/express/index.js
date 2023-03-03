// 导入 express
const express = require('express');
// NodeJs 内置了 querystring 模块，专门用来处理查询字符串
// 通过该模块的 parse 函数，可以轻松的将查询字符串解析成对象格式
// 或者也可以使用第三方模块 qs，功能差不多，也挺好的
const qs = require('querystring');
const apiRouter = require('./api');
const mw = require('./middleware');

// 创建 Web 服务器
const app = express();

// 配置解析 application/json 格式请求体数据的内置中间件
// 默认情况下，如果不配置该中间件，req.body 等于 undefined
app.use(express.json());
// 配置解析 application/x-www-form-urlencoded 格式请求体数据的内置中间件
// app.use(express.urlencoded({ extended: false }));

// 当一个请求到达服务器时，可以连续调用多个中间件，从而对这次请求进行预处理
// 中间件对输入处理后再输出，上一个中间件的输出往往是下一个中间件的输入
// 多个中间件共享同一份 req 和 res，基于该特性，可以在上游中间件中，为 req 或 res 对象添加自定义的属性或方法，供下游中间件或路由进行使用
app.use(mw);

// 自定义中间件【简单仿写 express.urlencoded 功能】
app.use((req, res, next) => {
  if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
    // 监听 req 的 data 事件：用于获取客户端发送到服务器的【请求体】数据
    // 如果数据量较大，无法一次性发送完毕，则客户端会把数据切割后，分批发送到服务器；
    // 所以 data 事件可能会触发多次，每一次获取到一部分数据，最后需要手动拼接数据
    let dataStr = '';
    req.on('data', (chunk) => {
      console.log(chunk);
      dataStr += chunk;
    });
    // 当【请求体】数据接收完毕后，会自动触发 req 的 end 事件
    // 因此，可以在 end 事件中拿到并处理完整的【请求体】数据
    req.on('end', () => {
      console.log(dataStr);
      // The object returned by the querystring.parse() method _does not_prototypically inherit from the JavaScript Object.
      // This means that typicalObject methods such as obj.toString(), obj.hasOwnProperty(), and others are not defined and will not work.
      const body = qs.parse(dataStr);
      console.log(body);
      req.body = body;
      next();
    });
  } else {
    next();
  }
});

// app.use 用于注册全局中间件
// apiRouter 和 express.static 都属于中间件
// 可以连续定义多个全局中间件，客户端请求到达服务器时，会按照定义的先后顺序依次进行调用
app.use('/api', apiRouter);

// 托管静态资源
app.use(express.static('../clock'));
// 如果要托管多个静态资源目录，可以多次调用 app.use(express.static)
// 客户端访问静态资源时，会根据目录的添加顺序查找所需的文件
// 如果希望在托管静态资源访问路径之前，挂载路径前缀：app.use(prefix,express.static)

app.get('/query', (req, res) => {
  // 客户端通过 ?name=zs&age=20 查询字符串形式发送到服务端的参数
  // 可以通过 req.query 对象获取到
  const query = req.query;
  res.send(query);
});

app.get('/params/:id/:action', (req, res) => {
  // 通过 req.params 对象可以访问 url 中 : 后匹配到的动态参数
  const params = req.params;
  res.send(params);
});

// 每当一个请求到达服务器后，需要先经过路由的匹配，只有匹配成功后才会调用对应的处理函数
// 在匹配时，会按照路由的【顺序】进行匹配，一旦请求类型和请求的 url 同时匹配成功，则 express 会将这次请求转交给对应的处理函数进行处理
// 一旦匹配成功就不会再向下进行匹配了
// get 请求
app.get('/user', (req, res) => {
  // 响应 JSON 对象
  res.send({
    name: '张三',
    age: 18,
    gender: '男'
  });
});

// 局部中间件，针对某一个路由设置中间件
// [mw1,mw2] or mw1,mw2 都可以生效
const mw1 = (req, res, next) => {
  console.log('this is local middleware 1');
  next();
};

const mw2 = (req, res, next) => {
  console.log('this is local middleware 2');
  next();
};

// post 请求
app.post('/user', [mw1, mw2], (req, res) => {
  console.log(req.body);
  // 响应文本字符串
  res.send(req.body);
});

app.get('/error', (req, res) => {
  throw new Error('this is error');
});

app.use((err, req, res, next) => {
  console.log(`系统异常：${err.message}`);
  res.send(`系统异常：${err.message}`);
});

// 启动服务器
app.listen(8084, () => {
  console.log('server running at http://127.0.0.1:8084');
});

// 使用 nodemon 启动服务，代码修改后 nodemon 可以监听到变动并重启服务
// 一般将 nodemon 安装为全局包
