const mongoose = require('../index');
const Schema = mongoose.Schema;

// 创建约束
const petSchema = new Schema({
  name: String,
  age: Number,
  ownerId: String
});

// 创建模型
const Pet = mongoose.model('pets', petSchema);

module.exports = Pet;
