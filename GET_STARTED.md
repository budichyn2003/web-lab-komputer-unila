# 🎯 Get Started with LabKom Unila Website

Welcome! This guide will help you get the LabKom Unila website running on your computer in just a few minutes.

## 📋 What You'll Need

Before starting, make sure you have:

- ✅ **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- ✅ **MySQL** (version 8 or higher) - [Download here](https://dev.mysql.com/downloads/)
- ✅ **A code editor** (VS Code recommended) - [Download here](https://code.visualstudio.com/)
- ✅ **10 minutes of your time**

## 🚀 Step-by-Step Installation

### Step 1: Verify Prerequisites (1 minute)

Open your terminal/command prompt and check:

```bash
# Check Node.js
node --version
# Should show v16.x.x or higher

# Check npm
npm --version
# Should show 8.x.x or higher

# Check MySQL
mysql --version
# Should show 8.x.x or higher
```

If any command fails, install the missing software first.

---

### Step 2: Create Database (2 minutes)

1. **Open MySQL:**
   ```bash
   mysql -u root -p
   ```
   Enter your MySQL password when prompted.

2. **Create the database:**
   ```sql
   CREATE DATABASE labkom_unila;
   ```

3. **Verify it was created:**
   ```sql
   SHOW DATABASES;
   ```
   You should see `labkom_unila` in the list.

4. **Exit MySQL:**
   ```sql
   exit;
   ```

✅ **Database is ready!**

---

### Step 3: Setup Backend (3 minutes)

1. **Navigate to server folder:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   This will take 1-2 minutes. Wait for it to complete.

3. **Create environment file:**
   
   **Windows (PowerShell):**
   ```bash
   copy .env.example .env
   ```
   
   **Mac/Linux:**
   ```bash
   cp .env.example .env
   ```

4. **Edit the .env file:**
   
   Open `server/.env` in your code editor and update:
   ```env
   DB_PASSWORD=your_mysql_password_here
   ```
   Replace `your_mysql_password_here` with your actual MySQL password.
   
   Save the file.

5. **Start the backend server:**
   ```bash
   npm run dev
   ```

✅ **Success!** You should see:
```
✅ MySQL Database connected successfully
✅ Database models synchronized
🌱 Seeding database...
✅ Database seeded successfully
📧 Admin email: admin@labkom.unila.ac.id
🔑 Admin password: admin123
🚀 Server running on port 5000
```

**Keep this terminal open!** The backend is now running.

---

### Step 4: Setup Frontend (3 minutes)

1. **Open a NEW terminal** (keep the backend running)

2. **Navigate to client folder:**
   ```bash
   cd client
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```
   This will take 1-2 minutes.

4. **Create environment file:**
   
   **Windows (PowerShell):**
   ```bash
   copy .env.example .env
   ```
   
   **Mac/Linux:**
   ```bash
   cp .env.example .env
   ```

5. **Start the frontend server:**
   ```bash
   npm run dev
   ```

✅ **Success!** You should see:
```
  VITE v4.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

### Step 5: Access Your Website (1 minute)

1. **Open your browser** (Chrome, Firefox, Edge, etc.)

2. **Visit:** http://localhost:5173

3. **You should see the LabKom Unila homepage!** 🎉

---

## 🎮 Try It Out!

### Explore Public Pages

1. **Home Page** - See the real-time clock and upcoming seminars
2. **Jadwal Menu** - Click to see:
   - Piket schedule
   - Praktikum schedule
   - Seminar schedule
3. **Informasi Menu** - Click to see:
   - Dosen (lecturers)
   - Asisten (assistants)
   - Pengurus (management)

### Try Admin Dashboard

1. **Click "Admin" button** in the top-right corner

2. **Login with:**
   ```
   Email: admin@labkom.unila.ac.id
   Password: admin123
   ```

3. **You're in the dashboard!** Try:
   - Click different tabs (Dosen, Asisten, etc.)
   - Click "Tambah Data" to add new entries
   - Click "Edit" to modify existing data
   - Click "Hapus" to delete (with confirmation)

---

## 📱 What You Have Now

You now have a fully functional website with:

- ✅ **Public website** for visitors
- ✅ **Admin dashboard** for content management
- ✅ **Database** with sample data
- ✅ **Real-time clock** on homepage
- ✅ **Complete CRUD operations** for all data
- ✅ **Image upload** functionality
- ✅ **Secure authentication** system

---

## 🎯 Next Steps

### 1. Customize Your Data

Login to admin dashboard and:
- Add your actual lecturers (Dosen)
- Add your assistants (Asisten)
- Add your management team (Pengurus)
- Create real schedules

### 2. Change Admin Password

**Important!** Change the default password:
1. Login to MySQL:
   ```bash
   mysql -u root -p labkom_unila
   ```
2. Update password:
   ```sql
   UPDATE admins SET password = '$2b$10$newhashedpassword' WHERE id = 1;
   ```
   Or create a new admin through the API.

### 3. Customize Branding

Edit these files to customize:
- `client/src/components/Footer.jsx` - Update contact info
- `client/src/pages/Home.jsx` - Update welcome message
- `client/index.html` - Update page title

### 4. Deploy Online

When ready to go live:
1. Read [DEPLOYMENT.md](DEPLOYMENT.md)
2. Deploy frontend to Vercel (free)
3. Deploy backend to Render/Railway (free)
4. Update environment variables

---

## ❓ Common Questions

### Q: Can I stop the servers?

**A:** Yes! Press `Ctrl + C` in each terminal to stop. Run `npm run dev` again to restart.

### Q: Do I need to keep both terminals open?

**A:** Yes, while using the website. One for backend, one for frontend.

### Q: Where is my data stored?

**A:** In MySQL database `labkom_unila`. Also, uploaded images are in `server/uploads/`.

### Q: Can I access from another device?

**A:** Yes! Use your computer's IP address instead of localhost. Example: `http://192.168.1.100:5173`

### Q: How do I add more admins?

**A:** Use the `/api/auth/register` endpoint with Postman or create a registration page.

---

## 🐛 Something Not Working?

### Backend won't start?

**Check:**
- MySQL is running
- Database `labkom_unila` exists
- Password in `.env` is correct
- Port 5000 is not in use

**Try:**
```bash
# In server folder
rm -rf node_modules
npm install
npm run dev
```

### Frontend won't start?

**Check:**
- Backend is running
- Port 5173 is not in use

**Try:**
```bash
# In client folder
rm -rf node_modules
npm install
npm run dev
```

### Can't login to admin?

**Check:**
- Backend is running
- Database was seeded (check backend terminal logs)
- Using correct credentials: `admin@labkom.unila.ac.id` / `admin123`

**Try:**
- Clear browser cache
- Try incognito/private mode
- Check browser console for errors (F12)

---

## 📚 Documentation

For more detailed information:

- **[README.md](README.md)** - Complete project documentation
- **[INSTALLATION.md](INSTALLATION.md)** - Detailed installation guide
- **[QUICKSTART.md](QUICKSTART.md)** - 5-minute quick start
- **[API_DOCUMENTATION.md](API_DOCUMENTATION.md)** - API reference
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deployment guide

---

## 💡 Tips for Success

1. **Keep terminals organized** - Label them "Backend" and "Frontend"
2. **Save your work** - Data is in the database, but export regularly
3. **Test before deploying** - Try all features locally first
4. **Read error messages** - They usually tell you what's wrong
5. **Check both terminals** - Errors might appear in either one

---

## 🎉 Congratulations!

You've successfully set up the LabKom Unila website! 

You now have:
- A modern, professional website
- A powerful admin dashboard
- Complete control over your content
- A foundation to build upon

**Enjoy your new website!** 🚀

---

## 📞 Need Help?

If you're stuck:

1. **Check the error message** - Read it carefully
2. **Search the documentation** - Use Ctrl+F to search
3. **Check the troubleshooting section** - Common issues are covered
4. **Review the code** - Comments explain what each part does

**Contact:** labkom@eng.unila.ac.id

---

**Happy Coding! 💻**

Made with ❤️ for Laboratorium Komputer Universitas Lampung
