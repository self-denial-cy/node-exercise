# node-exercise

## [client1](./client1)

基于 layUI 搭建的简易后台管理系统，实现了包括登录、注册、文章管理、用户管理等简单功能

第三方包：

- art-template 模板引擎
- copper 图片裁切
- layUI 框架
- tinymce 富文本编辑器

### 安装依赖

```shell
npm i
```

### 运行

```shell
npm run server
```

> 该前端项目的配套后端项目 [practice1](./practice1)

## [exercise1](./exercise1)

NodeJs 相关知识点简易示例，包括：

- apidoc 根据注释自动生成接口文档
- buffer 模块的简单示例
- crypto 模块 hash、hmac 加密和 cipher、decipher 加解密
- ejs 模板引擎结合 express 使用
- events 模块的简单示例
- express 的简单示例，包括获取请求参数、中间件、托管静态资源、路由的匹配规则、JSONP 实现原理、CORS 实现原理等
- fs 模块的简单示例
- http 模块的简单示例，包括 NodeJs 环境中不存在跨域请求拦截、结合 cheerio 实现简单的页面数据爬取和处理
- JWT 认证和 Session 认证【session 对象存储在 mongodb 中而不是内存中】
- koa 的简单示例，包括获取请求参数、托管静态资源、模板引擎、Session 认证、路由配置、结合 @koa/multer 实现文件上传【洋葱模型待补充】
- commonjs 模块化规范
- 使用 mongoose 操作 mongodb
- 使用 mysql 操作 MySQL 数据库
- os 模块的简单示例
- path 模块的简单示例
- process 全局对象的简单示例
- puppeteer 工具的简单示例【[中文文档](https://puppeteer.bootcss.com)】
  - [puppeteer-deep](https://github.com/zhentaoo/puppeteer-deep)
  - [puppeteer-examples](https://github.com/checkly/puppeteer-examples)
- querystring 模块的简单示例
- readline 模块的简单示例
- WebSocket 相关知识点
- spider 爬虫小实战，包括爬取音乐、表情包、网页数据等
- stream 流的简单示例
- URL 类的简单示例
- zlib 模块的简单示例
- mocha 结合 chai 实现简易单元测试

## [practice1](./practice1)

基于 express 实现的简易后台管理系统服务端，为 [client1](./client1) 提供接口支持

第三方包：

- bcryptjs
- cors
- express
- express-jwt
- express-session
- joi
- jsonwebtoken
- multer
- mysql

```javascript
const Joi = require('joi');

module.exports = (schema, options = { strict: false }) => {
  if (!options.strict) {
    // allowUnknown 是否允许提交未定义的参数项
    // stripUnknown 是否过滤掉未定义的参数项
    options = { allowUnknown: true, stripUnknown: true, ...options };
  }
  delete options.strict;
  // 返回中间件
  return (req, res, next) => {
    ['body', 'query', 'params'].forEach((key) => {
      if (!schema[key]) return;
      // 执行参数校验
      const validateSchema = Joi.object(schema[key]);
      const { error, value } = validateSchema.validate(req[key], options);
      if (error) {
        // 在这里直接 res.send 错误信息或者抛出错误交给全局错误捕获来处理
        throw error;
      } else {
        // 校验成功，会根据 options 决定是否对参数项进行过滤，总之，要重新赋值
        req[key] = value;
      }
    });
    next();
  };
};
```

> 该自定义中间件结合 Joi 可以基于定义好的 Schema 对请求参数进行校验；校验失败时在全局异常捕获中可以捕获到 Joi.ValidationError 类型错误从而提供给客户端友好且精确的字段校验提示。

### 安装依赖

```shell
npm i
```

### 运行

```shell
npm run serve
```

> 该后端项目的配套前端项目 [client1](./client1)；
>
> 当前项目根目录中的 server.sql 文件是导出的表结构，请自行还原到 MySQL 数据库中，记得修改代码中的数据库连接信息；

## [practice2](./practice2)

基于 express-generator 项目生成器生成的应用改造实现的简易版在线聊天室，实现了包括用户注册、登录、ws 版在线聊天室、socket.io 版在线聊天室；聊天室中支持群聊、简单的私聊、在线用户实时更新等。

同时，当前项目中实现了 JWT 认证无感知刷新，WebSocket 的身份认证。

第三方包：

- ejs
- express
- jsonwebtoken
- mongoose
- multer
- socket.io
- ws

### 安装依赖

```shell
npm i
```

### 运行

```shell
npm run start
```
