const prisma = require('../config/prisma');
const ApiError = require('../utils/ApiError');

const formatClinic = (c) => ({
  id: c.id,
  name: c.name,
  Name: c.name,
  email: c.email,
  Email: c.email,
  phone: c.phone,
  Mobile: c.phone || '+1 23 456890',
  city: c.city,
  address: c.address,
  Department: c.city ? `Branch: ${c.city}` : 'Main Branch',
  Specialization: c.description ? (c.description.length > 30 ? c.description.slice(0, 30) + '...' : c.description) : 'Multi-Specialty',
  Degree: `${c._count?.doctors || 0} Doctors Registered`,
  JoiningDate: c.createdAt ? new Date(c.createdAt).toLocaleDateString() : '01.10.2023',
  status: c.status,
  doctors: c.doctors,
  departments: c.departments,
  _count: c._count,
  createdAt: c.createdAt,
  updatedAt: c.updatedAt,
});

const getAllClinics = async (query = {}) => {
  const { search, status, city } = query;

  const where = {};
  if (search) {
    where.OR = [
      { name: { contains: search } },
      { city: { contains: search } },
      { email: { contains: search } },
    ];
  }
  if (status) where.status = status;
  if (city) where.city = { contains: city };

  const clinics = await prisma.clinic.findMany({
    where,
    include: {
      doctors: { select: { id: true, name: true, specialization: true } },
      departments: { select: { id: true, name: true } },
      _count: {
        select: {
          doctors: true,
          departments: true,
          appointments: true,
        },
      },
    },
    orderBy: { id: 'desc' },
  });

  return clinics.map(formatClinic);
};

const getClinicById = async (id) => {
  const clinicId = parseInt(id, 10);
  const clinic = await prisma.clinic.findUnique({
    where: { id: clinicId },
    include: {
      doctors: true,
      departments: true,
      appointments: {
        include: { patient: true, doctor: true },
        take: 20,
        orderBy: { appointmentDate: 'desc' },
      },
      _count: {
        select: { doctors: true, departments: true, appointments: true },
      },
    },
  });

  if (!clinic) {
    throw ApiError.notFound(`Clinic with ID ${id} not found`);
  }

  return formatClinic(clinic);
};

const createClinic = async (data) => {
  const clinic = await prisma.clinic.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      city: data.city,
      state: data.state,
      country: data.country,
      postalCode: data.postalCode,
      status: data.status || 'Active',
      description: data.description,
    },
  });

  return formatClinic(clinic);
};

const updateClinic = async (id, data) => {
  const clinicId = parseInt(id, 10);
  await getClinicById(clinicId);

  const updated = await prisma.clinic.update({
    where: { id: clinicId },
    data,
  });

  return formatClinic(updated);
};

const deleteClinic = async (id) => {
  const clinicId = parseInt(id, 10);
  await getClinicById(clinicId);

  await prisma.clinic.delete({
    where: { id: clinicId },
  });

  return { id: clinicId, message: 'Clinic deleted successfully' };
};

module.exports = {
  getAllClinics,
  getClinicById,
  createClinic,
  updateClinic,
  deleteClinic,
};
