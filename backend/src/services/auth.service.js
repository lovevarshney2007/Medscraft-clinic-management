const bcrypt = require('bcryptjs');
const prisma = require('../config/prisma');
const ApiError = require('../utils/ApiError');

const registerUser = async ({ name, email, password, role = 'PATIENT', phone }) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (existingUser) {
    throw ApiError.conflict('An account with this email address already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
      phone,
    },
    include: {
      doctorProfile: true,
      patientProfile: true,
      clinicProfile: true,
    },
  });

  return user;
};

const loginUser = async ({ email, password }) => {
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
    include: {
      doctorProfile: true,
      patientProfile: true,
      clinicProfile: true,
    },
  });

  if (!user) {
    throw ApiError.unauthorized('Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw ApiError.unauthorized('Invalid email or password');
  }

  if (!user.isActive) {
    throw ApiError.forbidden('Your account is currently disabled. Please contact the administrator.');
  }

  return user;
};

const getCurrentUser = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      doctorProfile: {
        include: { clinic: true, dept: true },
      },
      patientProfile: true,
      clinicProfile: true,
      staffProfile: true,
    },
  });

  if (!user) {
    throw ApiError.notFound('User not found');
  }

  // eslint-disable-next-line no-unused-vars
  const { password, ...safeUser } = user;
  return safeUser;
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
};
