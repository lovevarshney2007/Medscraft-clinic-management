# 🚀 Medscraft Complete Deployment Guide

A step-by-step deployment guide for both Frontend and Backend.

---

## 🌟 Method 1: Frontend on Vercel + Backend on Render.com (Recommended)

This is the standard industry setup: Vercel provides a blazing fast global CDN for React SPA, while Render provides a persistent 24/7 Node.js backend.

### Step 1: Deploy Backend on Render (Free)
1. Push this project to GitHub.
2. Go to **[render.com](https://render.com)** and click **New +** → **Web Service**.
3. Connect your GitHub repository.
4. Set the following settings:
   * **Name**: `medscraft-backend`
   * **Root Directory**: `backend`
   * **Environment**: `Node`
   * **Build Command**:
     ```bash
     npm install && npx prisma db push && npm run seed
     ```
   * **Start Command**:
     ```bash
     node index.js
     ```
5. In **Environment Variables**, add:
   * `NODE_ENV` = `production`
   * `PORT` = `5000`
   * `JWT_SECRET` = `medscraft_super_secure_jwt_secret_key_2026_xyz`
   * `CORS_ORIGIN` = `*` (or your Vercel URL once generated)
6. Click **Deploy Web Service**.
7. Copy your backend URL: e.g. `https://medscraft-backend.onrender.com`.

---

### Step 2: Deploy Frontend on Vercel (Free)
1. Go to **[vercel.com](https://vercel.com)** and click **Add New** → **Project**.
2. Select your GitHub repository.
3. Keep default settings:
   * **Framework Preset**: `Create React App`
   * **Root Directory**: `./` (Root)
   * **Build Command**: `npm run build`
   * **Output Directory**: `build`
4. In **Environment Variables**, add:
   * `REACT_APP_API_URL` = `https://medscraft-backend.onrender.com/api/v1`
   * `REACT_APP_ROOT_API_URL` = `https://medscraft-backend.onrender.com/api`
5. Click **Deploy**.

> **Note:** The [`vercel.json`](./vercel.json) file in the root automatically prevents 404 errors when refreshing React Router pages.

---

## 🌟 Method 2: Both on Vercel (Serverless Backend + Free Cloud DB)

If you want both on Vercel:

### Step 1: Get a Free Cloud PostgreSQL Database
1. Go to **[neon.tech](https://neon.tech)** or **[supabase.com](https://supabase.com)** (100% free).
2. Create a project and copy your connection string (e.g. `postgresql://user:pass@ep-cool-db.us-east-2.aws.neon.tech/neondb?sslmode=require`).

### Step 2: Update Schema for PostgreSQL
In `backend/prisma/schema.prisma`, change:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### Step 3: Deploy Backend to Vercel
1. On Vercel, create a new project with **Root Directory** set to `backend`.
2. Environment Variables:
   * `DATABASE_URL` = your Neon/Supabase PostgreSQL URL
   * `JWT_SECRET` = your secret key
   * `NODE_ENV` = `production`
3. Vercel will use [`backend/vercel.json`](./backend/vercel.json) and [`backend/api/index.js`](./backend/api/index.js) to run the Express API as a serverless function.

---

## 🐳 Method 3: Docker & Docker Compose (Self-Hosted / VPS)

To deploy on any Ubuntu VPS, AWS EC2, or DigitalOcean Droplet:

```bash
# Clone and run
docker compose up -d --build
```

* **Frontend**: `http://your-server-ip:3000`
* **Backend API**: `http://your-server-ip:5000`
