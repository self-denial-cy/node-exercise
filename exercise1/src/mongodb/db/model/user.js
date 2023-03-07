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
  hobbies: [{ name: String, type: String }]
});

userSchema.methods.findPets = function (cb) {
  // 这里因为需要 this 指向当前 User 实例，因此不能使用箭头函数
  // TODO BugFix
  return Pet.find({ ownerId: this._id }, cb);
};

// 创建模型
const User = mongoose.model('user', userSchema);

module.exports = User;
