const express = require('express');

const jsonp = express.Router();

// JSONP【很少用了，基本上都用 CORS 方案替代】
// 概念：浏览器通过 script 标签的 src 属性绕过同源策略请求服务器上的数据，同时，服务端返回一个函数的调用，这种请求方式叫做 JSONP
// 特点：JSONP 不属于真正的 ajax 请求，因为它没有使用 XMLHttpRequest 对象；JSONP 仅支持 GET 请求

// 创建 JSONP 接口的注意事项
// 如果已经配置了 cors 中间件，为了防止冲突，必须在配置 cors 中间件之前声明 JSONP 接口，否则 JSONP 接口会被处理成开启了 CORS 的接口

// 实现 JSONP 接口的步骤
// 1.获取客户端发送的回调函数名称
// 2.得到要通过 JSONP 形式发送给客户端的数据
// 3.根据前两步拼接出一个函数调用的字符串
// 4.把第三步得到的字符串响应给客户端的 script 标签进行解析执行
jsonp.get('/jsonp', (req, res) => {
  const callbackName = req.query.callback;
  const data = {
    name: 'hello jsonp',
    type: 'jsonp'
  };
  const scriptStr = `${callbackName}(${JSON.stringify(data)})`;
  res.send(scriptStr);
});

module.exports = jsonp;
