const Joi = require('joi');

const memberIdParamSchema = Joi.object({
  member_id: Joi.number().integer().positive().required(),
});

module.exports = {
  memberIdParamSchema,
};
