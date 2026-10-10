const prisma = require('../config/prisma');
const ApiError = require('../utils/ApiError');

const formatStaff = (s) => ({
  id: s.id,
  name: s.name,
  Name: s.name,
  email: s.email,
  Email: s.email,
  mobile: s.mobile,
  Mobile: s.mobile,
  role: s.role,
  department: s.department || 'General',
  Department: s.department || 'General',
  Specialization: s.role || 'Staff',
  Degree: s.role || 'Medical Staff',
  joiningDate: s.joiningDate || '',
  JoiningDate: s.joiningDate || '',
  status: s.status,
  Status: s.status,
  salary: s.salary,
  createdAt: s.createdAt,
  updatedAt: s.updatedAt,
});

const getAllStaff = async (query = {}) => {
  const { search, role, status } = query;
  const where = {};
  if (search) {
    where.OR = [
      { name: { contains: search } },
      { email: { contains: search } },
    ];
  }
  if (role) where.role = role;
  if (status) where.status = status;

  const staff = await prisma.staff.findMany({
    where,
    orderBy: { id: 'desc' },
  });
  return staff.map(formatStaff);
};

const getStaffById = async (id) => {
  const staff = await prisma.staff.findUnique({
    where: { id: parseInt(id, 10) },
  });
  if (!staff) throw ApiError.notFound(`Staff member with ID ${id} not found`);
  return formatStaff(staff);
};

const createStaff = async (data) => {
  const staff = await prisma.staff.create({
    data: {
      name: data.name || data.Name,
      email: data.email || data.Email,
      mobile: data.mobile || data.Mobile,
      role: data.role || data.Specialization || 'Nurse',
      department: data.department || data.Department || 'General',
      joiningDate: data.joiningDate || data.JoiningDate || new Date().toISOString().slice(0, 10),
      status: data.status || 'Active',
      salary: data.salary ? parseFloat(data.salary) : null,
    },
  });
  return formatStaff(staff);
};

const updateStaff = async (id, data) => {
  const staffId = parseInt(id, 10);
  await getStaffById(staffId);
  const updated = await prisma.staff.update({
    where: { id: staffId },
    data,
  });
  return formatStaff(updated);
};

const deleteStaff = async (id) => {
  const staffId = parseInt(id, 10);
  await getStaffById(staffId);
  await prisma.staff.delete({ where: { id: staffId } });
  return { id: staffId, message: 'Staff member removed successfully' };
};

module.exports = {
  getAllStaff,
  getStaffById,
  createStaff,
  updateStaff,
  deleteStaff,
};
