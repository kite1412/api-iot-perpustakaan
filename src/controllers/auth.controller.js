const { registerSchema, loginSchema } = require('../models/auth.model');
const { register, login } = require('../services/auth.service');
const { ValidationError, AuthError } = require('../utils/errorHandler.mock');

async function registerHandler(req, res) {
  try {
    console.log(req.body);

    const { error, value } = registerSchema.validate(req.body);

    if (error) {
      throw new ValidationError(error.details);
    }

    const { username, password } = value;

    const result = await register(username, password);

    res.status(201).json({
      message: 'Registration successful',
      token: result.token,
      user: result.user,
    });
  } catch (err) {
    throw new ValidationError(error.details);
  }
}

async function loginHandler(req, res) {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      throw new ValidationError(error.details);
    }

    const { username, password } = value;

    const result = await login(username, password);

    res.json({
      message: 'Login successful',
      token: result.token,
      user: result.user,
    });
  } catch (err) {
    throw new AuthError(err.message);
  }
}

module.exports = {
  registerHandler,
  loginHandler,
};
