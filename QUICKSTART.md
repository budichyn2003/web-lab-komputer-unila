# ⚡ Quick Start Guide

Get LabKom Unila website running in 5 minutes!

## 🎯 Prerequisites

- ✅ Node.js installed (v16+)
- ✅ MySQL installed and running
- ✅ 10 minutes of your time

## 🚀 Installation Steps

### 1. Create Database (1 minute)

```bash
mysql -u root -p
```

```sql
CREATE DATABASE labkom_unila;
exit;
```

### 2. Backend Setup (2 minutes)

```bash
cd server
npm install
copy .env.example .env
```

**Edit `server/.env`:**
```env
DB_PASSWORD=your_mysql_password
JWT_SECRET=any_random_string_here
```

```bash
npm run dev
```

✅ **Success!** You should see:
```
✅ MySQL Database connected successfully
✅ Database seeded successfully
🚀 Server running on port 5000
```

### 3. Frontend Setup (2 minutes)

**Open NEW terminal:**

```bash
cd client
npm install
copy .env.example .env
npm run dev
```

✅ **Success!** You should see:
```
➜  Local:   http://localhost:5173/
```

## 🎉 You're Done!

### Access Your Website

1. **Public Website**: http://localhost:5173
2. **Admin Panel**: http://localhost:5173/admin/login

### Default Admin Login

```
Email: admin@labkom.unila.ac.id
Password: admin123
```

## 🧪 Test It Out

1. ✅ Browse the home page
2. ✅ Check Jadwal pages (Piket, Praktikum, Seminar)
3. ✅ View Info pages (Dosen, Asisten, Pengurus)
4. ✅ Login to admin dashboard
5. ✅ Try adding/editing/deleting data

## ❓ Problems?

### "Cannot connect to database"
- Check MySQL is running
- Verify password in `.env`

### "Port already in use"
- Close other applications using ports 5000 or 5173
- Or change ports in config files

### "Module not found"
- Run `npm install` again in both folders

## 📚 Next Steps

- Read [INSTALLATION.md](INSTALLATION.md) for detailed setup
- Read [README.md](README.md) for full documentation
- Read [DEPLOYMENT.md](DEPLOYMENT.md) to deploy online

---

**Need Help?** Check the full documentation or contact support.

**Happy Coding! 🚀**
