const prisma = require('../config/prisma');
const ApiError = require('../utils/ApiError');

const formatInvoice = (inv) => {
  const patientDisplayName = inv.patientName || inv.patient?.name || 'Patient';
  return {
    id: inv.id,
    invoiceNumber: inv.invoiceNumber,
    InvoiceNumber: inv.invoiceNumber,
    Invoice_Number: inv.invoiceNumber,
    patientId: inv.patientId,
    patientName: patientDisplayName,
    Patient: patientDisplayName,
    patient: patientDisplayName,
    email: inv.email || inv.patient?.email || '',
    totalAmount: inv.totalAmount,
    Amount: `$${inv.totalAmount.toFixed(2)}`,
    paidAmount: inv.paidAmount,
    Paid: `$${inv.paidAmount.toFixed(2)}`,
    dueAmount: inv.dueAmount,
    status: inv.status,
    Status: inv.status,
    paymentMethod: inv.paymentMethod,
    invoiceDate: inv.invoiceDate,
    Date: inv.invoiceDate,
    Created_Date: inv.invoiceDate,
    dueDate: inv.dueDate,
    DueDate: inv.dueDate,
    Due_Date: inv.dueDate,
    items: inv.items ? (typeof inv.items === 'string' ? JSON.parse(inv.items) : inv.items) : [],
    patientData: inv.patient,
    createdAt: inv.createdAt,
    updatedAt: inv.updatedAt,
  };
};

const getAllInvoices = async (query = {}) => {
  const { status, patientId, search } = query;
  const where = {};
  if (status) where.status = status;
  if (patientId) where.patientId = parseInt(patientId, 10);
  if (search) {
    where.OR = [
      { invoiceNumber: { contains: search } },
      { patientName: { contains: search } },
    ];
  }

  const invoices = await prisma.invoice.findMany({
    where,
    include: { patient: true },
    orderBy: { id: 'desc' },
  });

  return invoices.map(formatInvoice);
};

const getInvoiceById = async (id) => {
  const inv = await prisma.invoice.findUnique({
    where: { id: parseInt(id, 10) },
    include: { patient: true },
  });
  if (!inv) throw ApiError.notFound(`Invoice with ID ${id} not found`);
  return formatInvoice(inv);
};

const createInvoice = async (data) => {
  const count = await prisma.invoice.count();
  const invoiceNumber = data.invoiceNumber || `INV-${new Date().getFullYear()}-${String(count + 1).padStart(3, '0')}`;
  const total = parseFloat(data.totalAmount || data.Amount || 0);
  const paid = parseFloat(data.paidAmount || data.Paid || 0);
  const due = total - paid;

  const invoice = await prisma.invoice.create({
    data: {
      invoiceNumber,
      patientId: data.patientId ? parseInt(data.patientId, 10) : null,
      patientName: data.patientName || data.Patient || '',
      email: data.email || '',
      tax: data.tax ? parseFloat(data.tax) : 0,
      discount: data.discount ? parseFloat(data.discount) : 0,
      totalAmount: total,
      paidAmount: paid,
      dueAmount: due,
      status: data.status || data.Status || (due <= 0 ? 'Paid' : 'Overdue'),
      paymentMethod: data.paymentMethod || 'Card',
      invoiceDate: data.invoiceDate || data.Date || new Date().toISOString().slice(0, 10),
      dueDate: data.dueDate || data.DueDate || '',
      items: typeof data.items === 'object' ? JSON.stringify(data.items) : (data.items || '[]'),
    },
    include: { patient: true },
  });

  return formatInvoice(invoice);
};

const updateInvoice = async (id, data) => {
  const invId = parseInt(id, 10);
  await getInvoiceById(invId);
  const updated = await prisma.invoice.update({
    where: { id: invId },
    data,
    include: { patient: true },
  });
  return formatInvoice(updated);
};

const deleteInvoice = async (id) => {
  const invId = parseInt(id, 10);
  await getInvoiceById(invId);
  await prisma.invoice.delete({ where: { id: invId } });
  return { id: invId, message: 'Invoice deleted successfully' };
};

module.exports = {
  getAllInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice,
};
