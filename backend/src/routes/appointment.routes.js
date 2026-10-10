const express = require('express');
const router = express.Router();
const {
  getAppointmentsLegacy,
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} = require('../controllers/appointment.controller');
const { protect, optionalAuth } = require('../middlewares/auth.middleware');
const { authorize } = require('../middlewares/role.middleware');
const validate = require('../middlewares/validate.middleware');
const { createAppointmentSchema, updateAppointmentSchema } = require('../validations/appointment.validation');

router.get('/', optionalAuth, (req, res, next) => {
  if (req.baseUrl === '/api/appointments') {
    return getAppointmentsLegacy(req, res, next);
  }
  return getAppointments(req, res, next);
});

router.get('/:id', optionalAuth, getAppointmentById);
router.post('/', optionalAuth, validate(createAppointmentSchema), createAppointment);
router.put('/:id', protect, validate(updateAppointmentSchema), updateAppointment);
router.delete('/:id', protect, authorize('ADMIN', 'CLINIC_ADMIN'), deleteAppointment);

module.exports = router;
