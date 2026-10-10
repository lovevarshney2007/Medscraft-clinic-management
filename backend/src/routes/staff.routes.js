const express = require('express');
const router = express.Router();
const {
  getStaffLegacy,
  getStaff,
  getStaffById,
  createStaff,
  updateStaff,
  deleteStaff,
} = require('../controllers/staff.controller');
const { protect, optionalAuth } = require('../middlewares/auth.middleware');
const { authorize } = require('../middlewares/role.middleware');

router.get('/', optionalAuth, (req, res, next) => {
  if (req.baseUrl === '/api/staff') {
    return getStaffLegacy(req, res, next);
  }
  return getStaff(req, res, next);
});

router.get('/:id', optionalAuth, getStaffById);
router.post('/', protect, authorize('ADMIN', 'CLINIC_ADMIN'), createStaff);
router.put('/:id', protect, authorize('ADMIN', 'CLINIC_ADMIN'), updateStaff);
router.delete('/:id', protect, authorize('ADMIN', 'CLINIC_ADMIN'), deleteStaff);

module.exports = router;
