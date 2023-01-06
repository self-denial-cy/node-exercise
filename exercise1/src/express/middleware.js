const mw = (req, res, next) => {
  console.log('this is a simple middleware');
  // next 方法将请求交给后续中间件或路由处理
  next();
};

module.exports = mw;

// 中间件注意事项：
// 1.一定要在路由之前注册中间件
// 2.客户端请求可以连续调用多个中间件进行处理
// 3.执行完中间件业务后，不要忘记调用 next
// 4.为了防止代码逻辑混乱，调用 next 后不要写额外代码
// 5.连续调用多个中间件时，多个中间件共享 req 和 res

// 中间件五大类别：
// 应用级别中间件：通过 app.use、app.get、app.post 等绑定到 app 实例上的中间件叫做应用级别中间件
// 路由级别中间件：绑定到 express.Router 实例上的中间件叫做路由级别中间件，用法和应用级别中间件类似
// 错误级别中间件：专门用来捕获整个项目中发生的异常错误，从而防止项目异常崩溃
// app.use((err,req,res,next)=>{}) 错误级别中间件必须注册在所有路由之后
// express 三个内置中间件：express.static 快速托管静态资源（html、images、css、js 等）
// express.json 解析 JSON 格式的请求体数据（仅在 express 4.16.0+ 版本中可用）
// express.urlencoded 解析 URL-encoded 格式的请求体数据（仅在 express 4.16.0+ 版本中可用）
// 第三方中间件：非 express 官方内置的，而是由第三方开发的中间件；例如：在 express 4.16.0 之前，使用 body-parser 来解析请求体数据
