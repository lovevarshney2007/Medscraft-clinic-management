const scheduleService = require('../services/schedule.service');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');

const getSchedulesLegacy = asyncHandler(async (req, res) => {
  const schedules = await scheduleService.getAllSchedules(req.query);
  res.json(schedules);
});

const getSchedules = asyncHandler(async (req, res) => {
  const schedules = await scheduleService.getAllSchedules(req.query);
  res.status(200).json(ApiResponse.success(schedules, 'Doctor schedules retrieved'));
});

const getScheduleById = asyncHandler(async (req, res) => {
  const schedule = await scheduleService.getScheduleById(req.params.id);
  res.status(200).json(ApiResponse.success(schedule, 'Schedule details retrieved'));
});

const createSchedule = asyncHandler(async (req, res) => {
  const schedule = await scheduleService.createSchedule(req.body);
  res.status(201).json(ApiResponse.created(schedule, 'Schedule created successfully'));
});

const updateSchedule = asyncHandler(async (req, res) => {
  const schedule = await scheduleService.updateSchedule(req.params.id, req.body);
  res.status(200).json(ApiResponse.success(schedule, 'Schedule updated successfully'));
});

const deleteSchedule = asyncHandler(async (req, res) => {
  const result = await scheduleService.deleteSchedule(req.params.id);
  res.status(200).json(ApiResponse.success(result, 'Schedule deleted successfully'));
});

module.exports = {
  getSchedulesLegacy,
  getSchedules,
  getScheduleById,
  createSchedule,
  updateSchedule,
  deleteSchedule,
};
