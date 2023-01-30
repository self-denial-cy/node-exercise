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

exports.updateArticleCategorySchema = {
  body: {
    id: Joi.number().integer().min(1).required(),
    name: Joi.string().required(),
    alias: Joi.string().alphanum().required()
  }
};

exports.addArticleSchema = {
  body: {
    title: Joi.string().required(),
    categoryId: Joi.number().integer().min(1).required(),
    content: Joi.string().required().allow(''),
    state: Joi.string().valid('已发布', '草稿').required()
  }
};
