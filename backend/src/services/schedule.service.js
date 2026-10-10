const prisma = require('../config/prisma');
const ApiError = require('../utils/ApiError');

const formatDoctorName = (doc) => {
  if (!doc) return 'Assigned Doctor';
  const name = doc.name || '';
  return name.startsWith('Dr.') || name.startsWith('Dr ') ? name : `Dr. ${name}`;
};

const formatSchedule = (s) => ({
  id: s.id,
  doctorId: s.doctorId,
  DoctorName: formatDoctorName(s.doctor),
  Department: s.doctor?.department || s.doctor?.dept?.name || 'General',
  AvailableDays: s.availableDays,
  AvailableTime: `${s.fromTime} - ${s.toTime}`,
  fromTime: s.fromTime,
  toTime: s.toTime,
  consultingTime: s.consultingTime,
  Status: s.status,
  status: s.status,
  doctor: s.doctor,
  createdAt: s.createdAt,
  updatedAt: s.updatedAt,
});

const getAllSchedules = async (query = {}) => {
  const { doctorId, status } = query;
  const where = {};
  if (doctorId) where.doctorId = parseInt(doctorId, 10);
  if (status) where.status = status;

  const schedules = await prisma.doctorSchedule.findMany({
    where,
    include: {
      doctor: {
        include: { dept: true },
      },
    },
    orderBy: { id: 'asc' },
  });

  return schedules.map(formatSchedule);
};

const getScheduleById = async (id) => {
  const schedule = await prisma.doctorSchedule.findUnique({
    where: { id: parseInt(id, 10) },
    include: { doctor: true },
  });
  if (!schedule) throw ApiError.notFound(`Schedule with ID ${id} not found`);
  return formatSchedule(schedule);
};

const createSchedule = async (data) => {
  const schedule = await prisma.doctorSchedule.create({
    data: {
      doctorId: parseInt(data.doctorId, 10),
      availableDays: data.availableDays || data.AvailableDays || 'Monday - Friday',
      fromTime: data.fromTime || '09:00 AM',
      toTime: data.toTime || '05:00 PM',
      consultingTime: data.consultingTime ? parseInt(data.consultingTime, 10) : 15,
      status: data.status || data.Status || 'Active',
    },
    include: { doctor: true },
  });
  return formatSchedule(schedule);
};

const updateSchedule = async (id, data) => {
  const schedId = parseInt(id, 10);
  await getScheduleById(schedId);
  const updated = await prisma.doctorSchedule.update({
    where: { id: schedId },
    data,
    include: { doctor: true },
  });
  return formatSchedule(updated);
};

const deleteSchedule = async (id) => {
  const schedId = parseInt(id, 10);
  await getScheduleById(schedId);
  await prisma.doctorSchedule.delete({ where: { id: schedId } });
  return { id: schedId, message: 'Schedule deleted successfully' };
};

module.exports = {
  getAllSchedules,
  getScheduleById,
  createSchedule,
  updateSchedule,
  deleteSchedule,
};
