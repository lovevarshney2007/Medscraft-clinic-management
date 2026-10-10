const express = require('express');
const router = express.Router();
const {
  getDepartmentsLegacy,
  getDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} = require('../controllers/department.controller');
const { protect, optionalAuth } = require('../middlewares/auth.middleware');
const { authorize } = require('../middlewares/role.middleware');

router.get('/', optionalAuth, (req, res, next) => {
  if (req.baseUrl === '/api/departments') {
    return getDepartmentsLegacy(req, res, next);
  }
  return getDepartments(req, res, next);
});

router.get('/:id', optionalAuth, getDepartmentById);
router.post('/', protect, authorize('ADMIN', 'CLINIC_ADMIN'), createDepartment);
router.put('/:id', protect, authorize('ADMIN', 'CLINIC_ADMIN'), updateDepartment);
router.delete('/:id', protect, authorize('ADMIN', 'CLINIC_ADMIN'), deleteDepartment);

module.exports = router;
