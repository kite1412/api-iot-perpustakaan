const Joi = require('joi');

const getBooksQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
});

const getBookByIdParamsSchema = Joi.object({
  id: Joi.number().integer().min(1).required(),
});

const bookIdParamsSchema = Joi.object({
  id: Joi.number().integer().min(1).required(),
});

const bookUpdateBodySchema = Joi.object({
  title: Joi.string().max(100).optional(),
  author: Joi.string().max(100).optional(),
  publishYear: Joi.number().integer().min(1900).max(new Date().getFullYear()).optional(),
  isbn: Joi.string().max(20).optional(),
}).min(1);

const bookCreateSchema = Joi.object({
  title: Joi.string().max(100).required(),
  author: Joi.string().max(100).required(),
  publishYear: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
  isbn: Joi.string().max(20).required(),
  rfidTagId: Joi.number().integer().min(1).required(),
});

module.exports = {
  getBooksQuerySchema,
  getBookByIdParamsSchema,
  bookIdParamsSchema,
  bookUpdateBodySchema,
  bookCreateSchema,
};
