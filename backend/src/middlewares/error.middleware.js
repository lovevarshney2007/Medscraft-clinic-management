const ApiError = require('../utils/ApiError');
const env = require('../config/env');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let error = err;

  // Handle Zod validation error fallback
  if (err.name === 'ZodError' || err.issues) {
    const issues = err.issues || err.errors || [];
    const formatted = issues.map((i) => ({
      field: (i.path || []).join('.'),
      message: i.message,
    }));
    error = ApiError.badRequest('Validation error', formatted);
  }

  // Handle Prisma Known Request Errors
  if (err.code === 'P2002') {
    const target = err.meta?.target ? ` (${err.meta.target})` : '';
    error = ApiError.conflict(`A record with this field already exists${target}`);
  } else if (err.code === 'P2025') {
    error = ApiError.notFound('Requested record does not exist or was deleted');
  }

  // Handle invalid JSON body syntax
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    error = ApiError.badRequest('Malformed JSON in request body');
  }

  // Fallback for non-ApiError unexpected errors
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    error = new ApiError(statusCode, message, [], false, err.stack);
  }

  const response = {
    success: false,
    message: error.message,
    ...(error.errors && error.errors.length > 0 && { errors: error.errors }),
    ...(env.NODE_ENV === 'development' && { stack: error.stack }),
  };

  if (env.NODE_ENV === 'development' && error.statusCode >= 500) {
    console.error('💥 Unhandled Server Exception:', err);
  }

  return res.status(error.statusCode).json(response);
};

module.exports = errorHandler;
