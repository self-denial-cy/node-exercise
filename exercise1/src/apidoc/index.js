const express = require('express');

const app = express();

// apidoc 通过解析代码中的注释来生成接口文档，当然对于注释是有格式要求的
// 下面的注释可以通过安装 vscode 扩展 ApiDoc Snippets 来自动生成
// 官方文档 https://apidocjs.com/

/**
 *
 * @api {post} /api/post 这是一个POST请求
 * @apiName POST请求
 * @apiGroup 默认分组
 * @apiVersion  1.0.0
 *
 *
 * @apiBody  {String} name 名称
 * @apiBody  {Number} age 年龄
 * @apiBody  {String} gender 性别
 * @apiBody  {Boolean} isSick 是否生病
 * @apiBody  {File} image 照片
 * @apiBody  {Object} address 地址
 * @apiBody  {String} address[street] 街道
 * @apiBody  {String} address[zip] 邮政编码
 * @apiBody  {String} address[city] 城市
 *
 * @apiSuccess {Number} ret 1成功 0失败
 * @apiSuccess {String} msg 提示信息
 *
 * @apiParamExample  {json} Request-Example:
 * {
 *    "name": "张三",
 *    "age": 24,
 *    "gender": "male",
 *    "isSick": false,
 *    "image": File,
 *    "address": {
 *        "street": "玛兰坡",
 *        "zip": "100000",
 *        "city": "天国"
 *    }
 * }
 *
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *    "ret": 1,
 *    "msg": "操作成功"
 * }
 *
 *
 */
app.post('/api/post', () => {
  // Do Some Thing
});

app.listen(8101, () => {
  console.log('server running at http://127.0.0.1:8101');
});
