const invoiceService = require('../services/invoice.service');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');

const getInvoicesLegacy = asyncHandler(async (req, res) => {
  const invoices = await invoiceService.getAllInvoices(req.query);
  res.json(invoices);
});

const getInvoices = asyncHandler(async (req, res) => {
  const invoices = await invoiceService.getAllInvoices(req.query);
  res.status(200).json(ApiResponse.success(invoices, 'Invoices retrieved successfully'));
});

const getInvoiceById = asyncHandler(async (req, res) => {
  const invoice = await invoiceService.getInvoiceById(req.params.id);
  res.status(200).json(ApiResponse.success(invoice, 'Invoice details retrieved'));
});

const createInvoice = asyncHandler(async (req, res) => {
  const invoice = await invoiceService.createInvoice(req.body);
  res.status(201).json(ApiResponse.created(invoice, 'Invoice created successfully'));
});

const updateInvoice = asyncHandler(async (req, res) => {
  const invoice = await invoiceService.updateInvoice(req.params.id, req.body);
  res.status(200).json(ApiResponse.success(invoice, 'Invoice updated successfully'));
});

const deleteInvoice = asyncHandler(async (req, res) => {
  const result = await invoiceService.deleteInvoice(req.params.id);
  res.status(200).json(ApiResponse.success(result, 'Invoice deleted successfully'));
});

module.exports = {
  getInvoicesLegacy,
  getInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice,
};
