const Joi = require('joi');

exports.updateUserInfoSchema = {
  body: {
    id: Joi.number().integer().min(1).required(),
    nickname: Joi.string().required(),
    email: Joi.string().email().required()
  }
};
