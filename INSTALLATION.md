# 📦 Installation Guide - LabKom Unila Website

Complete step-by-step installation guide for Windows, macOS, and Linux.

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Quick Start](#quick-start)
3. [Detailed Installation](#detailed-installation)
4. [Database Configuration](#database-configuration)
5. [Running the Application](#running-the-application)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software

1. **Node.js** (v16 or higher)
   - Download: https://nodejs.org/
   - Verify installation: `node --version`

2. **MySQL** (v8 or higher)
   - Windows: https://dev.mysql.com/downloads/installer/
   - macOS: `brew install mysql`
   - Linux: `sudo apt-get install mysql-server`
   - Verify installation: `mysql --version`

3. **Git** (optional, for cloning)
   - Download: https://git-scm.com/

### Recommended Tools
- **VS Code** - Code editor
- **MySQL Workbench** - Database management GUI
- **Postman** - API testing

---

## Quick Start

### For Experienced Developers

```bash
# 1. Create MySQL database
mysql -u root -p
CREATE DATABASE labkom_unila;
exit;

# 2. Backend setup
cd server
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run dev

# 3. Frontend setup (new terminal)
cd client
npm install
cp .env.example .env
npm run dev

# 4. Access application
# Frontend: http://localhost:5173
# Backend: http://localhost:5000
# Admin: http://localhost:5173/admin/login
```

**Default Admin Login:**
- Email: `admin@labkom.unila.ac.id`
- Password: `admin123`

---

## Detailed Installation

### Step 1: Download/Clone Project

**Option A: Download ZIP**
1. Download the project ZIP file
2. Extract to your desired location (e.g., `D:/weblabkom`)

**Option B: Clone with Git**
```bash
git clone <repository-url>
cd weblabkom
```

### Step 2: Install Node.js

1. Download Node.js from https://nodejs.org/
2. Run the installer
3. Verify installation:
   ```bash
   node --version
   npm --version
   ```

### Step 3: Install MySQL

#### Windows
1. Download MySQL Installer from https://dev.mysql.com/downloads/installer/
2. Run installer and choose "Developer Default"
3. Set root password (remember this!)
4. Complete installation

#### macOS
```bash
brew install mysql
brew services start mysql
mysql_secure_installation
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install mysql-server
sudo mysql_secure_installation
```

### Step 4: Create Database

**Method 1: Using MySQL Command Line**
```bash
# Login to MySQL
mysql -u root -p
# Enter your password

# Create database
CREATE DATABASE labkom_unila;

# Verify
SHOW DATABASES;

# Exit
exit;
```

**Method 2: Using MySQL Workbench**
1. Open MySQL Workbench
2. Connect to your local MySQL server
3. Click "Create Schema" button
4. Name: `labkom_unila`
5. Click "Apply"

### Step 5: Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file
# Windows (PowerShell)
copy .env.example .env

# macOS/Linux
cp .env.example .env

# Edit .env file with your text editor
notepad .env  # Windows
nano .env     # Linux/macOS
```

**Configure .env file:**
```env
PORT=5000
NODE_ENV=development

# Update these with your MySQL credentials
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_NAME=labkom_unila
DB_PORT=3306

# Generate a random secret key
JWT_SECRET=your_super_secret_jwt_key_change_this

FRONTEND_URL=http://localhost:5173
```

**Generate JWT Secret (Optional but Recommended):**
```bash
# In Node.js console
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 6: Frontend Setup

```bash
# Open new terminal
# Navigate to client directory
cd client

# Install dependencies
npm install

# Create environment file
# Windows (PowerShell)
copy .env.example .env

# macOS/Linux
cp .env.example .env

# Edit .env file
notepad .env  # Windows
nano .env     # Linux/macOS
```

**Configure .env file:**
```env
VITE_API_URL=http://localhost:5000/api
```

---

## Database Configuration

### Automatic Setup (Recommended)

The application will automatically:
1. Create all database tables
2. Set up relationships
3. Seed initial data (admin account + sample data)

Just start the backend server and it will handle everything!

### Manual Setup (Advanced)

If you prefer manual control, edit `server/server.js`:

```javascript
// Comment out this line to disable auto-seeding
// await seedDatabase();
```

Then create tables manually or use migrations.

---

## Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

You should see:
```
✅ MySQL Database connected successfully
✅ Database models synchronized
🌱 Seeding database...
✅ Database seeded successfully
📧 Admin email: admin@labkom.unila.ac.id
🔑 Admin password: admin123
🚀 Server running on port 5000
📡 API available at http://localhost:5000/api
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

You should see:
```
  VITE v4.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Access the Application

1. **Public Website**: http://localhost:5173
2. **Admin Login**: http://localhost:5173/admin/login
3. **API Health Check**: http://localhost:5000/api/health

### Default Admin Credentials

```
Email: admin@labkom.unila.ac.id
Password: admin123
```

**⚠️ IMPORTANT: Change this password in production!**

---

## Production Build

### Frontend Build

```bash
cd client
npm run build
```

This creates a `dist` folder with optimized production files.

### Backend Production

```bash
cd server
npm start
```

---

## Troubleshooting

### Issue: "Cannot connect to MySQL"

**Solution:**
1. Verify MySQL is running:
   ```bash
   # Windows
   services.msc  # Look for MySQL service
   
   # macOS
   brew services list
   
   # Linux
   sudo systemctl status mysql
   ```

2. Check credentials in `.env`
3. Test MySQL connection:
   ```bash
   mysql -u root -p
   ```

### Issue: "Port 5000 already in use"

**Solution:**
1. Change port in `server/.env`:
   ```env
   PORT=5001
   ```
2. Update frontend `.env`:
   ```env
   VITE_API_URL=http://localhost:5001/api
   ```

### Issue: "Port 5173 already in use"

**Solution:**
1. Kill the process using the port:
   ```bash
   # Windows
   netstat -ano | findstr :5173
   taskkill /PID <PID> /F
   
   # macOS/Linux
   lsof -ti:5173 | xargs kill
   ```

2. Or change Vite port in `client/vite.config.js`:
   ```javascript
   server: {
     port: 3000,
   }
   ```

### Issue: "Module not found"

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: "CORS Error"

**Solution:**
1. Verify `FRONTEND_URL` in `server/.env`
2. Check both servers are running
3. Clear browser cache

### Issue: "Database tables not created"

**Solution:**
1. Check MySQL connection
2. Verify database exists:
   ```sql
   SHOW DATABASES;
   ```
3. Check Sequelize sync in `server/config/db.js`
4. Restart backend server

### Issue: "Images not uploading"

**Solution:**
1. Verify `server/uploads` folder exists
2. Check folder permissions:
   ```bash
   # Linux/macOS
   chmod 755 server/uploads
   ```
3. Check Multer configuration in `server/middleware/upload.js`

### Issue: "JWT Token Invalid"

**Solution:**
1. Clear browser localStorage:
   ```javascript
   // In browser console
   localStorage.clear()
   ```
2. Login again
3. Verify `JWT_SECRET` in `.env`

---

## Verification Checklist

After installation, verify:

- [ ] Backend server running on http://localhost:5000
- [ ] Frontend running on http://localhost:5173
- [ ] Can access home page
- [ ] Can view Jadwal pages
- [ ] Can view Info pages
- [ ] Can login to admin panel
- [ ] Can perform CRUD operations in dashboard
- [ ] Images upload successfully

---

## Next Steps

1. **Change Admin Password**
   - Login to dashboard
   - (Feature to be added, or change directly in database)

2. **Add Your Data**
   - Add real Dosen information
   - Add Asisten data
   - Add Pengurus details
   - Create actual schedules

3. **Customize**
   - Update university logo
   - Modify contact information in Footer
   - Adjust color scheme if needed

4. **Deploy**
   - See README.md for deployment instructions

---

## Getting Help

If you encounter issues:

1. Check this troubleshooting guide
2. Review error messages in terminal
3. Check browser console (F12)
4. Verify all environment variables
5. Ensure all services are running

For additional support:
- Email: labkom@eng.unila.ac.id
- Check server logs for detailed errors

---

**Happy Coding! 🚀**
