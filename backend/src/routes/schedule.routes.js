const express = require('express');
const router = express.Router();
const {
  getSchedulesLegacy,
  getSchedules,
  getScheduleById,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} = require('../controllers/schedule.controller');
const { protect, optionalAuth } = require('../middlewares/auth.middleware');
const { authorize } = require('../middlewares/role.middleware');

router.get('/', optionalAuth, (req, res, next) => {
  if (req.baseUrl === '/api/schedules') {
    return getSchedulesLegacy(req, res, next);
  }
  return getSchedules(req, res, next);
});

router.get('/:id', optionalAuth, getScheduleById);
router.post('/', protect, authorize('ADMIN', 'CLINIC_ADMIN', 'DOCTOR'), createSchedule);
router.put('/:id', protect, authorize('ADMIN', 'CLINIC_ADMIN', 'DOCTOR'), updateSchedule);
router.delete('/:id', protect, authorize('ADMIN', 'CLINIC_ADMIN'), deleteSchedule);

module.exports = router;
