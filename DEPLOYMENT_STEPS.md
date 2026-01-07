# 🚀 DEPLOYMENT STEP-BY-STEP GUIDE

> Panduan lengkap untuk deploy aplikasi LabKom Unila ke Vercel (Frontend) & Render (Backend)

## 📋 Pre-Deployment Checklist

```
✅ Aplikasi sudah tested di local
✅ Semua feature working correctly
✅ Code sudah push ke GitHub
✅ Vercel sudah connect dengan GitHub repo
✅ Database local berjalan dengan baik
```

---

## FASE 1: SETUP DATABASE CLOUD (PlanetScale)

### Step 1.1: Buat Account PlanetScale (atau pilih alternatif gratis)
Jika kamu memilih PlanetScale, ikuti instruksi di bawah. Jika ingin opsi gratis, lihat bagian "Alternatif Gratis (Neon / Supabase)" di bawah.

1. Buka https://planetscale.com
2. Click **Sign Up** → Pilih **Sign up with GitHub**
3. Authorize dengan GitHub Anda
4. Setelah signup, Anda akan di dashboard

### Step 1.2: Buat Database (PlanetScale)
1. Click **Create Database** atau **New Database**
2. Nama: `labkom-unila` (atau nama apa saja)
3. Region: Asia (pilih terdekat, misal Singapore)
4. Click **Create Database**

### Step 1.3: Ambil Connection String (PlanetScale)
1. Tunggu database selesai dibuat (1-2 menit)
2. Click tab **Connect**
3. Pilih **Node.js** dari dropdown
4. Copy connection string:
   ```
   mysql://user:password@aws.connect.psdb.cloud/labkom-unila
   ```

### Step 1.4: Extract Database Credentials (PlanetScale)
Dari connection string di atas, ambil:
- **DB_USER**: `user`
- **DB_PASSWORD**: `password`
- **DB_HOST**: `host.psdb.cloud`
- **DB_NAME**: `labkom_unila`
- **DB_PORT**: `3306`

Catat credentials ini untuk Step 3!

---

### Alternatif Gratis (Neon / Supabase) — Postgres
Jika kamu ingin menghindari biaya, gunakan Neon (neon.tech) atau Supabase (supabase.com). Keduanya menyediakan PostgreSQL dengan free tier yang mudah digunakan.

Quick notes:
- Aplikasi saat ini menggunakan Sequelize — saya sudah menambahkan dukungan untuk `DATABASE_URL` dan `DB_DIALECT` di `server/config/db.js`.
- Untuk Neon/Supabase gunakan `DB_DIALECT=postgres` dan set `DATABASE_URL` (direkomendasikan) atau set `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_PORT`.

Contoh langkah cepat (Supabase):
1. Buka https://supabase.com → Sign up with GitHub
2. Create new project → pilih region terdekat
3. Setelah proyek dibuat → Project Settings → Database → Connection string
4. Copy `Connection string (URI)` — contoh:
   ```
   postgres://username:password@db.ap-southeast-1.supabase.co:5432/postgres
   ```
5. Di Render (atau environment lokal) set environment variables:
   - `DATABASE_URL` = (URI di atas)
   - `DB_DIALECT` = `postgres`

Contoh langkah cepat (Neon):
1. Buka https://neon.tech → Sign up with GitHub
2. Create a new project and branch, then create a connection
3. Copy the connection string (URI)
4. Set environment variables di Render/Vercel:
   - `DATABASE_URL` = (Neon connection URI)
   - `DB_DIALECT` = `postgres`

Catatan: Setelah set `DATABASE_URL` dan `DB_DIALECT=postgres`, backend akan otomatis menggunakan Postgres.

---

## FASE 2: DEPLOY FRONTEND KE VERCEL

### Step 2.1: Setup di Vercel Dashboard
1. Buka https://vercel.com/dashboard
2. Pilih project **weblabkom** (sudah terconnect dengan GitHub)
3. Klik **Settings** → **Environment Variables**

### Step 2.2: Tambah Environment Variables
Klik **Add Environment Variable**:
- **Name**: `VITE_API_URL`
- **Value**: *(nanti kita isi setelah backend live)*
- **Environments**: Production, Preview, Development
- Click **Add**

Untuk sekarang, bisa pakai URL lokal dulu atau Render (lihat Step 3)

### Step 2.3: Konfigurasi Build Settings
1. Di Settings, scroll ke **Build & Development Settings**
2. Verifikasi:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

3. Click **Save**

### Step 2.4: Deploy
Pilih salah satu:

**OPSI A: Auto Deploy (Recommended)**
- Push code ke GitHub
- Vercel otomatis deploy saat ada push
- Selesai! 🎉

**OPSI B: Manual Deploy**
1. Di Vercel dashboard, click **Deployments**
2. Click tombol **Redeploy** di deployment terbaru
3. Tunggu selesai

### Step 2.5: Dapatkan Frontend URL
Setelah deploy selesai, Anda akan dapat URL seperti:
```
https://weblabkom.vercel.app
```

Catat URL ini untuk Step 3!

---

## FASE 3: DEPLOY BACKEND KE RENDER

### Step 3.1: Buat Account Render (Jika belum)
1. Buka https://render.com
2. Click **Sign Up** → Pilih **GitHub**
3. Authorize dengan GitHub
4. Selesai setup account

### Step 3.2: Prepare Repository
Pastikan file structure di GitHub seperti ini:
```
weblabkom/
├── server/          ← Backend folder
│   ├── package.json
│   ├── server.js
│   ├── .env.example
│   └── ... (semua files)
├── client/          ← Frontend folder
│   └── ...
└── README.md
```

**Penting**: Pastikan `.env` file ada di `.gitignore` dan tidak ter-push ke GitHub!

### Step 3.3: Persiapkan Environment File
Buat file `server/.env.production` (jangan push ke GitHub):
```env
PORT=10000
NODE_ENV=production

DB_HOST=<dari PlanetScale - host>
DB_USER=<dari PlanetScale - user>
DB_PASSWORD=<dari PlanetScale - password>
DB_NAME=labkom-unila
DB_PORT=3306

JWT_SECRET=generate-secret-min-32-chars-here-!!!@#$%^&*

FRONTEND_URL=https://weblabkom.vercel.app
```

Ganti `<dari PlanetScale>` dengan credentials yang Anda dapatkan di Fase 1!

### Step 3.4: Deploy di Render
1. Buka https://dashboard.render.com
2. Click **New** → **Web Service**
3. Pilih repository `weblabkom`
4. Isi form:
   - **Name**: `labkom-unila-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Region**: `Singapore` (atau Asia terdekat)
   - **Branch**: `main`
   - **Root Directory**: `server`

5. Scroll ke **Advanced**:
   - **Auto-Deploy**: Toggle ON
   - **Free tier**: Jika mau, bisa pakai free

6. Click **Advanced** dan tambah environment variables:
   - `PORT`: `10000`
   - `NODE_ENV`: `production`
   - `DB_HOST`: `<PlanetScale host>`
   - `DB_USER`: `<PlanetScale user>`
   - `DB_PASSWORD`: `<PlanetScale password>`
   - `DB_NAME`: `labkom-unila`
   - `DB_PORT`: `3306`
   - `JWT_SECRET`: `<secret key yang Anda buat>`
   - `FRONTEND_URL`: `https://weblabkom.vercel.app`

7. Click **Create Web Service**

### Step 3.5: Tunggu Deploy Selesai
- Render akan mulai build (2-5 menit)
- Lihat logs untuk progress
- Setelah sukses, Anda dapat URL seperti:
  ```
  https://labkom-unila-backend.onrender.com
  ```

Catat URL ini!

---

## FASE 4: UPDATE FRONTEND DENGAN BACKEND URL

### Step 4.1: Update di Vercel
1. Buka https://vercel.com/dashboard
2. Pilih project **weblabkom**
3. **Settings** → **Environment Variables**
4. Edit variable `VITE_API_URL`:
   - **Value**: `https://labkom-unila-backend.onrender.com/api`
5. Click **Save**

### Step 4.2: Redeploy Frontend
1. Di Vercel dashboard, click **Deployments**
2. Click tombol **Redeploy** di deployment terbaru
3. Tunggu sampai ✅ selesai

---

## FASE 5: TESTING PRODUCTION

### Test 5.1: Frontend
1. Buka https://weblabkom.vercel.app
2. Periksa halaman loading dengan benar
3. Lihat data dari database (home page, jadwal, dosen, dll)

### Test 5.2: Admin Dashboard
1. Klik tombol **Admin** di navbar
2. Login dengan:
   - Email: `admin@labkom.unila.ac.id`
   - Password: `admin123`
3. Coba CRUD (Create, Read, Update, Delete) di satu section
4. Refresh browser → Data should persist

### Test 5.3: API Health Check
Buka di browser atau terminal:
```bash
curl https://labkom-unila-backend.onrender.com/api/health
```

Seharusnya return:
```json
{
  "status": "OK",
  "message": "LabKom Unila API is running"
}
```

---

## ⚠️ TROUBLESHOOTING

### ❌ Frontend tidak bisa connect ke backend

**Diagnosa**:
1. Buka browser DevTools (F12)
2. Lihat tab **Network**
3. Cari request ke API
4. Check error message

**Solusi**:
- Verify `VITE_API_URL` di Vercel env variables
- Pastikan backend URL benar dan accessible
- Check backend logs di Render untuk error
- Redeploy frontend

### ❌ Database connection error di backend

**Solusi**:
1. Verify PlanetScale credentials di `.env`
2. Test connection di local:
   ```bash
   cd server
   npm run dev
   ```
3. Check PlanetScale dashboard untuk memastikan database aktif
4. Verify firewall/whitelist sudah allow connections

### ❌ Render: "Application failed to start"

**Solusi**:
1. Check **Logs** di Render dashboard
2. Verify `START COMMAND` adalah `npm start`
3. Verify `npm install` berjalan tanpa error
4. Check `package.json` memiliki `"start"` script

### ❌ Vercel: "Build failed"

**Solusi**:
1. Check **Build Logs** di Vercel
2. Verify `client/package.json` tidak corrupt
3. Verify Root Directory adalah `client`
4. Try rebuild: **Deployments** → **Redeploy**

---

## 📝 PRODUCTION CHECKLIST

```
✅ PlanetScale database active & tested
✅ Render backend deployed & logs clean
✅ Vercel frontend deployed & loading
✅ VITE_API_URL updated di Vercel
✅ Frontend → Backend communication works
✅ Admin login tested
✅ CRUD operations tested
✅ Image uploads tested (jika ada)
✅ No console errors di browser
✅ No error logs di backend
✅ Database data persists after redeploy
```

---

## 🎉 SELESAI!

Aplikasi Anda sekarang LIVE di:
- **Frontend**: https://weblabkom.vercel.app
- **Backend**: https://labkom-unila-backend.onrender.com

**Bonus Features untuk Future**:
- [ ] Setup custom domain
- [ ] Setup SSL certificate
- [ ] Setup email notifications
- [ ] Setup backup database
- [ ] Add monitoring/analytics

---

## 📞 QUICK REFERENCE

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | https://vercel.com/dashboard | Deploy & manage frontend |
| Backend | https://render.com/dashboard | Deploy & manage backend |
| Database | https://planetscale.com/dashboard | Manage database |
| GitHub | https://github.com | Source code |

---

**Butuh bantuan? Cek file DEPLOYMENT_GUIDE.md atau QUICK_START.md!**

**Good luck! 🚀**
