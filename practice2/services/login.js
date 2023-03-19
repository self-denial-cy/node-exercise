const User = require('../models/user');
const { sign } = require('../utils/JWT');

module.exports = {
  login: async (username, password) => {
    const user = await User.findOne({ username }).exec();
    if (!user) return;
    if (password !== user.password) return;
    const token = sign({ id: user._id, username: user.username });
    return token;
  }
};
