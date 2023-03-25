const url1 = new URL('https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash');

console.log(url1.protocol); // 协议 https:
console.log(url1.username); // 用户 user
console.log(url1.password); // 密码 pass
console.log(url1.host); // 主机 sub.example.com:8080
console.log(url1.hostname); // 主机名 sub.example.com
console.log(url1.port); // 端口 8080
console.log(url1.pathname); // 路径 /p/a/t/h
console.log(url1.search); // 查询字符串 ?query=string
console.log(url1.searchParams); // 解析后的查询字符串，可以使用 .get 获取对应参数 URLSearchParams { 'query' => 'string' }
console.log(url1.hash); // 哈希 #hash
console.log(url1.href); // https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash
console.log(url1.origin); // https://sub.example.com:8080

const url2 = new URL('https://example.org');
url2.pathname = '/a/b/c';
url2.search = '?d=e';
url2.hash = '#fgh';
console.log(url2.href); // 构建 WHATWG 网址

const pathname = '/a/b/c';
const search = '?d=e';
const hash = '#fgh';
const url3 = new URL(`https://example.org${pathname}${search}${hash}`);
console.log(url3.href); // 构建 WHATWG 网址
