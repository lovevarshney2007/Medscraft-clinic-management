const doctorService = require('../services/doctor.service');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');

// Handler for root /api/doctors (legacy frontend compatibility expecting raw array)
const getDoctorsLegacy = asyncHandler(async (req, res) => {
  const doctors = await doctorService.getAllDoctors(req.query);
  res.json(doctors);
});

// Standard REST handler for /api/v1/doctors
const getDoctors = asyncHandler(async (req, res) => {
  const doctors = await doctorService.getAllDoctors(req.query);
  res.status(200).json(ApiResponse.success(doctors, 'Doctors retrieved successfully'));
});

const getDoctorById = asyncHandler(async (req, res) => {
  const doctor = await doctorService.getDoctorById(req.params.id);
  res.status(200).json(doctor);
});

const createDoctor = asyncHandler(async (req, res) => {
  const doctor = await doctorService.createDoctor(req.body);
  res.status(201).json(ApiResponse.created(doctor, 'Doctor created successfully'));
});

const updateDoctor = asyncHandler(async (req, res) => {
  const doctor = await doctorService.updateDoctor(req.params.id, req.body);
  res.status(200).json(ApiResponse.success(doctor, 'Doctor updated successfully'));
});

const deleteDoctor = asyncHandler(async (req, res) => {
  const result = await doctorService.deleteDoctor(req.params.id);
  res.status(200).json(ApiResponse.success(result, 'Doctor deleted successfully'));
});

module.exports = {
  getDoctorsLegacy,
  getDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};
