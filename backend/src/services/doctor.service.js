const prisma = require('../config/prisma');
const ApiError = require('../utils/ApiError');

const formatDoctor = (doc) => ({
  id: doc.id,
  name: doc.name,
  Name: doc.name,
  email: doc.email,
  Email: doc.email,
  mobile: doc.mobile,
  Mobile: doc.mobile,
  department: doc.department || doc.dept?.name || '',
  Department: doc.department || doc.dept?.name || '',
  specialization: doc.specialization || '',
  Specialization: doc.specialization || '',
  degree: doc.degree || '',
  Degree: doc.degree || '',
  joiningDate: doc.joiningDate || '',
  JoiningDate: doc.joiningDate || '',
  gender: doc.gender || '',
  status: doc.status,
  bio: doc.bio,
  img: doc.img,
  Img: doc.img,
  clinicId: doc.clinicId,
  clinic: doc.clinic,
  departmentId: doc.departmentId,
  dept: doc.dept,
  schedules: doc.schedules,
  createdAt: doc.createdAt,
  updatedAt: doc.updatedAt,
});

const getAllDoctors = async (query = {}) => {
  const { search, department, clinicId, status } = query;

  const where = {};

  if (search) {
    where.OR = [
      { name: { contains: search } },
      { email: { contains: search } },
      { specialization: { contains: search } },
    ];
  }

  if (department) {
    where.department = { contains: department };
  }

  if (clinicId) {
    where.clinicId = parseInt(clinicId, 10);
  }

  if (status) {
    where.status = status;
  }

  const doctors = await prisma.doctor.findMany({
    where,
    include: {
      clinic: true,
      dept: true,
      schedules: true,
    },
    orderBy: { id: 'desc' },
  });

  return doctors.map(formatDoctor);
};

const getDoctorById = async (id) => {
  const docId = parseInt(id, 10);
  const doctor = await prisma.doctor.findUnique({
    where: { id: docId },
    include: {
      clinic: true,
      dept: true,
      schedules: true,
      appointments: {
        include: { patient: true },
        orderBy: { appointmentDate: 'desc' },
        take: 10,
      },
    },
  });

  if (!doctor) {
    throw ApiError.notFound(`Doctor with ID ${id} not found`);
  }

  return formatDoctor(doctor);
};

const createDoctor = async (data) => {
  const doctor = await prisma.doctor.create({
    data: {
      name: data.name || data.Name,
      email: data.email || data.Email,
      mobile: data.mobile || data.Mobile,
      department: data.department || data.Department,
      specialization: data.specialization || data.Specialization,
      degree: data.degree || data.Degree,
      joiningDate: data.joiningDate || data.JoiningDate || new Date().toISOString().slice(0, 10),
      gender: data.gender || 'Male',
      status: data.status || 'Active',
      bio: data.bio || '',
      clinicId: data.clinicId ? parseInt(data.clinicId, 10) : null,
      departmentId: data.departmentId ? parseInt(data.departmentId, 10) : null,
    },
    include: {
      clinic: true,
      dept: true,
    },
  });

  return formatDoctor(doctor);
};

const updateDoctor = async (id, data) => {
  const docId = parseInt(id, 10);
  await getDoctorById(docId); // check exists

  const updateData = {};
  if (data.name || data.Name) updateData.name = data.name || data.Name;
  if (data.email !== undefined) updateData.email = data.email || data.Email;
  if (data.mobile !== undefined) updateData.mobile = data.mobile || data.Mobile;
  if (data.department !== undefined) updateData.department = data.department || data.Department;
  if (data.specialization !== undefined) updateData.specialization = data.specialization || data.Specialization;
  if (data.degree !== undefined) updateData.degree = data.degree || data.Degree;
  if (data.joiningDate !== undefined) updateData.joiningDate = data.joiningDate || data.JoiningDate;
  if (data.gender !== undefined) updateData.gender = data.gender;
  if (data.status !== undefined) updateData.status = data.status;
  if (data.bio !== undefined) updateData.bio = data.bio;
  if (data.clinicId !== undefined) updateData.clinicId = data.clinicId ? parseInt(data.clinicId, 10) : null;
  if (data.departmentId !== undefined) updateData.departmentId = data.departmentId ? parseInt(data.departmentId, 10) : null;

  const updated = await prisma.doctor.update({
    where: { id: docId },
    data: updateData,
    include: {
      clinic: true,
      dept: true,
    },
  });

  return formatDoctor(updated);
};

const deleteDoctor = async (id) => {
  const docId = parseInt(id, 10);
  await getDoctorById(docId);

  await prisma.doctor.delete({
    where: { id: docId },
  });

  return { id: docId, message: 'Doctor deleted successfully' };
};

module.exports = {
  getAllDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};
