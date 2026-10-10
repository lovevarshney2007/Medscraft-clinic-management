const express = require('express');
const router = express.Router();
const {
  getClinicsLegacy,
  getClinics,
  getClinicById,
  createClinic,
  updateClinic,
  deleteClinic,
} = require('../controllers/clinic.controller');
const { protect, optionalAuth } = require('../middlewares/auth.middleware');
const { authorize } = require('../middlewares/role.middleware');
const validate = require('../middlewares/validate.middleware');
const { createClinicSchema, updateClinicSchema } = require('../validations/clinic.validation');

router.get('/', optionalAuth, (req, res, next) => {
  if (req.baseUrl === '/api/clinics') {
    return getClinicsLegacy(req, res, next);
  }
  return getClinics(req, res, next);
});

router.get('/:id', getClinicById);
router.post('/', protect, authorize('ADMIN'), validate(createClinicSchema), createClinic);
router.put('/:id', protect, authorize('ADMIN', 'CLINIC_ADMIN'), validate(updateClinicSchema), updateClinic);
router.delete('/:id', protect, authorize('ADMIN'), deleteClinic);

module.exports = router;
