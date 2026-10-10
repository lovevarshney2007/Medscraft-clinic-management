const authService = require('../services/auth.service');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const { sendTokenResponse } = require('../utils/token');

const register = asyncHandler(async (req, res) => {
  const user = await authService.registerUser(req.body);
  sendTokenResponse(user, 201, res, 'Registration successful');
});

const login = asyncHandler(async (req, res) => {
  const user = await authService.loginUser(req.body);
  sendTokenResponse(user, 200, res, 'Login successful');
});

const logout = asyncHandler(async (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  return res.status(200).json(ApiResponse.success(null, 'Logged out successfully'));
});

const getMe = asyncHandler(async (req, res) => {
  const user = await authService.getCurrentUser(req.user.id);
  return res.status(200).json(ApiResponse.success(user, 'Current user profile fetched'));
});

module.exports = {
  register,
  login,
  logout,
  getMe,
};
