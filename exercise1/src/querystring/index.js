const querystring = require('querystring');

/**
 * 常用于解析 URL 中查询字符串部分
 * querystring.parse(str[, sep[, eq[, options]]])
 * str 要解析的网址查询字符串
 * sep 用于在查询字符串中分隔键值对的子字符串，默认值 &
 * eq 用于在查询字符串中分隔键和值的子字符串，默认值 =
 * options.decodeURIComponent 当对查询字符串中百分比编码字符进行解码时使用的函数，默认值 querystring.unescape()
 * options.maxKeys 指定要解析的最大键数，指定为 0 以删除键的计数限制
 *
 * querystring.stringify(obj[, sep[, eq[, options]]])
 * obj 要序列化为网址查询字符串的对象
 * sep 用于在查询字符串中分隔键值对的子字符串，默认值 &
 * eq 用于在查询字符串中分隔键和值的子字符串，默认值 =
 * options.encodeURIComponent 当将网址不安全的字符转换为百分比编码时使用的函数，默认值 querystring.escape()
 *
 * querystring.unescape(str) 默认情况下，该方法内部尝试使用 decodeURIComponent 方法进行解码
 * querystring.escape(str) 默认情况下，该方法内部尝试使用 encodeURIComponent 方法进行编码
 * decodeURIComponent、encodeURIComponent 就是按照 UTF-8 规范进行解码和编码
 */

console.log(querystring.parse('foo=bar&abc=xyz&abc=123')); // 返回的对象通常不是从 Object 继承的原型，所以 Object.prototype 上的方法，它是无法调用的

console.log(querystring.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' }));

console.log(querystring.unescape(encodeURIComponent('中文')));

console.log(decodeURIComponent(querystring.escape('中文')));
