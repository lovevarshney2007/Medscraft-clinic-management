const { z } = require('zod');

const createClinicSchema = {
  body: z.object({
    name: z.string().min(2, 'Clinic name is required'),
    email: z.string().email('Invalid email address').optional().or(z.literal('')),
    phone: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    postalCode: z.string().optional(),
    status: z.string().optional(),
    description: z.string().optional(),
  }),
};

const updateClinicSchema = {
  body: z.object({
    name: z.string().min(2).optional(),
    email: z.string().email().optional().or(z.literal('')),
    phone: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    postalCode: z.string().optional(),
    status: z.string().optional(),
    description: z.string().optional(),
  }),
};

module.exports = {
  createClinicSchema,
  updateClinicSchema,
};
