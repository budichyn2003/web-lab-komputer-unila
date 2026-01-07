# ⚡ QUICK START - SETUP DATABASE & RUN APLIKASI

## LANGKAH 1: Setup Database dengan Docker (PALING MUDAH)

### Pastikan Docker Desktop Running
1. Buka **Docker Desktop** dari Start Menu
2. Tunggu sampai status berubah dari "Starting" ke "Running"
3. Tunggu 30-60 detik sampai fully initialized

### Jalankan MySQL Container

**Di PowerShell (Administrator):**
```powershell
docker run --name labkom-mysql ^
  -e MYSQL_ROOT_PASSWORD=labkom2025!./ ^
  -e MYSQL_DATABASE=labkom_unila ^
  -p 3306:3306 ^
  -d ^
  mysql:8
```

**Tunggu sampai database siap (lihat logs):**
```powershell
docker logs labkom-mysql
```

Tunggu sampai Anda lihat:
```
[Server] ready for connections
```

---

## LANGKAH 2: Setup Backend

```powershell
cd D:\weblabkom\server

# Install dependencies (jika belum)
npm install

# Cek .env sudah ada
type .env

# Jalankan server
npm run dev
```

Seharusnya Anda lihat:
```
✅ MySQL Database connected successfully
✅ Database models synchronized
[nodemon] listening on port 5000
```

---

## LANGKAH 3: Setup Frontend (Terminal Baru)

```powershell
cd D:\weblabkom\client

# Install dependencies (jika belum)
npm install

# Jalankan dev server
npm run dev
```

Seharusnya Anda lihat:
```
  VITE v4.4.9  ready in 123 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

---

## LANGKAH 4: Test Aplikasi

### Buka di Browser
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

### Test Admin Login
1. Klik tombol **Admin** di navbar
2. Login dengan:
   - Email: `admin@labkom.unila.ac.id`
   - Password: `admin123`
3. Coba CRUD: Tambah, Edit, Delete data

---

## Jika Ingin Menggunakan XAMPP (Alternatif)

### Download & Setup XAMPP
1. Download dari: https://www.apachefriends.org/download.html
2. Install di default location: `C:\xampp`
3. Buka **XAMPP Control Panel**
4. Start **MySQL** module

### Setup Database
1. Buka **phpMyAdmin** (biasanya http://localhost/phpmyadmin)
2. Buat database baru bernama `labkom_unila`
3. Username: `root`, Password: (kosong/default)

### Update .env
Di `server/.env`, ubah:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
```

### Jalankan Server
```powershell
cd D:\weblabkom\server
npm run dev
```

---

## ❌ Troubleshooting

### Error: "Unable to connect to database"

**Masalah**: Database tidak running

**Solusi**:
```powershell
# Jika pakai Docker, check container
docker ps
docker logs labkom-mysql

# Jika perlu start ulang
docker restart labkom-mysql

# Jika perlu cek keadaan sekarang
docker inspect labkom-mysql
```

### Error: "Port 3306 already in use"

**Solusi**:
```powershell
# Hapus container lama
docker rm labkom-mysql

# Jalankan yang baru
docker run --name labkom-mysql ...
```

### Error: "Port 5000 already in use"

**Solusi**:
```powershell
# Find process using port 5000
Get-NetTCPConnection -LocalPort 5000

# Kill process
Stop-Process -Id <PID> -Force
```

---

## ✅ Checklist

- [ ] Docker Desktop running
- [ ] MySQL container berjalan (`docker ps`)
- [ ] Backend connected ke database
- [ ] Backend running di port 5000
- [ ] Frontend running di port 5173
- [ ] Bisa login ke admin dashboard
- [ ] CRUD operations berjalan

---

## Siap untuk Deploy?

Setelah semua checklist ✅, lanjut ke `DEPLOYMENT_GUIDE.md` untuk deploy ke Vercel & Render!

**Soal apapun, reference file ini untuk quick troubleshooting! 🚀**
