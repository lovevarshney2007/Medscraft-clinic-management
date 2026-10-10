const patientService = require('../services/patient.service');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');

// Handler for root /api/patients (legacy frontend compatibility expecting raw array)
const getPatientsLegacy = asyncHandler(async (req, res) => {
  const patients = await patientService.getAllPatients(req.query);
  res.json(patients);
});

// Standard REST handler for /api/v1/patients
const getPatients = asyncHandler(async (req, res) => {
  const patients = await patientService.getAllPatients(req.query);
  res.status(200).json(ApiResponse.success(patients, 'Patients retrieved successfully'));
});

const getPatientById = asyncHandler(async (req, res) => {
  const patient = await patientService.getPatientById(req.params.id);
  res.status(200).json(patient);
});

const createPatient = asyncHandler(async (req, res) => {
  const patient = await patientService.createPatient(req.body);
  res.status(201).json(ApiResponse.created(patient, 'Patient created successfully'));
});

const updatePatient = asyncHandler(async (req, res) => {
  const patient = await patientService.updatePatient(req.params.id, req.body);
  res.status(200).json(ApiResponse.success(patient, 'Patient updated successfully'));
});

const deletePatient = asyncHandler(async (req, res) => {
  const result = await patientService.deletePatient(req.params.id);
  res.status(200).json(ApiResponse.success(result, 'Patient deleted successfully'));
});

module.exports = {
  getPatientsLegacy,
  getPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
};
