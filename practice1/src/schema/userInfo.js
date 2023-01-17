const Joi = require('joi');

exports.updateUserInfoSchema = {
  body: {
    id: Joi.number().integer().min(1).required(),
    nickname: Joi.string().required(),
    email: Joi.string().email().required()
  }
};

exports.updatePwdSchema = {
  body: {
    oldPwd: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    newPwd: Joi.not(Joi.ref('oldPwd')).concat(Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required())
  }
};
