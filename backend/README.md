# 🏥 Medscraft Clinic Management - Backend API

A production-grade, modular Node.js & Express RESTful API built following enterprise architecture and SOLID principles.

---

## 🏗️ Architecture & Design Principles

The backend is built with a **Layered Architecture (Separation of Concerns)**:

* **Config Layer** (`src/config/`): Validated environment configurations and a Prisma client singleton to prevent connection pool exhaustion.
* **Middleware Layer** (`src/middlewares/`):
  * **Authentication (`auth.middleware.js`)**: Verifies JWT from both `Authorization: Bearer <token>` and secure `HTTP-only` cookies.
  * **Role-Based Access Control / RBAC (`role.middleware.js`)**: Restricts access based on user roles (`ADMIN`, `CLINIC_ADMIN`, `DOCTOR`, `PATIENT`, `STAFF`).
  * **Schema Validation (`validate.middleware.js`)**: Request validation using Zod for `body`, `query`, and `params`.
  * **Centralized Error Handling (`error.middleware.js`)**: Translates operational `ApiError`, Prisma database constraints (e.g. `P2002`, `P2025`), and hides stack traces in production.
  * **Security**: Helmet, CORS with credentials, and Rate Limiting (`express-rate-limit`).
* **Validation Layer** (`src/validations/`): Strict Zod schema definitions with readable validation error messages.
* **Service Layer** (`src/services/`): Pure business logic, database transactions, calculations, and relational includes.
* **Controller Layer** (`src/controllers/`): Thin HTTP controllers dispatching to services and returning standardized `ApiResponse` payloads.
* **Routing Layer** (`src/routes/`): Modular versioned endpoints (`/api/v1/...`) with backwards-compatibility routes for the React frontend tables (`/api/doctors`, `/api/patients`, `/api/clinics`, `/api/appointments`).

---

## 🗄️ Database & Prisma ORM

Default configuration uses **SQLite** for instant zero-config setup without requiring external database servers, and can be switched to **PostgreSQL** in seconds:

### Switching to PostgreSQL (Optional):
1. In `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
2. In `.env`:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/medscraft_db"
   ```
3. Run `npx prisma db push` and `npm run seed`.

---

## 🔐 Default Demo Accounts

| Role | Email | Password |
|---|---|---|
| **Admin** | `admin@medscraft.com` | `Admin@123` |
| **Doctor** | `doctor@medscraft.com` | `Password@123` |
| **Clinic Admin** | `clinic@medscraft.com` | `Password@123` |
| **Patient** | `patient@medscraft.com` | `Password@123` |

---

## 🚀 Running the Project

### Start Backend
```bash
cd backend
npm run dev      # Runs with nodemon on port 5000
```
Or from the project root:
```bash
npm run backend
```

### Seed Database
```bash
cd backend
npm run seed
```

### Start Frontend
```bash
npm start        # Runs React development server on port 3000
```

---

## 📡 API Reference Summary

### Authentication
* `POST /api/v1/auth/register` - Create user account
* `POST /api/v1/auth/login` - Login, returns JWT token & sets HTTP-only cookie
* `POST /api/v1/auth/logout` - Logout & clear session cookie
* `GET  /api/v1/auth/me` - Get current authenticated user profile

### Doctors
* `GET    /api/v1/doctors` (or `/api/doctors`) - List all doctors (with schedules & departments)
* `GET    /api/v1/doctors/:id` - Doctor details
* `POST   /api/v1/doctors` - Add doctor (Admin / Clinic Admin)
* `PUT    /api/v1/doctors/:id` - Edit doctor
* `DELETE /api/v1/doctors/:id` - Delete doctor

### Patients
* `GET    /api/v1/patients` (or `/api/patients`) - List all patients
* `GET    /api/v1/patients/:id` - Patient history & records
* `POST   /api/v1/patients` - Register new patient
* `PUT    /api/v1/patients/:id` - Update patient
* `DELETE /api/v1/patients/:id` - Delete patient

### Clinics
* `GET    /api/v1/clinics` (or `/api/clinics`) - List clinics
* `GET    /api/v1/clinics/:id` - Clinic profile & doctors roster
* `POST   /api/v1/clinics` - Register clinic (Admin only)
* `PUT    /api/v1/clinics/:id` - Update clinic
* `DELETE /api/v1/clinics/:id` - Remove clinic

### Appointments
* `GET    /api/v1/appointments` (or `/api/appointments`) - List appointments
* `POST   /api/v1/appointments` - Book appointment
* `PUT    /api/v1/appointments/:id` - Reschedule / update appointment
* `DELETE /api/v1/appointments/:id` - Cancel appointment

### Dashboards
* `GET /api/v1/dashboard/clinic` - Clinic metrics, appointments count, active doctors
* `GET /api/v1/dashboard/admin` - Hospital-wide financial and clinical stats
