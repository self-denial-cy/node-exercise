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
