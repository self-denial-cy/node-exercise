const mongoose = require('../index');
const Schema = mongoose.Schema;

const Pet = require('./pet');

// 创建约束
const userSchema = new Schema({
  name: String,
  age: Number,
  gender: {
    type: String,
    default: 'male'
  },
  address: String,
  isSick: {
    type: Boolean,
    default: false
  },
  birthTime: {
    type: Date,
    default: Date.now
  },
  hobbies: [{ name: String, category: String }]
});

// 添加实例方法
userSchema.methods.findPets = function () {
  // 这里因为需要 this 指向当前 User 实例，因此不能使用箭头函数
  return Pet.find({ ownerId: this._id }).exec();
};

// 添加静态方法
userSchema.statics.findByName = function (name) {
  // 这里的 this 指向 User 模型
  return this.find({ name: name }).exec();
};

// 添加查询辅助方法
userSchema.query.byName = function (name) {
  return this.where({ name: name }).exec();
};

// 创建模型
const User = mongoose.model('user', userSchema);

module.exports = User;
