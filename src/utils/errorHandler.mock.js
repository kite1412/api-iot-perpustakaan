class AppError extends Error {
  constructor(message, statusCode, errorCode) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends AppError {
  constructor(errors) {
    super('Validation Error', 400, 'validation_error');
    this.errors = errors.map((err) => ({
      field: err.field || (err.context ? err.context.key : undefined),
      message: err.message,
    }));
  }
}

class AuthError extends AppError {
  constructor(message = 'Autentikasi gagal') {
    super(message, 401, 'auth_error');
  }
}

class UnauthorizedError extends AppError {
  constructor(message = 'Tidak terotorisasi') {
    super(message, 401, 'unauthorized');
  }
}

class ForbiddenError extends AppError {
  constructor(message = 'Akses ditolak') {
    super(message, 403, 'forbidden');
  }
}

class NotFoundError extends AppError {
  constructor(message = 'Resource tidak ditemukan') {
    super(message, 404, 'not_found');
  }
}

const handleError = (err, req, res) => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json({
      errors: err.errors.map((error) => ({
        code: err.errorCode,
        field: error.field,
        message: error.message,
      })),
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      errors: [
        {
          code: err.errorCode,
          message: err.message,
        },
      ],
    });
  }

  // unexpected error
  return res.status(500).json({
    errors: [
      {
        code: 'server_error',
        message: 'Terjadi kesalahan pada server',
      },
    ],
  });
};

module.exports = {
  AppError,
  ValidationError,
  AuthError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  handleError,
};
