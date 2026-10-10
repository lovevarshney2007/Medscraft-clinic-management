const express = require('express');
const router = express.Router();
const { getClinicDashboard, getAdminDashboard } = require('../controllers/dashboard.controller');
const { optionalAuth } = require('../middlewares/auth.middleware');

router.get('/clinic', optionalAuth, getClinicDashboard);
router.get('/admin', optionalAuth, getAdminDashboard);

module.exports = router;
