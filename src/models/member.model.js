const Joi = require('joi');

const memberCreateSchema = Joi.object({
  name: Joi.string().max(100).required(),
  memberId: Joi.string().max(20).required(),
  rfidTagId: Joi.number().integer().min(1).required(),
});

const getMembersQuerySchema = Joi.object({
  name: Joi.string().max(100).optional(),
  memberId: Joi.string().max(20).optional(),
  limit: Joi.number().integer().min(1).max(100).optional(),
  offset: Joi.number().integer().min(0).optional(),
});

// Validasi parameter ID (path param)
const memberIdParamSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});

// Validasi update member (PUT)
const updateMemberSchema = Joi.object({
  name: Joi.string().max(100).optional(),
  memberId: Joi.string().max(20).optional(),
  // Tambahkan field lain yang bisa diupdate jika ada
});

module.exports = {
  memberCreateSchema,
  getMembersQuerySchema,
  memberIdParamSchema,
  updateMemberSchema,
};
