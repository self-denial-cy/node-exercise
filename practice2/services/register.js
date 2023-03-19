const User = require('../models/user');

module.exports = {
  register: (data) => {
    const user = new User(data);
    return user.save();
  }
};
