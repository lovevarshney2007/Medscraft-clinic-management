const prisma = require('../config/prisma');
const ApiError = require('../utils/ApiError');

const formatDepartment = (d) => ({
  id: d.id,
  name: d.name,
  Department: d.name,
  departmentHead: d.departmentHead || 'Chief Medical Officer',
  DepartmentHead: d.departmentHead || 'Chief Medical Officer',
  description: d.description || '',
  Description: d.description || '',
  status: d.status || 'Active',
  Status: d.status || 'Active',
  Date: d.createdAt ? new Date(d.createdAt).toLocaleDateString() : '01.10.2023',
  clinicId: d.clinicId,
  doctors: d.doctors,
  createdAt: d.createdAt,
  updatedAt: d.updatedAt,
});

const getAllDepartments = async (query = {}) => {
  const { search, clinicId, status } = query;
  const where = {};
  if (search) where.name = { contains: search };
  if (clinicId) where.clinicId = parseInt(clinicId, 10);
  if (status) where.status = status;

  const depts = await prisma.department.findMany({
    where,
    include: { doctors: true },
    orderBy: { id: 'asc' },
  });

  return depts.map(formatDepartment);
};

const getDepartmentById = async (id) => {
  const dept = await prisma.department.findUnique({
    where: { id: parseInt(id, 10) },
    include: { doctors: true, clinic: true },
  });
  if (!dept) throw ApiError.notFound(`Department with ID ${id} not found`);
  return formatDepartment(dept);
};

const createDepartment = async (data) => {
  const dept = await prisma.department.create({
    data: {
      name: data.name || data.Department,
      description: data.description || data.Description,
      departmentHead: data.departmentHead || data.DepartmentHead,
      status: data.status || data.Status || 'Active',
      clinicId: data.clinicId ? parseInt(data.clinicId, 10) : null,
    },
  });
  return formatDepartment(dept);
};

const updateDepartment = async (id, data) => {
  const deptId = parseInt(id, 10);
  await getDepartmentById(deptId);

  const updated = await prisma.department.update({
    where: { id: deptId },
    data: {
      ...(data.name && { name: data.name }),
      ...(data.Department && { name: data.Department }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.Description !== undefined && { description: data.Description }),
      ...(data.departmentHead !== undefined && { departmentHead: data.departmentHead }),
      ...(data.DepartmentHead !== undefined && { departmentHead: data.DepartmentHead }),
      ...(data.status && { status: data.status }),
      ...(data.Status && { status: data.Status }),
    },
  });
  return formatDepartment(updated);
};

const deleteDepartment = async (id) => {
  const deptId = parseInt(id, 10);
  await getDepartmentById(deptId);
  await prisma.department.delete({ where: { id: deptId } });
  return { id: deptId, message: 'Department deleted successfully' };
};

module.exports = {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
