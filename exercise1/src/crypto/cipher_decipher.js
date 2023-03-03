// 加解密主要使用以下方法：
// 加密：crypto.createCipher(algorithm, password) crypto.createCipheriv(algorithm, key, iv)
// 解密：crypto.createDecipher(algorithm, password) crypto.createDecipheriv(algorithm, key, iv)
const crypto = require('crypto');

const content = '1qazxsw23edcvfr4';

// crypto.createCipher / crypto.createDecipher
// algorithm 加密算法，比如 aes192，具体有哪些可选算法，依赖于本地 openssl 版本
// password 用来生成密钥【key】、初始化向量【iv】
// 这组方法已经被弃用，略

// crypto.createCipheriv / crypto.createDecipheriv
// 相对于第一组方法来说，当前组方法需要提供 key 和 iv，而第一组是根据用户提供的 password 算出来的
// key、iv 可以是 Buffer，也可以是 utf8 编码的字符串，这里需要关注的是它们的长度
// key 的长度跟选择的算法有关，比如 aes128、aes192、aes256，长度分别是 128、192、256 位【16、24、32 字节】
// iv 初始化向量都是 128 位【16 字节】，也可以理解为密码盐的一种
const key = crypto.randomBytes(192 / 8);
const iv = crypto.randomBytes(128 / 8);
const algorithm = 'aes192';
const encoding = 'hex';

const encrypt = (data) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  // https://www.codenong.com/33586060/
  // aes 算法中，需要将 update 与 final 返回的内容拼接起来才完整，否则在加解密过程中会丢数据导致报错
  return cipher.update(data, 'utf8', encoding) + cipher.final(encoding);
};

const decrypt = (code) => {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  return decipher.update(code, encoding, 'utf8') + decipher.final('utf8');
};

const crypted = encrypt(content);

console.log(crypted);

const decrypted = decrypt(crypted);

console.log(decrypted);
