const Joi = require('joi');

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(50).required(),
  password: Joi.string().min(6).max(100).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({ 'any.only': 'Confirm password does not match' }),
});

const loginSchema = Joi.object({
  username: Joi.string().min(3).max(50).required(),
  password: Joi.string().min(6).max(100).required(),
});

module.exports = {
  registerSchema,
  loginSchema,
};
