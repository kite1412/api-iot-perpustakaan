const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../utils/errorHandler.mock');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new UnauthorizedError('Authentication token required');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new UnauthorizedError('Token expired', 'token_expired');
    }
    if (error.name === 'JsonWebTokenError') {
      throw new UnauthorizedError('Invalid token', 'invalid_token');
    }

    throw error; // Biarkan error handler utama yang menangani
  }
};

module.exports = authMiddleware;
