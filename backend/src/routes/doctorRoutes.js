const express = require('express');
const router = express.Router();
const {
  getDoctorsLegacy,
  getDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} = require('../controllers/doctorController');
const { protect, optionalAuth } = require('../middlewares/auth.middleware');
const { authorize } = require('../middlewares/role.middleware');
const validate = require('../middlewares/validate.middleware');
const { createDoctorSchema, updateDoctorSchema } = require('../validations/doctor.validation');

// Legacy root router compatibility: GET / returns JSON array directly for existing template components
router.get('/', optionalAuth, (req, res, next) => {
  if (req.baseUrl === '/api/doctors') {
    return getDoctorsLegacy(req, res, next);
  }
  return getDoctors(req, res, next);
});

router.get('/:id', getDoctorById);
router.post('/', optionalAuth, validate(createDoctorSchema), createDoctor);
router.put('/:id', protect, authorize('ADMIN', 'CLINIC_ADMIN', 'DOCTOR'), validate(updateDoctorSchema), updateDoctor);
router.delete('/:id', protect, authorize('ADMIN', 'CLINIC_ADMIN'), deleteDoctor);

module.exports = router;
