const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const doctorRoutes = require('./doctorRoutes');
const patientRoutes = require('./patientRoutes');
const clinicRoutes = require('./clinic.routes');
const appointmentRoutes = require('./appointment.routes');
const dashboardRoutes = require('./dashboard.routes');
const departmentRoutes = require('./department.routes');
const staffRoutes = require('./staff.routes');
const scheduleRoutes = require('./schedule.routes');
const invoiceRoutes = require('./invoice.routes');

router.use('/auth', authRoutes);
router.use('/doctors', doctorRoutes);
router.use('/patients', patientRoutes);
router.use('/clinics', clinicRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/departments', departmentRoutes);
router.use('/staff', staffRoutes);
router.use('/schedules', scheduleRoutes);
router.use('/invoices', invoiceRoutes);

module.exports = router;
