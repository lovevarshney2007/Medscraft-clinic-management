const dashboardService = require('../services/dashboard.service');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');

const getClinicDashboard = asyncHandler(async (req, res) => {
  const clinicId = req.query.clinicId || (req.user?.clinicProfile?.id);
  const data = await dashboardService.getClinicDashboardStats(clinicId);
  res.status(200).json(ApiResponse.success(data, 'Clinic dashboard statistics retrieved'));
});

const getAdminDashboard = asyncHandler(async (req, res) => {
  const data = await dashboardService.getAdminDashboardStats();
  res.status(200).json(ApiResponse.success(data, 'Admin dashboard statistics retrieved'));
});

module.exports = {
  getClinicDashboard,
  getAdminDashboard,
};
