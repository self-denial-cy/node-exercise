// HMAC 全称为 Hash-based Message Authentication Code，即 hash 的加盐运算；
// 使用方法与 hash 类似，只是多了一个【盐】
const crypto = require('crypto');

const content = '1qazxsw2';
// 加盐值
const salt = '789654qwertyu';

const md5 = crypto.createHmac('md5', salt);
console.log(md5.update(content).digest('hex'));

const sha256 = crypto.createHmac('sha256', salt);
console.log(sha256.update(content).digest('hex'));
