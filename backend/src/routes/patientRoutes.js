const express = require('express');
const router = express.Router();
const {
  getPatientsLegacy,
  getPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
} = require('../controllers/patientController');
const { protect, optionalAuth } = require('../middlewares/auth.middleware');
const { authorize } = require('../middlewares/role.middleware');
const validate = require('../middlewares/validate.middleware');
const { createPatientSchema, updatePatientSchema } = require('../validations/patient.validation');

// Legacy root router compatibility: GET / returns JSON array directly for existing template components
router.get('/', optionalAuth, (req, res, next) => {
  if (req.baseUrl === '/api/patients') {
    return getPatientsLegacy(req, res, next);
  }
  return getPatients(req, res, next);
});

router.get('/:id', getPatientById);
router.post('/', optionalAuth, validate(createPatientSchema), createPatient);
router.put('/:id', protect, authorize('ADMIN', 'CLINIC_ADMIN', 'DOCTOR', 'STAFF'), validate(updatePatientSchema), updatePatient);
router.delete('/:id', protect, authorize('ADMIN', 'CLINIC_ADMIN'), deletePatient);

module.exports = router;
