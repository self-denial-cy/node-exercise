const mongoose = require('../index');
const Schema = mongoose.Schema;

// 创建约束
const petSchema = new Schema({
  name: String,
  age: Number,
  ownerId: String,
  w: {
    type: Number,
    alias: 'weight' // 别名就是一种特殊的虚拟属性
  }
});

// 创建虚拟属性【getter、setter】
// 由于虚拟属性不是真实存储在数据库的字段，因此无法使用它进行查询
petSchema
  .virtual('desc')
  .get(function () {
    return `${this.name}【${this.age}】`;
  })
  .set(function (value) {
    this.name = value.substr(0, value.indexOf(' '));
    this.age = value.substr(value.indexOf(' ') + 1);
  });

// 创建模型
const Pet = mongoose.model('pets', petSchema);

module.exports = Pet;
