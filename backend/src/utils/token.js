const jwt = require('jsonwebtoken');
const env = require('../config/env');

const generateToken = (payload) => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
};

const sendTokenResponse = (user, statusCode, res, message = 'Authenticated successfully') => {
  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  const cookieOptions = {
    expires: new Date(Date.now() + env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: env.NODE_ENV === 'production' ? 'none' : 'lax',
  };

  res.cookie('token', token, cookieOptions);

  const safeUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone,
    avatar: user.avatar,
    doctorProfile: user.doctorProfile,
    patientProfile: user.patientProfile,
    clinicProfile: user.clinicProfile,
  };

  return res.status(statusCode).json({
    success: true,
    message,
    token,
    user: safeUser,
  });
};

module.exports = {
  generateToken,
  sendTokenResponse,
};
