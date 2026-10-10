const prisma = require('../config/prisma');
const ApiError = require('../utils/ApiError');

const formatDoctorName = (doc) => {
  if (!doc) return 'Assigned Doctor';
  const name = doc.name || '';
  return name.startsWith('Dr.') || name.startsWith('Dr ') ? name : `Dr. ${name}`;
};

const formatAppointment = (apt) => {
  const doctorNameFormatted = formatDoctorName(apt.doctor);
  return {
    id: apt.id,
    appointmentNumber: apt.appointmentNumber,
    patientId: apt.patientId,
    patient: apt.patient,
    Name: apt.patient?.name || 'Patient',
    doctorId: apt.doctorId,
    doctor: apt.doctor,
    ConsultingDoctor: doctorNameFormatted,
    DoctorName: doctorNameFormatted,
    doctorName: apt.doctor?.name || 'Assigned Doctor',
    clinicId: apt.clinicId,
    clinic: apt.clinic,
    department: apt.department || 'Outpatient',
    Department: apt.department || 'Outpatient',
    Treatment: apt.problem || apt.department || 'Consultation',
    problem: apt.problem,
    appointmentDate: apt.appointmentDate,
    Date: apt.appointmentDate,
    appointmentTime: apt.appointmentTime,
    Time: apt.appointmentTime,
    status: apt.status,
    Mobile: apt.patient?.mobile || '+1 23 456890',
    Email: apt.patient?.email || 'patient@example.com',
    createdAt: apt.createdAt,
    updatedAt: apt.updatedAt,
  };
};

const getAllAppointments = async (query = {}) => {
  const { doctorId, patientId, clinicId, status, date } = query;

  const where = {};
  if (doctorId) where.doctorId = parseInt(doctorId, 10);
  if (patientId) where.patientId = parseInt(patientId, 10);
  if (clinicId) where.clinicId = parseInt(clinicId, 10);
  if (status) where.status = status;
  if (date) where.appointmentDate = date;

  const appointments = await prisma.appointment.findMany({
    where,
    include: {
      patient: true,
      doctor: true,
      clinic: true,
    },
    orderBy: { appointmentDate: 'desc' },
  });

  return appointments.map(formatAppointment);
};

const getAppointmentById = async (id) => {
  const appointmentId = parseInt(id, 10);
  const appointment = await prisma.appointment.findUnique({
    where: { id: appointmentId },
    include: {
      patient: true,
      doctor: true,
      clinic: true,
    },
  });

  if (!appointment) {
    throw ApiError.notFound(`Appointment with ID ${id} not found`);
  }

  return formatAppointment(appointment);
};

const createAppointment = async (data) => {
  const count = await prisma.appointment.count();
  const appointmentNumber = `APT-${String(count + 101).padStart(5, '0')}`;

  const appointment = await prisma.appointment.create({
    data: {
      appointmentNumber,
      patientId: parseInt(data.patientId, 10),
      doctorId: parseInt(data.doctorId, 10),
      clinicId: data.clinicId ? parseInt(data.clinicId, 10) : null,
      department: data.department || '',
      appointmentDate: data.appointmentDate,
      appointmentTime: data.appointmentTime,
      problem: data.problem || '',
      status: data.status || 'Pending',
    },
    include: {
      patient: true,
      doctor: true,
      clinic: true,
    },
  });

  return formatAppointment(appointment);
};

const updateAppointment = async (id, data) => {
  const appointmentId = parseInt(id, 10);
  await getAppointmentById(appointmentId);

  const updateData = {};
  if (data.patientId) updateData.patientId = parseInt(data.patientId, 10);
  if (data.doctorId) updateData.doctorId = parseInt(data.doctorId, 10);
  if (data.clinicId !== undefined) updateData.clinicId = data.clinicId ? parseInt(data.clinicId, 10) : null;
  if (data.department !== undefined) updateData.department = data.department;
  if (data.appointmentDate) updateData.appointmentDate = data.appointmentDate;
  if (data.appointmentTime) updateData.appointmentTime = data.appointmentTime;
  if (data.problem !== undefined) updateData.problem = data.problem;
  if (data.status) updateData.status = data.status;

  const updated = await prisma.appointment.update({
    where: { id: appointmentId },
    data: updateData,
    include: {
      patient: true,
      doctor: true,
      clinic: true,
    },
  });

  return formatAppointment(updated);
};

const deleteAppointment = async (id) => {
  const appointmentId = parseInt(id, 10);
  await getAppointmentById(appointmentId);

  await prisma.appointment.delete({
    where: { id: appointmentId },
  });

  return { id: appointmentId, message: 'Appointment deleted successfully' };
};

module.exports = {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};
