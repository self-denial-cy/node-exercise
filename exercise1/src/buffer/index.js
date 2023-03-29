const { Buffer } = require('buffer');

/**
 * Buffer 对象用于表示固定长度的字节序列
 * Buffer 类是 JavaScript Uint8Array 类的子类，并对其进行额外扩展【NodeJs 中支持 Buffer 的地方也支持简单的 Uint8Array】
 * 虽然 Buffer 类全局作用域内可用，但仍然建议显式导入
 */

const buffer1 = Buffer.alloc(10); // 创建长度 10，以 00 填充的缓冲区【十六进制】
console.log(buffer1);

const buffer2 = Buffer.alloc(10, 1); // 创建长度 10，以 01 填充的缓冲区【十六进制】
console.log(buffer2);

/**
 * 创建长度 10，未初始化的缓冲区，这比调用 Buffer.alloc 快；
 * 但返回的实例中可能包含旧数据，需要使用 fill、write 等方法对缓冲区内容重写
 */
const buffer3 = Buffer.allocUnsafe(10);
console.log(buffer3);

const buffer4 = Buffer.from([255, 16, 31]); // 创建长度 3，包含字节 ff 10 1f 的缓冲区【十六进制】
console.log(buffer4);

/**
 * 创建长度 4，包含字节 01 01 01 01 的缓冲区【十六进制】
 * 每一项都进行 `(value & 255)` 的与操作进行截断以符合范围 0–255
 */
const buffer5 = Buffer.from([257, 257.5, -255, '1']);
console.log(buffer5);

const buffer6 = Buffer.from('tést', 'utf8'); // 创建包含字符串 tést 的 utf8 编码字节的缓冲区
console.log(buffer6);

/**
 * 当在 Buffer 和字符串之间进行转换时，可以指定字符编码，默认编码为 utf8
 * NodeJs 目前支持的字符编码：utf8、utf16le、latin1
 * 将 Buffer 转换为字符串称为【解码】，将字符串转换为 Buffer 称为【编码】
 * NodeJs 还支持二进制转文本的编码：base64、base64url、hex
 * 对于二进制转文本，将 Buffer 转换为字符串称为【编码】，将字符串转换为 Buffer 称为【解码】
 * NodeJs 还支持旧版字符编码：ascii、binary【latin1 别名】、ucs2|ucs-2【utf16le 别名】
 */
const buffer7 = Buffer.from('hello world', 'utf8');
console.log(buffer7);
console.log(buffer7.toString('hex'));
console.log(buffer7.toString('base64'));

console.log(Buffer.from('1ag123', 'hex')); // <Buffer 1a>，遇到第一个非十六进制值截断
console.log(Buffer.from('1a7', 'hex')); // <Buffer 1a>，数据以一位数结尾时，截断该一位数
console.log(Buffer.from('1634', 'hex')); // <Buffer 16 34>
