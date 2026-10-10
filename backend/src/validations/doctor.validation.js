const { z } = require('zod');

const createDoctorSchema = {
  body: z.object({
    name: z.string().min(2, 'Doctor name is required'),
    email: z.string().email('Invalid email').optional().or(z.literal('')),
    mobile: z.string().optional(),
    department: z.string().optional(),
    specialization: z.string().optional(),
    degree: z.string().optional(),
    joiningDate: z.string().optional(),
    gender: z.string().optional(),
    bio: z.string().optional(),
    clinicId: z.coerce.number().optional(),
    departmentId: z.coerce.number().optional(),
  }),
};

const updateDoctorSchema = {
  body: z.object({
    name: z.string().min(2).optional(),
    email: z.string().email().optional().or(z.literal('')),
    mobile: z.string().optional(),
    department: z.string().optional(),
    specialization: z.string().optional(),
    degree: z.string().optional(),
    joiningDate: z.string().optional(),
    gender: z.string().optional(),
    status: z.string().optional(),
    bio: z.string().optional(),
    clinicId: z.coerce.number().optional(),
    departmentId: z.coerce.number().optional(),
  }),
};

module.exports = {
  createDoctorSchema,
  updateDoctorSchema,
};
