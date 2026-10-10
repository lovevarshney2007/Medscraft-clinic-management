const staffService = require('../services/staff.service');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');

const getStaffLegacy = asyncHandler(async (req, res) => {
  const staff = await staffService.getAllStaff(req.query);
  res.json(staff);
});

const getStaff = asyncHandler(async (req, res) => {
  const staff = await staffService.getAllStaff(req.query);
  res.status(200).json(ApiResponse.success(staff, 'Staff members retrieved successfully'));
});

const getStaffById = asyncHandler(async (req, res) => {
  const staff = await staffService.getStaffById(req.params.id);
  res.status(200).json(ApiResponse.success(staff, 'Staff member details retrieved'));
});

const createStaff = asyncHandler(async (req, res) => {
  const staff = await staffService.createStaff(req.body);
  res.status(201).json(ApiResponse.created(staff, 'Staff member added successfully'));
});

const updateStaff = asyncHandler(async (req, res) => {
  const staff = await staffService.updateStaff(req.params.id, req.body);
  res.status(200).json(ApiResponse.success(staff, 'Staff member updated successfully'));
});

const deleteStaff = asyncHandler(async (req, res) => {
  const result = await staffService.deleteStaff(req.params.id);
  res.status(200).json(ApiResponse.success(result, 'Staff member removed successfully'));
});

module.exports = {
  getStaffLegacy,
  getStaff,
  getStaffById,
  createStaff,
  updateStaff,
  deleteStaff,
};
