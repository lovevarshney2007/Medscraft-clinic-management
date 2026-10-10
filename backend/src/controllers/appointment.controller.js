const appointmentService = require('../services/appointment.service');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');

const getAppointmentsLegacy = asyncHandler(async (req, res) => {
  const appointments = await appointmentService.getAllAppointments(req.query);
  res.json(appointments);
});

const getAppointments = asyncHandler(async (req, res) => {
  const appointments = await appointmentService.getAllAppointments(req.query);
  res.status(200).json(ApiResponse.success(appointments, 'Appointments retrieved successfully'));
});

const getAppointmentById = asyncHandler(async (req, res) => {
  const appointment = await appointmentService.getAppointmentById(req.params.id);
  res.status(200).json(ApiResponse.success(appointment, 'Appointment details retrieved'));
});

const createAppointment = asyncHandler(async (req, res) => {
  const appointment = await appointmentService.createAppointment(req.body);
  res.status(201).json(ApiResponse.created(appointment, 'Appointment created successfully'));
});

const updateAppointment = asyncHandler(async (req, res) => {
  const appointment = await appointmentService.updateAppointment(req.params.id, req.body);
  res.status(200).json(ApiResponse.success(appointment, 'Appointment updated successfully'));
});

const deleteAppointment = asyncHandler(async (req, res) => {
  const result = await appointmentService.deleteAppointment(req.params.id);
  res.status(200).json(ApiResponse.success(result, 'Appointment deleted successfully'));
});

module.exports = {
  getAppointmentsLegacy,
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};
