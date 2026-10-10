const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');

const env = require('./config/env');
const apiV1Routes = require('./routes');
const doctorRoutes = require('./routes/doctorRoutes');
const patientRoutes = require('./routes/patientRoutes');
const clinicRoutes = require('./routes/clinic.routes');
const appointmentRoutes = require('./routes/appointment.routes');
const errorHandler = require('./middlewares/error.middleware');
const ApiError = require('./utils/ApiError');

const app = express();

// Security HTTP headers
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// CORS configuration supporting credentials (cookies)
const allowedOrigins = [
  env.CORS_ORIGIN,
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true); // Permissive in dev, can restrict in production
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

// Logging middleware
if (env.NODE_ENV !== 'test') {
  app.use(morgan(env.NODE_ENV === 'development' ? 'dev' : 'combined'));
}

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Cookie parsing for HTTP-only JWT
app.use(cookieParser());

// Rate Limiter for API endpoints
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // max 300 requests per 15 min
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes',
  },
});
app.use('/api', limiter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV,
    version: '1.0.0',
    message: 'Medscraft Clinic Management Backend is running smoothly',
  });
});

// Primary Versioned API Routes
app.use('/api/v1', apiV1Routes);

// Root Compatibility Routes for existing template components
app.use('/api/doctors', doctorRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/clinics', clinicRoutes);
app.use('/api/appointments', appointmentRoutes);

// 404 Route Handler
app.use((req, res, next) => {
  next(ApiError.notFound(`Cannot find endpoint ${req.method} ${req.originalUrl}`));
});

// Centralized Global Error Handler
app.use(errorHandler);

module.exports = app;
