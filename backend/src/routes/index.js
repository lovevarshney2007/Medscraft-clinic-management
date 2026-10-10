const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const doctorRoutes = require('./doctorRoutes');
const patientRoutes = require('./patientRoutes');
const clinicRoutes = require('./clinic.routes');
const appointmentRoutes = require('./appointment.routes');
const dashboardRoutes = require('./dashboard.routes');

router.use('/auth', authRoutes);
router.use('/doctors', doctorRoutes);
router.use('/patients', patientRoutes);
router.use('/clinics', clinicRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;
