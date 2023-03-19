const User = require('../models/user');

module.exports = {
  update: (id, data) => {
    return User.updateOne({ _id: id }, { ...data }).exec();
  },
  del: (id) => {
    return User.deleteOne({ _id: id }).exec();
  },
  list: () => {
    return User.find().select('_id username').sort({ username: 1 }).exec();
  }
};
