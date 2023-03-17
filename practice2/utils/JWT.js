const jwt = require('jsonwebtoken');
const { secretKey, expiresIn } = require('../config/index');

exports.sign = (payload) => {
  return jwt.sign(payload, secretKey, { expiresIn: expiresIn });
};

exports.verify = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    console.log(err);
    return false;
  }
};
