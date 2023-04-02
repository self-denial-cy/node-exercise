const os = require('os');

console.log(os.EOL); // 操作系统特定的行尾标记 POSIX \n Windows \r\n
console.log(os.arch()); // 返回系统 CPU 架构【arm、arm64、ia32、mips、mipsel、ppc、ppc64、s390、s390x、x64】
console.log(process.arch);
console.log(os.userInfo()); // 返回当前用户的信息
