# 📦 PANDUAN DEPLOYMENT LENGKAP - LabKom Unila

## Daftar Isi
1. [Setup Database Lokal](#setup-database-lokal)
2. [Deploy Frontend ke Vercel](#deploy-frontend-ke-vercel)
3. [Deploy Backend ke Render](#deploy-backend-ke-render)
4. [Setup Database Cloud](#setup-database-cloud)
5. [Troubleshooting](#troubleshooting)

---

## Setup Database Lokal

Anda punya 2 pilihan untuk setup database lokal:

### OPSI A: Menggunakan Docker (Recommended)
Docker sudah terinstall dan Anda tidak perlu XAMPP!

**Step 1: Pastikan Docker sudah terinstall**
```bash
docker --version
```

**Step 2: Jalankan MySQL dengan Docker**
```bash
docker run --name labkom-mysql -e MYSQL_ROOT_PASSWORD=labkom2025!./ -e MYSQL_DATABASE=labkom_unila -p 3306:3306 -d mysql:8
```

**Step 3: Tunggu MySQL siap (sekitar 30 detik)**
```bash
docker logs labkom-mysql
```

**Step 4: Setup backend**
```bash
cd server
npm install
```

**Step 5: Buat file .env di folder server**
Buat file `server/.env`:
```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=labkom2025!./
DB_NAME=labkom_unila
DB_PORT=3306

JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

FRONTEND_URL=http://localhost:5173
```

**Step 6: Jalankan server**
```bash
npm run dev
```

Seharusnya Anda lihat:
```
✅ MySQL Database connected successfully
✅ Database models synchronized
```

---

### OPSI B: Menggunakan XAMPP (Jika mau install ulang)

1. Download & install XAMPP dari https://www.apachefriends.org/
2. Jalankan MySQL dari control panel XAMPP
3. Buat database `labkom_unila`:
   ```sql
   CREATE DATABASE labkom_unila;
   ```
4. Setup environment variables (seperti OPSI A)
5. Jalankan server

---

## Deploy Frontend ke Vercel

### STEP 1: Verifikasi GitHub Connection
Vercel sudah terhubung dengan GitHub Anda. Pastikan kode sudah ter-push:

```bash
cd client
git status
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### STEP 2: Konfigurasi di Vercel Dashboard

1. Buka https://vercel.com/dashboard
2. Pilih project Anda (weblabkom)
3. Klik **Settings** → **Environment Variables**
4. Tambahkan variable:
   ```
   VITE_API_URL=https://your-backend-url.com/api
   ```
   (Nanti kita ganti dengan URL backend yang sudah live)

### STEP 3: Konfigurasi Build Settings

1. Di Vercel dashboard, buka **Settings** → **Build & Development Settings**
2. Pastikan settingan seperti ini:
   - **Framework Preset**: Vite
   - **Root Directory**: `client` ✅
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### STEP 4: Deploy

Klik tombol **Deploy** atau push code ke GitHub dan Vercel akan otomatis deploy!

Setelah sukses, Anda akan dapat URL seperti: `https://weblabkom.vercel.app`

---

## Deploy Backend ke Render

### STEP 1: Persiapan Repository

Pastikan backend folder struktur seperti ini di GitHub:
```
weblabkom/
├── server/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── seeders/
│   ├── uploads/
│   ├── package.json
│   ├── server.js
│   └── .env.example
├── client/
└── README.md
```

### STEP 2: Buat File `.env.production` di folder server

Buat file `server/.env.production`:
```env
PORT=10000
NODE_ENV=production

# NANTI DIGANTI DENGAN DATABASE CLOUD URL
DB_HOST=your-planetscale-host
DB_USER=your-username
DB_PASSWORD=your-password
DB_NAME=labkom_unila
DB_PORT=3306

JWT_SECRET=generate_strong_secret_key_min_32_chars_here!@#$%

FRONTEND_URL=https://weblabkom.vercel.app
```

### STEP 3: Update server.js untuk production

Baca file `server/server.js` dan tambahkan file `.env.production`:

Setelah edit, lanjut ke Render...

### STEP 4: Deploy di Render

1. Buka https://render.com (sign up dengan GitHub)
2. Klik **New** → **Web Service**
3. Pilih repository `weblabkom` Anda
4. Konfigurasi:
   ```
   Name: labkom-unila-backend
   Environment: Node
   Region: Singapore (terdekat)
   Branch: main
   Root Directory: server
   Build Command: npm install
   Start Command: npm start
   ```

5. Klik **Advanced** dan tambahkan environment variables:
   ```
   PORT=10000
   NODE_ENV=production
   DB_HOST=your-planetscale-host
   DB_USER=your-username
   DB_PASSWORD=your-password
   DB_NAME=labkom_unila
   DB_PORT=3306
   JWT_SECRET=generate_strong_secret_key_min_32_chars_here!@#$%
   FRONTEND_URL=https://weblabkom.vercel.app
   ```

6. Klik **Create Web Service**

Tunggu deploy selesai (biasanya 2-5 menit). Anda akan dapat URL seperti:
`https://labkom-unila-backend.onrender.com`

---

## Setup Database Cloud

### OPSI A: PlanetScale (MySQL Serverless) - RECOMMENDED

1. Buka https://planetscale.com
2. Sign up dengan GitHub
3. Buat database baru: `labkom_unila`
4. Ambil connection string:
   ```
   mysql://user:password@aws.connect.psdb.cloud/labkom_unila?sslAccept=strict
   ```
5. Pisahkan menjadi:
   - `DB_HOST`: `aws.connect.psdb.cloud`
   - `DB_USER`: `username`
   - `DB_PASSWORD`: `password`
   - `DB_NAME`: `labkom_unila`

### OPSI B: Railway

1. Buka https://railway.app
2. Create new project
3. Tambahkan MySQL template
4. Setup akan automatic mendapat database

### OPSI C: Render PostgreSQL

Render juga provide database gratis dengan web service mereka!

---

## Konfigurasi Final

### Update Vercel Environment Variables

1. Buka Vercel dashboard
2. Settings → Environment Variables
3. Update:
   ```
   VITE_API_URL=https://labkom-unila-backend.onrender.com/api
   ```
4. Redeploy frontend

### Update Render Environment Variables

1. Buka Render dashboard
2. Select web service Anda
3. Environment → Update semua variables dengan database cloud credentials

---

## Testing Setelah Deploy

### Test Frontend
- Buka https://weblabkom.vercel.app
- Coba navigasi page
- Coba lihat data

### Test Backend Connection
```bash
curl https://labkom-unila-backend.onrender.com/api/auth/verify
```

Harusnya return response (bukan error CORS atau database)

### Test Admin Login
1. Buka aplikasi
2. Klik Admin
3. Login dengan:
   - Email: `admin@labkom.unila.ac.id`
   - Password: `admin123`

---

## Troubleshooting

### ❌ Frontend: API URL not working

**Masalah**: Aplikasi di Vercel tidak bisa connect ke backend

**Solusi**:
1. Verify `VITE_API_URL` di Vercel env variables
2. Pastikan backend sudah live dan accessible
3. Check backend logs di Render
4. Redeploy frontend

### ❌ Backend: Database connection error

**Masalah**: `Unable to connect to database`

**Solusi**:
1. Verify semua DB credentials benar
2. Test connection ke database cloud
3. Pastikan firewall/whitelist allow connection
4. Check Render logs untuk error detail

### ❌ Image upload tidak working

**Masalah**: Upload foto error

**Solusi**:
Database cloud tidak support file uploads via Sequelize. Gunakan cloud storage:
- **Cloudinary** (gratis)
- **AWS S3**
- **Firebase Storage**

(Opsional untuk future enhancement)

### ❌ CORS Error

**Masalah**: `Access to XMLHttpRequest blocked by CORS`

**Solusi**:
1. Verify `FRONTEND_URL` di backend .env
2. Check CORS config di `server.js` sama dengan production URL
3. Pastikan API URL di frontend benar

---

## Checklist Sebelum Go Live

- [ ] Database local berjalan dengan baik
- [ ] Backend local bekerja (`npm run dev`)
- [ ] Frontend local bekerja (`npm run dev`)
- [ ] Semua CRUD operations tested
- [ ] Admin login tested
- [ ] GitHub repo updated dengan semua changes
- [ ] Vercel connected dan auto-deploy configured
- [ ] Render connected dan auto-deploy configured
- [ ] Database cloud sudah setup
- [ ] Environment variables sudah configured di Vercel & Render
- [ ] Frontend redeploy dengan API URL baru
- [ ] Backend redeploy dengan DB credentials
- [ ] Testing di production environment
- [ ] Domain custom (opsional)

---

## Useful Commands

```bash
# Local development
cd server && npm run dev  # Terminal 1
cd client && npm run dev  # Terminal 2

# Build untuk production
cd client && npm run build
cd server && npm start

# Docker MySQL (jika pakai Docker)
docker start labkom-mysql      # Start
docker stop labkom-mysql       # Stop
docker logs labkom-mysql       # See logs

# Check running services
docker ps
```

---

## Support & Resources

- Vercel Docs: https://vercel.com/docs
- Render Docs: https://render.com/docs
- PlanetScale Docs: https://docs.planetscale.com
- Express Docs: https://expressjs.com
- React Docs: https://react.dev

---

**Anda sudah siap! Mari mulai deployment! 🚀**
