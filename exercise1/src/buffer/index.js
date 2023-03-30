const { Buffer, Blob } = require('buffer');

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
console.log(Buffer.from('68656c6c6f20776f726c64', 'hex').toString('utf8'));

console.log(Buffer.from('1ag123', 'hex')); // <Buffer 1a>，遇到第一个非十六进制值截断
console.log(Buffer.from('1a7', 'hex')); // <Buffer 1a>，数据以一位数结尾时，截断该一位数
console.log(Buffer.from('1634', 'hex')); // <Buffer 16 34>

/**
 * 使用 for...of 迭代 Buffer 实例，打印出来的都是十进制整数
 * buf.values() | buf.keys() | buf.entries() 可以创造迭代器
 */
const buffer8 = Buffer.from([255, 16, 31]);
console.log(buffer8);
for (const b of buffer8) {
  console.log(b);
}

/**
 * 在 NodeJs 中使用 Blob 类，v18.0.0 才正式纳入标准，此版本之前都处于实验性阶段
 * Blob 封装了不可变的原始数据，可以在多个工作线程之间安全的共享
 * new Blob([sources[, options]])
 * sources 接受数据源
 * options.endings transparent|native，设置为 native 时，字符串数据源中的行尾将转换为 require('os').EOL 指定的平台原生的行尾
 * options.type Blob 内容类型，目的是传递数据的 MIME 媒体类型，但不执行类型格式的验证
 */
const blob1 = new Blob(['hello world', 'hello blob']);
console.log(blob1.size); // 返回 Blob 的总大小，单位为字节
const blob2 = blob1.slice(11, 21, 'txt'); // 创建并返回包含此 Blob 对象数据子集的新 Blob，不影响原 Blob
console.log(blob2);
console.log(blob2.type); // 返回 Blob 的内容类型
console.log(blob1);
console.log(blob1.stream()); // 返回允许读取 Blob 内容的新 ReadableStream
(async () => {
  console.log(await blob1.arrayBuffer()); // 返回使用包含 Blob 数据副本的 ArrayBuffer 履行的 Promise
  console.log(await blob2.text()); // 返回使用解码为 utf8 字符串的 Blob 内容履行的 Promise
})();

/**
 * Buffer.concat(list[, totalLength])
 * list 要连接的 Buffer 或 Uint8Array 实例的列表
 * totalLength 连接时 list 中 Buffer 实例的总长度
 * 返回新的 Buffer，它是将 list 中所有的 Buffer 实例连接在一起的结果
 * 如果列表没有条目，或者 totalLength 为 0，则返回新的零长度 Buffer
 * 如果未提供 totalLength，则从 list 中的 Buffer 实例通过相加其长度来计算
 * 如果提供了 totalLength，则强制其为无符号整数，如果自动计算出的组合长度超过 totalLength，则截断
 */
const buffer9 = Buffer.alloc(9);
const buffer10 = Buffer.alloc(10);
const buffer11 = Buffer.alloc(11);
console.log(Buffer.concat([buffer9, buffer10, buffer11]));

console.log(Buffer.isBuffer(Buffer.alloc(1))); // 判断是否为 Buffer
console.log(Buffer.isBuffer('string'));
console.log(Buffer.isBuffer(new Uint8Array(1024)));

console.log(Buffer.isEncoding('utf8')); // 判断是否支持该字符编码
console.log(Buffer.isEncoding('utf/8'));

/**
 * 索引运算符可用于获取和设置 buffer 中对应位置的八位字节，合法值范围介于 0x00|0xff 或 0|255 之间
 * 如果索引越界，则无效
 */
const str1 = 'Node.js';
const buffer12 = Buffer.allocUnsafe(str1.length);
for (const index in str1) {
  // 每次一个字节地将 ASCII 字符复制到 Buffer 中
  // 仅适用于 ASCII-only 字符串，通常都使用 Buffer.from 执行此转换
  console.log(str1.charCodeAt(index));
  buffer12[index] = str1.charCodeAt(index);
}
console.log(buffer12.toString());

console.log(buffer9.equals(buffer10)); // 判断 Buffer 是否具有完全相同的字节
console.log(buffer9.equals(Buffer.alloc(9)));
