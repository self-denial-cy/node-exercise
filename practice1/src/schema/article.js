const Joi = require('joi');

exports.addArticleCategorySchema = {
  body: {
    name: Joi.string().required(),
    alias: Joi.string().alphanum().required()
  }
};

exports.delArticleCategorySchema = {
  params: {
    id: Joi.number().integer().min(1).required()
  }
};

exports.getArticleCategorySchema = {
  params: {
    id: Joi.number().integer().min(1).required()
  }
};
