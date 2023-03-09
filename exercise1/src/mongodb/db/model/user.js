const mongoose = require('../index');
const Schema = mongoose.Schema;

const Pet = require('./pet');

const hobbySchema = new Schema(
  {
    name: String,
    category: {
      $type: String
    }
  },
  {
    _id: false, // 禁用自动生成 _id 行为，但是只能在子数据中禁用，主数据中没有 _id 无法保存
    minimize: true, // 默认情况下，值为空对象的键会被移除，该选项为 false 时会将值为空对象的键保留下来
    strict: true, // 是否开启严格模式【默认开启】，在约束中未定义的键值不会被保存到数据库
    typeKey: '$type' // 默认情况下，会将 type 认定为声明类型的字段，但是有些字段就叫 type，可以使用 typeKey 指定为 $type 重新定义声明类型的字段
  }
);

// 创建约束
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      min: 1,
      max: 120
    },
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
    hobbies: [hobbySchema]
  },
  {
    collection: 'users', // 默认情况下，集合名称复数化，也可以选择手动指定集合名称
    versionKey: '__v' // 创建数据时会生成一个 __v 字段用于版本控制，该字段用来防止【取出数据到保存数据这段时间内，数据被其它进程修改而导致冲突】的情况
  }
);

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
