const clinicService = require('../services/clinic.service');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');

const getClinicsLegacy = asyncHandler(async (req, res) => {
  const clinics = await clinicService.getAllClinics(req.query);
  res.json(clinics);
});

const getClinics = asyncHandler(async (req, res) => {
  const clinics = await clinicService.getAllClinics(req.query);
  res.status(200).json(ApiResponse.success(clinics, 'Clinics retrieved successfully'));
});

const getClinicById = asyncHandler(async (req, res) => {
  const clinic = await clinicService.getClinicById(req.params.id);
  res.status(200).json(ApiResponse.success(clinic, 'Clinic details retrieved'));
});

const createClinic = asyncHandler(async (req, res) => {
  const clinic = await clinicService.createClinic(req.body);
  res.status(201).json(ApiResponse.created(clinic, 'Clinic created successfully'));
});

const updateClinic = asyncHandler(async (req, res) => {
  const clinic = await clinicService.updateClinic(req.params.id, req.body);
  res.status(200).json(ApiResponse.success(clinic, 'Clinic updated successfully'));
});

const deleteClinic = asyncHandler(async (req, res) => {
  const result = await clinicService.deleteClinic(req.params.id);
  res.status(200).json(ApiResponse.success(result, 'Clinic deleted successfully'));
});

module.exports = {
  getClinicsLegacy,
  getClinics,
  getClinicById,
  createClinic,
  updateClinic,
  deleteClinic,
};
