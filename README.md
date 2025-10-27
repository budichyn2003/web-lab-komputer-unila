# 🖥️ LabKom Unila - Laboratorium Komputer Universitas Lampung

Modern, elegant, dark-themed official website for Laboratorium Komputer Universitas Lampung with full-stack capabilities including admin dashboard for content management.

![Tech Stack](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MySQL](https://img.shields.io/badge/Database-MySQL-orange)
![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38B2AC)

## ✨ Features

### Public Features
- 🏠 **Home Page** - Welcome section with real-time clock and upcoming seminars
- 📅 **Schedule Management** - View schedules for:
  - Jadwal Piket Asisten (Assistant Duty Schedule)
  - Jadwal Praktikum (Practicum Schedule)
  - Jadwal Seminar (Seminar Schedule)
- 👥 **Information Pages**:
  - Dosen (Lecturers)
  - Asisten (Assistants)
  - Pengurus (Management)
- ⏰ **Real-time Clock** - Always displays current date, day, and time
- 📱 **Responsive Design** - Works perfectly on desktop and mobile

### Admin Features
- 🔐 **Secure Authentication** - JWT-based login system
- 📊 **Dashboard** - Comprehensive admin panel
- ✏️ **Full CRUD Operations** - Create, Read, Update, Delete for all data
- 🖼️ **Image Upload** - Upload photos for Dosen, Asisten, and Pengurus
- 🎯 **No Coding Required** - Admin manages everything through UI
- 🔄 **Real-time Updates** - Changes reflect immediately

## 🛠️ Tech Stack

### Frontend
- **Framework**: React.js 18 with Vite
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Calendar**: React Calendar

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **ORM**: Sequelize
- **Authentication**: JWT (JSON Web Token)
- **Password Hashing**: bcrypt
- **File Upload**: Multer
- **Validation**: Express Validator

## 📁 Project Structure

```
weblabkom/
├── client/                 # Frontend React Application
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Table.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Clock.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/         # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Jadwal/
│   │   │   │   ├── Piket.jsx
│   │   │   │   ├── Praktikum.jsx
│   │   │   │   └── Seminar.jsx
│   │   │   ├── Info/
│   │   │   │   ├── Dosen.jsx
│   │   │   │   ├── Asisten.jsx
│   │   │   │   └── Pengurus.jsx
│   │   │   └── Admin/
│   │   │       ├── Login.jsx
│   │   │       └── Dashboard.jsx
│   │   ├── context/       # React Context
│   │   │   └── AuthContext.jsx
│   │   ├── utils/         # Utilities
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── server/                # Backend Node.js Application
│   ├── config/
│   │   └── db.js         # Database configuration
│   ├── controllers/      # Request handlers
│   │   ├── authController.js
│   │   ├── dosenController.js
│   │   ├── asistenController.js
│   │   ├── pengurusController.js
│   │   └── jadwalController.js
│   ├── models/           # Database models
│   │   ├── Admin.js
│   │   ├── Dosen.js
│   │   ├── Asisten.js
│   │   ├── Pengurus.js
│   │   └── Jadwal.js
│   ├── routes/           # API routes
│   │   ├── authRoutes.js
│   │   ├── dosenRoutes.js
│   │   ├── asistenRoutes.js
│   │   ├── pengurusRoutes.js
│   │   └── jadwalRoutes.js
│   ├── middleware/       # Custom middleware
│   │   ├── authMiddleware.js
│   │   └── upload.js
│   ├── seeders/          # Database seeders
│   │   └── seed.js
│   ├── uploads/          # Uploaded files
│   ├── server.js         # Entry point
│   └── package.json
│
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MySQL (v8 or higher)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd weblabkom
```

### 2. Database Setup

#### Create MySQL Database
```sql
CREATE DATABASE labkom_unila;
```

#### Configure Database Connection
The database will be automatically created and seeded when you start the server.

### 3. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
copy .env.example .env

# Edit .env file with your configuration
# Example:
# PORT=5000
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=your_password
# DB_NAME=labkom_unila
# JWT_SECRET=your_secret_key
# FRONTEND_URL=http://localhost:5173

# Start the server
npm run dev
```

The server will:
- Connect to MySQL database
- Create all necessary tables
- Seed initial data (admin account and sample data)
- Run on http://localhost:5000

**Default Admin Credentials:**
- Email: `admin@labkom.unila.ac.id`
- Password: `admin123`

### 4. Frontend Setup

```bash
# Open new terminal and navigate to client directory
cd client

# Install dependencies
npm install

# Create .env file
copy .env.example .env

# Edit .env file
# VITE_API_URL=http://localhost:5000/api

# Start development server
npm run dev
```

The frontend will run on http://localhost:5173

## 🎯 Usage

### Public Access
1. Open browser and go to `http://localhost:5173`
2. Navigate through:
   - Home page with real-time clock
   - Jadwal (Piket, Praktikum, Seminar)
   - Informasi (Dosen, Asisten, Pengurus)

### Admin Access
1. Click "Admin" button in navbar or go to `/admin/login`
2. Login with credentials:
   - Email: `admin@labkom.unila.ac.id`
   - Password: `admin123`
3. Access dashboard to manage:
   - Dosen (Add, Edit, Delete, Upload Photo)
   - Asisten (Add, Edit, Delete, Upload Photo)
   - Pengurus (Add, Edit, Delete, Upload Photo)
   - Jadwal Piket (Add, Edit, Delete)
   - Jadwal Praktikum (Add, Edit, Delete)
   - Jadwal Seminar (Add, Edit, Delete)

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Register new admin
- `GET /api/auth/verify` - Verify JWT token

### Dosen
- `GET /api/dosen` - Get all dosen
- `GET /api/dosen/:id` - Get single dosen
- `POST /api/dosen` - Create dosen (Admin only)
- `PUT /api/dosen/:id` - Update dosen (Admin only)
- `DELETE /api/dosen/:id` - Delete dosen (Admin only)

### Asisten
- `GET /api/asisten` - Get all asisten
- `GET /api/asisten/:id` - Get single asisten
- `POST /api/asisten` - Create asisten (Admin only)
- `PUT /api/asisten/:id` - Update asisten (Admin only)
- `DELETE /api/asisten/:id` - Delete asisten (Admin only)

### Pengurus
- `GET /api/pengurus` - Get all pengurus
- `GET /api/pengurus/:id` - Get single pengurus
- `POST /api/pengurus` - Create pengurus (Admin only)
- `PUT /api/pengurus/:id` - Update pengurus (Admin only)
- `DELETE /api/pengurus/:id` - Delete pengurus (Admin only)

### Jadwal
- `GET /api/jadwal?type=piket|praktikum|seminar` - Get jadwal by type
- `GET /api/jadwal/upcoming/seminars` - Get upcoming seminars
- `GET /api/jadwal/:id` - Get single jadwal
- `POST /api/jadwal` - Create jadwal (Admin only)
- `PUT /api/jadwal/:id` - Update jadwal (Admin only)
- `DELETE /api/jadwal/:id` - Delete jadwal (Admin only)

## 🎨 Design Theme

- **Background**: `#0D0D0D`
- **Card/Section**: `#1E1E1E`
- **Accent Color**: `#00C4FF`
- **Text**: `#FFFFFF`
- **Font**: Poppins
- **Style**: Glassmorphism with soft shadows and rounded corners

## 🚢 Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Configure:
   - Framework Preset: Vite
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add environment variable:
   - `VITE_API_URL`: Your backend API URL
6. Deploy

### Backend (Render/Railway)

#### Render
1. Go to [Render](https://render.com)
2. Create new Web Service
3. Connect your repository
4. Configure:
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add environment variables from `.env.example`
6. Deploy

#### Railway
1. Go to [Railway](https://railway.app)
2. Create new project
3. Add MySQL database
4. Add Node.js service
5. Configure environment variables
6. Deploy

### Database (Cloud MySQL)

Options:
- **PlanetScale** (Free tier available)
- **AWS RDS**
- **Google Cloud SQL**
- **Railway MySQL** (Included with Railway deployment)

Update `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` in your environment variables.

## 🔒 Security Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Protected API routes
- ✅ Input validation
- ✅ SQL injection prevention (Sequelize ORM)
- ✅ CORS configuration
- ✅ File upload validation

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=labkom_unila
DB_PORT=3306

JWT_SECRET=your_super_secret_jwt_key

FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🧪 Testing

### Test Admin Login
1. Go to `/admin/login`
2. Use credentials: `admin@labkom.unila.ac.id` / `admin123`
3. Verify dashboard access

### Test CRUD Operations
1. Login as admin
2. Try adding, editing, and deleting data in each section
3. Verify changes appear on public pages

### Test File Upload
1. Add/Edit Dosen, Asisten, or Pengurus
2. Upload an image
3. Verify image displays correctly

## 🐛 Troubleshooting

### Database Connection Error
- Verify MySQL is running
- Check database credentials in `.env`
- Ensure database `labkom_unila` exists

### CORS Error
- Verify `FRONTEND_URL` in backend `.env`
- Check CORS configuration in `server.js`

### Image Upload Not Working
- Ensure `uploads` folder exists in server directory
- Check file permissions
- Verify Multer configuration

### JWT Token Invalid
- Clear browser localStorage
- Login again
- Check `JWT_SECRET` is set correctly

## 📚 Additional Features to Add

- [ ] Email notifications for new seminars
- [ ] Calendar view for all schedules
- [ ] Export schedules to PDF
- [ ] Multi-language support (ID/EN)
- [ ] Dark/Light theme toggle
- [ ] Advanced search and filtering
- [ ] User registration for students
- [ ] Attendance tracking system

## 👨‍💻 Development

### Run in Development Mode

**Backend:**
```bash
cd server
npm run dev
```

**Frontend:**
```bash
cd client
npm run dev
```

### Build for Production

**Frontend:**
```bash
cd client
npm run build
```

**Backend:**
```bash
cd server
npm start
```

## 📄 License

MIT License - feel free to use this project for your institution.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For support, email: labkom@eng.unila.ac.id

---

**Made with ❤️ for Laboratorium Komputer Universitas Lampung**
