const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1';
const ROOT_API_URL = process.env.REACT_APP_ROOT_API_URL || 'http://localhost:5000/api';

const request = async (url, options = {}) => {
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include', // for HTTP-only cookie support
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.message || 'Request failed');
    error.status = response.status;
    error.errors = data.errors;
    throw error;
  }

  return data;
};

export const authAPI = {
  login: async (credentials) => {
    const res = await request(`${API_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    if (res.token) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
    }
    return res;
  },

  register: async (userData) => {
    const res = await request(`${API_URL}/auth/register`, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    if (res.token) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
    }
    return res;
  },

  logout: async () => {
    try {
      await request(`${API_URL}/auth/logout`, { method: 'POST' });
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  getMe: () => request(`${API_URL}/auth/me`),
  
  getCurrentUser: () => {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch {
      return null;
    }
  },
};

export const doctorAPI = {
  getAll: async () => {
    // Queries root endpoint for legacy array compatibility or v1
    const res = await fetch(`${ROOT_API_URL}/doctors`);
    return res.json();
  },
  getById: (id) => request(`${API_URL}/doctors/${id}`),
  create: (data) => request(`${API_URL}/doctors`, { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`${API_URL}/doctors/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => request(`${API_URL}/doctors/${id}`, { method: 'DELETE' }),
};

export const patientAPI = {
  getAll: async () => {
    const res = await fetch(`${ROOT_API_URL}/patients`);
    return res.json();
  },
  getById: (id) => request(`${API_URL}/patients/${id}`),
  create: (data) => request(`${API_URL}/patients`, { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`${API_URL}/patients/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => request(`${API_URL}/patients/${id}`, { method: 'DELETE' }),
};

export const clinicAPI = {
  getAll: async () => {
    const res = await fetch(`${ROOT_API_URL}/clinics`);
    return res.json();
  },
  getById: (id) => request(`${API_URL}/clinics/${id}`),
  create: (data) => request(`${API_URL}/clinics`, { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`${API_URL}/clinics/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => request(`${API_URL}/clinics/${id}`, { method: 'DELETE' }),
};

export const appointmentAPI = {
  getAll: async () => {
    const res = await fetch(`${ROOT_API_URL}/appointments`);
    return res.json();
  },
  getById: (id) => request(`${API_URL}/appointments/${id}`),
  create: (data) => request(`${API_URL}/appointments`, { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`${API_URL}/appointments/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => request(`${API_URL}/appointments/${id}`, { method: 'DELETE' }),
};

export const dashboardAPI = {
  getClinic: (clinicId) => request(`${API_URL}/dashboard/clinic${clinicId ? `?clinicId=${clinicId}` : ''}`),
  getAdmin: () => request(`${API_URL}/dashboard/admin`),
};

export default {
  auth: authAPI,
  doctors: doctorAPI,
  patients: patientAPI,
  clinics: clinicAPI,
  appointments: appointmentAPI,
  dashboard: dashboardAPI,
};
