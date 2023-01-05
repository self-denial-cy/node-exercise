require('./b');

console.log('this is a');

let count = 0;

const obj = {
  count: 0
};

const add = () => {
  count += 1;
  obj.count += 1;
  console.log(count);
  console.log(obj);
};

module.exports.aaa = 123;

// 导出的 obj 是引用类型，导出的是一份拷贝的引用地址，与本模块中的 obj 一样，依旧指向同一个对象
// 导出的 count 是原始类型，导出的是一份拷贝的值，与本模块中的 count 已经是两个东西了
module.exports = {
  obj,
  count,
  add
};
