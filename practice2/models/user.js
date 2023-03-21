const mongoose = require('../db');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  }
});

const User = mongoose.model('user', userSchema);

module.exports = User;
