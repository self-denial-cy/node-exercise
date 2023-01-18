const Joi = require('joi');

exports.addArticleCategorySchema = {
  body: {
    name: Joi.string().required(),
    alias: Joi.string().alphanum().required()
  }
};
