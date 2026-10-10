const { z } = require('zod');

const createPatientSchema = {
  body: z.object({
    name: z.string().min(2, 'Patient name is required'),
    email: z.string().email('Invalid email address').optional().or(z.literal('')),
    mobile: z.string().optional(),
    gender: z.string().optional(),
    age: z.coerce.number().min(0).max(130).optional(),
    bloodGroup: z.string().optional(),
    address: z.string().optional(),
    joiningDate: z.string().optional(),
    status: z.string().optional(),
  }),
};

const updatePatientSchema = {
  body: z.object({
    name: z.string().min(2).optional(),
    email: z.string().email().optional().or(z.literal('')),
    mobile: z.string().optional(),
    gender: z.string().optional(),
    age: z.coerce.number().min(0).max(130).optional(),
    bloodGroup: z.string().optional(),
    address: z.string().optional(),
    joiningDate: z.string().optional(),
    status: z.string().optional(),
  }),
};

module.exports = {
  createPatientSchema,
  updatePatientSchema,
};
