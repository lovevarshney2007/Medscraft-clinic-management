const { z } = require('zod');

const registerSchema = {
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters long'),
    email: z.string().email('Please provide a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    role: z.enum(['ADMIN', 'DOCTOR', 'CLINIC_ADMIN', 'PATIENT', 'STAFF']).optional().default('PATIENT'),
    phone: z.string().optional(),
  }),
};

const loginSchema = {
  body: z.object({
    email: z.string().email('Please provide a valid email address'),
    password: z.string().min(1, 'Password is required'),
  }),
};

module.exports = {
  registerSchema,
  loginSchema,
};
