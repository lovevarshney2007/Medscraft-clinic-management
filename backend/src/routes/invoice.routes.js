const express = require('express');
const router = express.Router();
const {
  getInvoicesLegacy,
  getInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice,
} = require('../controllers/invoice.controller');
const { protect, optionalAuth } = require('../middlewares/auth.middleware');
const { authorize } = require('../middlewares/role.middleware');

router.get('/', optionalAuth, (req, res, next) => {
  if (req.baseUrl === '/api/invoices') {
    return getInvoicesLegacy(req, res, next);
  }
  return getInvoices(req, res, next);
});

router.get('/:id', optionalAuth, getInvoiceById);
router.post('/', protect, authorize('ADMIN', 'CLINIC_ADMIN', 'STAFF'), createInvoice);
router.put('/:id', protect, authorize('ADMIN', 'CLINIC_ADMIN', 'STAFF'), updateInvoice);
router.delete('/:id', protect, authorize('ADMIN', 'CLINIC_ADMIN'), deleteInvoice);

module.exports = router;
