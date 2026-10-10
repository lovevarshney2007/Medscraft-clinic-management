const ApiError = require('../utils/ApiError');

const validate = (schema) => (req, res, next) => {
  try {
    if (schema.body && req.body) {
      req.body = schema.body.parse(req.body);
    }
    if (schema.query && req.query) {
      req.query = schema.query.parse(req.query);
    }
    if (schema.params && req.params) {
      req.params = schema.params.parse(req.params);
    }
    next();
  } catch (error) {
    const issues = error.issues || error.errors;
    if (issues && Array.isArray(issues)) {
      const formattedErrors = issues.map((err) => ({
        field: (err.path || []).join('.'),
        message: err.message,
      }));
      return next(ApiError.badRequest('Validation error', formattedErrors));
    }
    return next(error);
  }
};

module.exports = validate;
