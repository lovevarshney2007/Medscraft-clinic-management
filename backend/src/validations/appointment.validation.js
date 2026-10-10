const { z } = require('zod');

const createAppointmentSchema = {
  body: z.object({
    patientId: z.coerce.number({ required_error: 'Patient is required' }),
    doctorId: z.coerce.number({ required_error: 'Doctor is required' }),
    clinicId: z.coerce.number().optional(),
    department: z.string().optional(),
    appointmentDate: z.string({ required_error: 'Appointment date is required' }),
    appointmentTime: z.string({ required_error: 'Appointment time is required' }),
    problem: z.string().optional(),
    status: z.enum(['Pending', 'Confirmed', 'Completed', 'Cancelled']).optional().default('Pending'),
  }),
};

const updateAppointmentSchema = {
  body: z.object({
    patientId: z.coerce.number().optional(),
    doctorId: z.coerce.number().optional(),
    clinicId: z.coerce.number().optional(),
    department: z.string().optional(),
    appointmentDate: z.string().optional(),
    appointmentTime: z.string().optional(),
    problem: z.string().optional(),
    status: z.enum(['Pending', 'Confirmed', 'Completed', 'Cancelled']).optional(),
  }),
};

module.exports = {
  createAppointmentSchema,
  updateAppointmentSchema,
};
