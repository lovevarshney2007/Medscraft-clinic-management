const prisma = require('../config/prisma');
const ApiError = require('../utils/ApiError');

const formatPatient = (p) => ({
  id: p.id,
  name: p.name,
  Name: p.name,
  email: p.email,
  Email: p.email,
  mobile: p.mobile,
  Mobile: p.mobile,
  gender: p.gender || '',
  age: p.age,
  bloodGroup: p.bloodGroup,
  address: p.address,
  joiningDate: p.joiningDate || '',
  JoiningDate: p.joiningDate || '',
  status: p.status,
  img: p.img,
  Img: p.img,
  // Compatibility keys for template tables:
  Department: 'General',
  Specialization: 'Outpatient',
  Degree: p.bloodGroup ? `Blood: ${p.bloodGroup}` : '',
  appointments: p.appointments,
  invoices: p.invoices,
  createdAt: p.createdAt,
  updatedAt: p.updatedAt,
});

const getAllPatients = async (query = {}) => {
  const { search, status, gender } = query;

  const where = {};

  if (search) {
    where.OR = [
      { name: { contains: search } },
      { email: { contains: search } },
      { mobile: { contains: search } },
    ];
  }

  if (status) {
    where.status = status;
  }

  if (gender) {
    where.gender = gender;
  }

  const patients = await prisma.patient.findMany({
    where,
    orderBy: { id: 'desc' },
  });

  return patients.map(formatPatient);
};

const getPatientById = async (id) => {
  const patientId = parseInt(id, 10);
  const patient = await prisma.patient.findUnique({
    where: { id: patientId },
    include: {
      appointments: {
        include: { doctor: true, clinic: true },
        orderBy: { appointmentDate: 'desc' },
      },
      invoices: {
        orderBy: { invoiceDate: 'desc' },
      },
    },
  });

  if (!patient) {
    throw ApiError.notFound(`Patient with ID ${id} not found`);
  }

  return formatPatient(patient);
};

const createPatient = async (data) => {
  const patient = await prisma.patient.create({
    data: {
      name: data.name || data.Name,
      email: data.email || data.Email,
      mobile: data.mobile || data.Mobile,
      gender: data.gender || 'Other',
      age: data.age ? parseInt(data.age, 10) : null,
      bloodGroup: data.bloodGroup || '',
      address: data.address || '',
      joiningDate: data.joiningDate || data.JoiningDate || new Date().toISOString().slice(0, 10),
      status: data.status || 'Active',
    },
  });

  return formatPatient(patient);
};

const updatePatient = async (id, data) => {
  const patientId = parseInt(id, 10);
  await getPatientById(patientId);

  const updateData = {};
  if (data.name || data.Name) updateData.name = data.name || data.Name;
  if (data.email !== undefined) updateData.email = data.email || data.Email;
  if (data.mobile !== undefined) updateData.mobile = data.mobile || data.Mobile;
  if (data.gender !== undefined) updateData.gender = data.gender;
  if (data.age !== undefined) updateData.age = data.age ? parseInt(data.age, 10) : null;
  if (data.bloodGroup !== undefined) updateData.bloodGroup = data.bloodGroup;
  if (data.address !== undefined) updateData.address = data.address;
  if (data.joiningDate !== undefined) updateData.joiningDate = data.joiningDate || data.JoiningDate;
  if (data.status !== undefined) updateData.status = data.status;

  const updated = await prisma.patient.update({
    where: { id: patientId },
    data: updateData,
  });

  return formatPatient(updated);
};

const deletePatient = async (id) => {
  const patientId = parseInt(id, 10);
  await getPatientById(patientId);

  await prisma.patient.delete({
    where: { id: patientId },
  });

  return { id: patientId, message: 'Patient record deleted successfully' };
};

module.exports = {
  getAllPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
};
