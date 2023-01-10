const express = require('express');
const router = require('./router');
const jsonp = require('./jsonp');
// cors 是 express 的一个第三方中间件，通过安装和配置该中间件，可以很方便的解决跨域问题
// 该中间件必须在接口之前使用
const cors = require('cors');
// CORS 的注意事项：
// CORS 主要在服务端进行配置，客户端无须做任何事情，即可请求开启了 CORS 的接口服务
// CORS 对浏览器有兼容性要求：只有支持 XMLHttpRequest Level2 的浏览器才能正常访问开启了 CORS 的服务（IE10+、Chrome4+、FireFox3.5+）

// CORS 响应头部 —— Access-Control-Allow-Origin
// 语法：Access-Control-Allow-Origin: <origin> | *
// 其中，origin 参数的值指定了允许访问该资源的外域 URL

// CORS 响应头部 —— Access-Control-Allow-Headers
// 默认情况下，跨域请求仅支持客户端向服务端发送如下的 9 个请求头：
// Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、Width、Content-Type（值仅限于 text/plain、multipart/form-data、application/x-www-form-urlencoded 三者之一）
// 如果客户端向服务端发送了额外的请求头信息，则需要在服务端，通过 Access-Control-Allow-Headers 对额外的请求头进行声明，否则这次请求会失败
// 语法：Access-Control-Allow-Headers: Content-Type, Accept-Language（多个请求头之间用英文逗号隔开）

// CORS 响应头部 —— Access-Control-Allow-Methods
// 默认情况下，跨域请求仅支持客户端发起 GET、POST、HEAD 请求
// 如果客户端希望发起其它类型请求，则需要在服务端通过该响应头设置实际请求所允许使用的 HTTP 方法
// 语法：Access-Control-Allow-Methods: * | POST, GET, DELETE, HEAD

// CORS 请求的分类：
// 客户端在进行 CORS 请求时，根据请求方式和请求头的不同，可以将 CORS 的请求分为两大类：简单请求、预检请求
// 简单请求：同时满足以下两大条件的请求就是简单请求
// 请求方式：GET、POST、HEAD 三者之一
// 请求头：Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、Width、Content-Type（值仅限于 text/plain、multipart/form-data、application/x-www-form-urlencoded 三者之一）
// 总结：满足默认情况的请求就是简单请求
// 预检请求：只要符合以下任何一个条件的请求都需要进行预检请求
// 请求方式：GET、POST、HEAD 之外的请求
// 请求头：包含自定义头部字段
// 向服务端发送了 application/json 格式的数据（Content-Type 不在三者中，自然不是简单请求）
// 在浏览器与服务器正式通信之前，浏览器会先发送 OPTIONS 请求进行预检，以获知服务器是否允许该实际请求，所以这一次的 OPTIONS 请求称为【预检请求】
// 服务器成功响应【预检请求】后，才会发送真正的请求，并且携带真实数据

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(jsonp);

app.use(cors());

app.use(router);

app.listen(8089, () => {
  console.log('server running at http://127.0.0.1:8089');
});
