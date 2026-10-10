const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const force = process.argv.includes('--force');

  try {
    const userCount = await prisma.user.count();
    if (userCount > 0 && !force) {
      console.log(`ℹ️ Database already contains ${userCount} users. Skipping seeding (pass --force to re-seed).`);
      return;
    }
  } catch (err) {
    console.log('⚠️ Could not check existing users (tables may be newly created). Proceeding with seeding...');
  }

  console.log('🌱 Starting database seeding...');

  // Clean existing records in reverse dependency order
  await prisma.appointment.deleteMany();
  await prisma.doctorSchedule.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.staff.deleteMany();
  await prisma.doctor.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.department.deleteMany();
  await prisma.clinic.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash('Password@123', 10);
  const adminPasswordHash = await bcrypt.hash('Admin@123', 10);

  // 1. Create Users
  const adminUser = await prisma.user.create({
    data: {
      name: 'System Admin',
      email: 'admin@medscraft.com',
      password: adminPasswordHash,
      role: 'ADMIN',
      phone: '+1 234 567 8900',
    },
  });

  const clinicUser = await prisma.user.create({
    data: {
      name: 'AIIMS Hospital Admin',
      email: 'clinic@medscraft.com',
      password: passwordHash,
      role: 'CLINIC_ADMIN',
      phone: '+1 234 567 8901',
    },
  });

  const doctorUser1 = await prisma.user.create({
    data: {
      name: 'Dr. Andrea Lalema',
      email: 'doctor@medscraft.com',
      password: passwordHash,
      role: 'DOCTOR',
      phone: '+1 23 456890',
    },
  });

  const doctorUser2 = await prisma.user.create({
    data: {
      name: 'Dr. Smith Bruklin',
      email: 'smith@medscraft.com',
      password: passwordHash,
      role: 'DOCTOR',
      phone: '+1 23 456891',
    },
  });

  const patientUser = await prisma.user.create({
    data: {
      name: 'Stephen Conley',
      email: 'patient@medscraft.com',
      password: passwordHash,
      role: 'PATIENT',
      phone: '+1 234 987 6543',
    },
  });

  // 2. Create Clinics
  const clinic1 = await prisma.clinic.create({
    data: {
      name: 'AIIMS Specialty Clinic',
      email: 'contact@aiims.com',
      phone: '+1 234 567 8901',
      address: '2641 Paul Wayne Haggerty Rd',
      city: 'New Orleans',
      state: 'Louisiana',
      country: 'USA',
      postalCode: '70112',
      status: 'Active',
      description: 'Full-service modern specialty clinic providing advanced healthcare.',
      userId: clinicUser.id,
    },
  });

  const clinic2 = await prisma.clinic.create({
    data: {
      name: 'Apollo City Hospital',
      email: 'info@apollocity.com',
      phone: '+1 234 567 8902',
      address: '104 North Broad St',
      city: 'Philadelphia',
      state: 'Pennsylvania',
      country: 'USA',
      postalCode: '19102',
      status: 'Active',
      description: 'Leading multi-specialty regional healthcare facility.',
    },
  });

  // 3. Create Departments
  const dept1 = await prisma.department.create({
    data: {
      name: 'Otolaryngology',
      description: 'Ear, Nose, and Throat specialty treatments',
      departmentHead: 'Dr. Andrea Lalema',
      status: 'Active',
      clinicId: clinic1.id,
    },
  });

  const dept2 = await prisma.department.create({
    data: {
      name: 'Urology',
      description: 'Urinary tract and male reproductive system',
      departmentHead: 'Dr. Smith Bruklin',
      status: 'Active',
      clinicId: clinic1.id,
    },
  });

  const dept3 = await prisma.department.create({
    data: {
      name: 'Cardiology',
      description: 'Heart and cardiovascular care',
      departmentHead: 'Dr. William Steier',
      status: 'Active',
      clinicId: clinic1.id,
    },
  });

  // 4. Create Doctors
  const doctor1 = await prisma.doctor.create({
    data: {
      name: 'Andrea Lalema',
      email: 'andrea@medscraft.com',
      mobile: '+1 23 456890',
      department: 'Otolaryngology',
      specialization: 'Infertility & ENT',
      degree: 'MBBS, MS',
      joiningDate: '01.10.2022',
      gender: 'Female',
      status: 'Active',
      clinicId: clinic1.id,
      departmentId: dept1.id,
      userId: doctorUser1.id,
    },
  });

  const doctor2 = await prisma.doctor.create({
    data: {
      name: 'Dr.Smith Bruklin',
      email: 'smith@medscraft.com',
      mobile: '+1 23 456891',
      department: 'Urology',
      specialization: 'Prostate & Renal Care',
      degree: 'MBBS, MD',
      joiningDate: '15.11.2022',
      gender: 'Male',
      status: 'Active',
      clinicId: clinic1.id,
      departmentId: dept2.id,
      userId: doctorUser2.id,
    },
  });

  const doctor3 = await prisma.doctor.create({
    data: {
      name: 'Dr.William Steier',
      email: 'william@medscraft.com',
      mobile: '+1 23 456892',
      department: 'Cardiology',
      specialization: 'Interventional Cardiology',
      degree: 'MBBS, DNB, FACC',
      joiningDate: '05.01.2023',
      gender: 'Male',
      status: 'Active',
      clinicId: clinic1.id,
      departmentId: dept3.id,
    },
  });

  // 5. Create Patients
  const patient1 = await prisma.patient.create({
    data: {
      name: 'Stephen Conley',
      email: 'stephen@example.com',
      mobile: '+1 234 987 6543',
      gender: 'Male',
      age: 38,
      bloodGroup: 'O+',
      address: '2893 Wakefield Street, Philadelphia',
      joiningDate: '12.01.2023',
      status: 'Active',
      userId: patientUser.id,
    },
  });

  const patient2 = await prisma.patient.create({
    data: {
      name: 'Linda Ray',
      email: 'linda@example.com',
      mobile: '+1 234 987 6544',
      gender: 'Female',
      age: 29,
      bloodGroup: 'A+',
      address: '3448 Spring Haven Trail, New Jersey',
      joiningDate: '18.02.2023',
      status: 'Active',
    },
  });

  const patient3 = await prisma.patient.create({
    data: {
      name: 'Bernado Galaviz',
      email: 'bernado@example.com',
      mobile: '+1 234 987 6545',
      gender: 'Male',
      age: 45,
      bloodGroup: 'B+',
      address: '1410 Sunburst Drive, Fort Myers',
      joiningDate: '24.03.2023',
      status: 'Active',
    },
  });

  // 6. Doctor Schedules
  await prisma.doctorSchedule.create({
    data: {
      doctorId: doctor1.id,
      availableDays: 'Monday, Wednesday, Friday',
      fromTime: '09:00 AM',
      toTime: '02:00 PM',
      consultingTime: 15,
      status: 'Active',
    },
  });

  await prisma.doctorSchedule.create({
    data: {
      doctorId: doctor2.id,
      availableDays: 'Tuesday, Thursday, Saturday',
      fromTime: '10:00 AM',
      toTime: '04:00 PM',
      consultingTime: 20,
      status: 'Active',
    },
  });

  // 7. Appointments
  await prisma.appointment.create({
    data: {
      appointmentNumber: 'APT-00101',
      patientId: patient1.id,
      doctorId: doctor1.id,
      clinicId: clinic1.id,
      department: 'Otolaryngology',
      appointmentDate: '2026-10-15',
      appointmentTime: '10:30 AM',
      problem: 'Recurring sinus pressure and nasal congestion',
      status: 'Confirmed',
    },
  });

  await prisma.appointment.create({
    data: {
      appointmentNumber: 'APT-00102',
      patientId: patient2.id,
      doctorId: doctor2.id,
      clinicId: clinic1.id,
      department: 'Urology',
      appointmentDate: '2026-10-16',
      appointmentTime: '11:15 AM',
      problem: 'Routine annual renal health checkup',
      status: 'Pending',
    },
  });

  await prisma.appointment.create({
    data: {
      appointmentNumber: 'APT-00103',
      patientId: patient3.id,
      doctorId: doctor3.id,
      clinicId: clinic1.id,
      department: 'Cardiology',
      appointmentDate: '2026-10-18',
      appointmentTime: '02:00 PM',
      problem: 'Mild chest pain during endurance cardio exercise',
      status: 'Confirmed',
    },
  });

  // 8. Staff
  await prisma.staff.create({
    data: {
      name: 'Jessica Moore',
      email: 'jessica.moore@medscraft.com',
      mobile: '+1 234 111 2233',
      role: 'Head Nurse',
      department: 'ICU & Emergency',
      joiningDate: '01.03.2021',
      status: 'Active',
      salary: 5500,
    },
  });

  await prisma.staff.create({
    data: {
      name: 'Robert Miller',
      email: 'robert.m@medscraft.com',
      mobile: '+1 234 111 2234',
      role: 'Lab Technician',
      department: 'Pathology',
      joiningDate: '15.06.2022',
      status: 'Active',
      salary: 4800,
    },
  });

  // 9. Invoices
  await prisma.invoice.create({
    data: {
      invoiceNumber: 'INV-2026-001',
      patientId: patient1.id,
      patientName: 'Stephen Conley',
      email: 'stephen@example.com',
      tax: 15.0,
      discount: 10.0,
      totalAmount: 350.0,
      paidAmount: 350.0,
      dueAmount: 0.0,
      status: 'Paid',
      paymentMethod: 'Credit Card',
      invoiceDate: '2026-10-01',
      dueDate: '2026-10-15',
      items: JSON.stringify([
        { item: 'ENT Consultation', quantity: 1, rate: 250, amount: 250 },
        { item: 'Nasal Endoscopy Evaluation', quantity: 1, rate: 100, amount: 100 },
      ]),
    },
  });

  await prisma.invoice.create({
    data: {
      invoiceNumber: 'INV-2026-002',
      patientId: patient2.id,
      patientName: 'Linda Ray',
      email: 'linda@example.com',
      tax: 20.0,
      discount: 0.0,
      totalAmount: 520.0,
      paidAmount: 200.0,
      dueAmount: 320.0,
      status: 'Overdue',
      paymentMethod: 'Online Transfer',
      invoiceDate: '2026-09-20',
      dueDate: '2026-10-05',
      items: JSON.stringify([
        { item: 'Comprehensive Ultrasound', quantity: 1, rate: 450, amount: 450 },
        { item: 'Lab Pathology Tests', quantity: 1, rate: 70, amount: 70 },
      ]),
    },
  });

  console.log('✅ Database seeded successfully!');
  console.log('Default credentials created:');
  console.log(' - Admin: admin@medscraft.com / Admin@123');
  console.log(' - Doctor: doctor@medscraft.com / Password@123');
  console.log(' - Clinic: clinic@medscraft.com / Password@123');
  console.log(' - Patient: patient@medscraft.com / Password@123');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
