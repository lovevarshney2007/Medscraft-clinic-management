# 🚀 Medscraft Complete Deployment Guide

A clean, modern monorepo setup with dedicated `frontend/` and `backend/` folders.

```
Medscraft-clinic-management/
├── frontend/             <--- All React frontend code & vercel.json
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vercel.json
│
├── backend/              <--- All Express backend, Prisma & DB code
│   ├── prisma/
│   ├── src/
│   ├── package.json
│   └── index.js
│
├── docker-compose.yml    <--- Local & VPS multi-container runner
└── package.json          <--- Root monorepo scripts
```

---

## 🌟 Method 1: Frontend on Vercel + Backend on Render.com (Recommended)

### Step 1: Deploy Backend on Render (Free)
1. Push this project to GitHub.
2. Go to **[render.com](https://render.com)** and click **New +** → **Web Service**.
3. Connect your GitHub repository.
4. Set the following settings:
   * **Name**: `medscraft-backend`
   * **Root Directory**: `backend` *(Type `backend`)*
   * **Environment**: `Docker` *(Recommended - automatically runs `backend/Dockerfile` with auto-initialized database & seed data)*
     * *Or if using `Node`:*
       * **Build Command**: `npm install && npm run init-db`
       * **Start Command**: `npm start`
5. In **Environment Variables**, add:
   * `NODE_ENV` = `production`
   * `PORT` = `5000`
   * `JWT_SECRET` = `medscraft_super_secure_jwt_secret_key_2026_xyz`
   * `CORS_ORIGIN` = `*`
   * *(Optional: If using PostgreSQL on Neon/Supabase, add `DATABASE_URL`)*
6. Click **Deploy Web Service**.
7. Copy your backend URL: e.g. `https://medscraft-backend.onrender.com`.

> 💡 **Default Login Credentials**:
> * **System Admin**: `admin@medscraft.com` / `Admin@123`
> * **Clinic Admin**: `clinic@medscraft.com` / `Password@123`
> * **Doctor**: `doctor@medscraft.com` / `Password@123`
> * **Patient**: `patient@medscraft.com` / `Password@123`

> 💡 **No Sleeping**: The backend contains a built-in auto-ping keep-alive service that prevents Render from sleeping!

---

### Step 2: Deploy Frontend on Vercel (Free)
1. Go to **[vercel.com](https://vercel.com)** and click **Add New** → **Project**.
2. Select your GitHub repository.
3. Settings:
   * **Framework Preset**: `Create React App`
   * **Root Directory**: `frontend` *(Click Edit and select `frontend`)*
   * **Build Command**: `npm run build`
   * **Output Directory**: `build`
4. In **Environment Variables**, add:
   * `REACT_APP_API_URL` = `https://medscraft-backend.onrender.com/api/v1`
   * `REACT_APP_ROOT_API_URL` = `https://medscraft-backend.onrender.com/api`
5. Click **Deploy**.

---

## 🌟 Method 2: Both on Vercel (Serverless Backend + Free Cloud Postgres)

1. Get a free PostgreSQL connection string from **[Neon.tech](https://neon.tech)** or **[Supabase.com](https://supabase.com)**.
2. Run `cd backend && npm run use:postgres`.
3. Create Project 1 on Vercel:
   * **Root Directory**: `backend`
   * **Environment Variables**: `DATABASE_URL` = your Neon PostgreSQL URL, `JWT_SECRET` = your secret.
4. Create Project 2 on Vercel:
   * **Root Directory**: `frontend`
   * **Environment Variables**: `REACT_APP_API_URL` = your Vercel backend project URL.

---

## 🐳 Method 3: Docker & Docker Compose (Self-Hosted / VPS)

```bash
docker compose up -d --build
```
* **Frontend**: `http://localhost:3000`
* **Backend**: `http://localhost:5000`
