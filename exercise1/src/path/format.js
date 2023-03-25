const path = require('path');

/**
 * 根据参数生成路径
 * 接受一个对象作为参数，该对象有以下几个字段
 * dir
 * root
 * base
 * name
 * ext
 * 优先级：提供 dir 则忽略 root；提供 base 则忽略 ext 和 name
 */

console.log(
  path.format({
    root: '/ignored',
    dir: '/home/user/dir',
    base: 'file.txt'
  })
); // /home/user/dir/file.txt

console.log(
  path.format({
    root: '/',
    base: 'file.txt',
    ext: 'ignored'
  })
); // /file.txt

console.log(
  path.format({
    root: '/',
    name: 'file',
    ext: '.txt'
  })
); // /file.txt

console.log(
  path.format({
    dir: 'C:\\path\\dir',
    base: 'file.txt'
  })
); // C:\path\dir\file.txt
