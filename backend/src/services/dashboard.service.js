const prisma = require('../config/prisma');

const getClinicDashboardStats = async (clinicId) => {
  const whereClinic = clinicId ? { clinicId: parseInt(clinicId, 10) } : {};

  const [
    totalDoctors,
    totalPatients,
    totalAppointments,
    pendingAppointments,
    confirmedAppointments,
    recentAppointments,
    recentPatients,
    recentDoctors,
  ] = await Promise.all([
    prisma.doctor.count({ where: whereClinic }),
    prisma.patient.count(),
    prisma.appointment.count({ where: whereClinic }),
    prisma.appointment.count({ where: { ...whereClinic, status: 'Pending' } }),
    prisma.appointment.count({ where: { ...whereClinic, status: 'Confirmed' } }),
    prisma.appointment.findMany({
      where: whereClinic,
      include: { doctor: true, patient: true },
      orderBy: { appointmentDate: 'desc' },
      take: 5,
    }),
    prisma.patient.findMany({
      orderBy: { id: 'desc' },
      take: 5,
    }),
    prisma.doctor.findMany({
      where: whereClinic,
      take: 5,
      orderBy: { id: 'desc' },
    }),
  ]);

  return {
    metrics: {
      doctorsCount: totalDoctors,
      patientsCount: totalPatients,
      appointmentsCount: totalAppointments,
      pendingAppointments,
      confirmedAppointments,
      operationsCount: 56, // Mock/estimate metric for clinic display
      satisfactionRate: 94,
    },
    charts: {
      patientActivity: [
        { month: 'Jan', patients: 35 },
        { month: 'Feb', patients: 42 },
        { month: 'Mar', patients: 58 },
        { month: 'Apr', patients: 63 },
        { month: 'May', patients: 78 },
        { month: 'Jun', patients: 95 },
      ],
      appointmentStatus: [
        { status: 'Confirmed', count: confirmedAppointments },
        { status: 'Pending', count: pendingAppointments },
      ],
    },
    recentAppointments,
    recentPatients,
    recentDoctors,
  };
};

const getAdminDashboardStats = async () => {
  const [
    totalDoctors,
    totalPatients,
    totalAppointments,
    totalClinics,
    totalInvoices,
    recentAppointments,
    invoices,
  ] = await Promise.all([
    prisma.doctor.count(),
    prisma.patient.count(),
    prisma.appointment.count(),
    prisma.clinic.count(),
    prisma.invoice.count(),
    prisma.appointment.findMany({
      include: { doctor: true, patient: true },
      orderBy: { id: 'desc' },
      take: 5,
    }),
    prisma.invoice.findMany({
      take: 10,
      orderBy: { id: 'desc' },
    }),
  ]);

  const totalRevenue = invoices.reduce((acc, inv) => acc + inv.paidAmount, 0);

  return {
    metrics: {
      doctorsCount: totalDoctors,
      patientsCount: totalPatients,
      appointmentsCount: totalAppointments,
      clinicsCount: totalClinics,
      invoicesCount: totalInvoices,
      totalRevenue,
    },
    recentAppointments,
    invoices,
  };
};

module.exports = {
  getClinicDashboardStats,
  getAdminDashboardStats,
};
