const crypto = require('crypto');
// crypto 模块的目的是为了提供通用的加密和哈希算法，用纯 Javascript 代码实现这些功能不是不可能，但是速度非常慢；
// NodeJs 用 C/C++ 实现这些算法后，通过 crypto 这个模块暴露为 Javascript 接口，这样用起来方便，运行速度也快

const content = '1qazxsw212309876544';

// Hash 将不固定长度的信息输入 Hash 函数，生成固定长度的输出；
// 一般用于敏感信息【比如密码】的校验和存储、验证信息或文件的完整性 & 未被篡改；
// 特点：
// 1.输出长度固定，输入长度不固定，输出长度固定（因算法而异，常见的有 MD5、SHA）
// 2.运算不可逆：已知运算结果的情况下，无法通过逆运算得到原始信息
// 3.高离散：输入的微小变化，可能导致运算结果差异巨大
// 4.弱碰撞：不同输入的散列值可能相同
const md5 = crypto.createHash('md5');

// hash.digest([encoding]) encoding 可以是 hex、base64 等，若不指定则返回 Buffer 实例
// 当调用 digest 后，当前 hash 实例就作废了，再次调用就会报错
// hash.update(data[,encoding]) encoding 可以是 utf8、ascii 等，若 data 是字符串，且未指定 encoding，则默认为 utf8
// hash.update 可以调用多次
console.log(md5.update(content).digest('hex'));

const sha256 = crypto.createHash('sha256');
console.log(sha256.update(content).digest('hex'));
