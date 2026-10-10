const ApiError = require('../utils/ApiError');

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(ApiError.unauthorized('User must be authenticated before verifying permissions'));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        ApiError.forbidden(
          `User role '${req.user.role}' is not authorized to access this resource. Allowed: [${roles.join(', ')}]`
        )
      );
    }

    next();
  };
};

module.exports = {
  authorize,
};
