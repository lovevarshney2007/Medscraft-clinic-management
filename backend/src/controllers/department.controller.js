const departmentService = require('../services/department.service');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');

const getDepartmentsLegacy = asyncHandler(async (req, res) => {
  const depts = await departmentService.getAllDepartments(req.query);
  res.json(depts);
});

const getDepartments = asyncHandler(async (req, res) => {
  const depts = await departmentService.getAllDepartments(req.query);
  res.status(200).json(ApiResponse.success(depts, 'Departments retrieved successfully'));
});

const getDepartmentById = asyncHandler(async (req, res) => {
  const dept = await departmentService.getDepartmentById(req.params.id);
  res.status(200).json(ApiResponse.success(dept, 'Department details retrieved'));
});

const createDepartment = asyncHandler(async (req, res) => {
  const dept = await departmentService.createDepartment(req.body);
  res.status(201).json(ApiResponse.created(dept, 'Department created successfully'));
});

const updateDepartment = asyncHandler(async (req, res) => {
  const dept = await departmentService.updateDepartment(req.params.id, req.body);
  res.status(200).json(ApiResponse.success(dept, 'Department updated successfully'));
});

const deleteDepartment = asyncHandler(async (req, res) => {
  const result = await departmentService.deleteDepartment(req.params.id);
  res.status(200).json(ApiResponse.success(result, 'Department deleted successfully'));
});

module.exports = {
  getDepartmentsLegacy,
  getDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
