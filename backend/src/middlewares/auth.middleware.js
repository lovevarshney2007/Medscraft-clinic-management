const jwt = require('jsonwebtoken');
const env = require('../config/env');
const prisma = require('../config/prisma');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // 1. Check Bearer token in Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }
  // 2. Check HTTP-only cookie
  else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    throw ApiError.unauthorized('Authentication token is required to access this resource');
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: {
        doctorProfile: true,
        patientProfile: true,
        clinicProfile: true,
      },
    });

    if (!user || !user.isActive) {
      throw ApiError.unauthorized('User not found or account is deactivated');
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      throw ApiError.unauthorized('Session has expired. Please log in again.');
    }
    if (err.name === 'JsonWebTokenError') {
      throw ApiError.unauthorized('Invalid authentication token');
    }
    throw err;
  }
});

// Optional auth middleware for routes that can work for both logged-in and public users
const optionalAuth = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, env.JWT_SECRET);
      const user = await prisma.user.findUnique({ where: { id: decoded.id } });
      if (user && user.isActive) {
        req.user = user;
      }
    } catch {
      // Ignore token validation failure in optionalAuth
    }
  }
  next();
});

module.exports = {
  protect,
  optionalAuth,
};
