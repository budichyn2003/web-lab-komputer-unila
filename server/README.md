# 🖥️ LabKom Unila Backend Server

Backend API server for LabKom Unila website built with Node.js, Express, and MySQL.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your database credentials

# Run development server
npm run dev

# Run production server
npm start
```

## 📦 Dependencies

- **express** - Web framework
- **mysql2** - MySQL client
- **sequelize** - ORM for MySQL
- **bcrypt** - Password hashing
- **jsonwebtoken** - JWT authentication
- **dotenv** - Environment variables
- **cors** - Cross-origin resource sharing
- **multer** - File upload handling
- **express-validator** - Input validation

## 🗂️ Project Structure

```
server/
├── config/
│   └── db.js              # Database configuration
├── controllers/           # Request handlers
│   ├── authController.js
│   ├── dosenController.js
│   ├── asistenController.js
│   ├── pengurusController.js
│   └── jadwalController.js
├── models/               # Database models
│   ├── Admin.js
│   ├── Dosen.js
│   ├── Asisten.js
│   ├── Pengurus.js
│   └── Jadwal.js
├── routes/              # API routes
│   ├── authRoutes.js
│   ├── dosenRoutes.js
│   ├── asistenRoutes.js
│   ├── pengurusRoutes.js
│   └── jadwalRoutes.js
├── middleware/          # Custom middleware
│   ├── authMiddleware.js
│   └── upload.js
├── seeders/            # Database seeders
│   └── seed.js
├── uploads/            # Uploaded files
├── server.js           # Entry point
└── package.json
```

## 🔧 Environment Variables

Create a `.env` file with:

```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=labkom_unila
DB_PORT=3306

JWT_SECRET=your_secret_key

FRONTEND_URL=http://localhost:5173
```

## 📡 API Endpoints

See [API_DOCUMENTATION.md](../API_DOCUMENTATION.md) for complete API reference.

### Base URL
```
http://localhost:5000/api
```

### Available Routes
- `/api/auth` - Authentication
- `/api/dosen` - Dosen management
- `/api/asisten` - Asisten management
- `/api/pengurus` - Pengurus management
- `/api/jadwal` - Schedule management

## 🗄️ Database

The server automatically:
1. Connects to MySQL
2. Creates all tables
3. Seeds initial data (on first run)

### Default Admin
```
Email: admin@labkom.unila.ac.id
Password: admin123
```

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected routes with middleware
- Input validation
- SQL injection prevention (Sequelize)
- CORS configuration
- File upload validation

## 🧪 Testing

Test the API health:
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "LabKom Unila API is running"
}
```

## 📝 Scripts

```bash
# Development with auto-reload
npm run dev

# Production
npm start
```

## 🐛 Troubleshooting

### Database Connection Error
- Verify MySQL is running
- Check credentials in `.env`
- Ensure database exists

### Port Already in Use
- Change `PORT` in `.env`
- Kill process using port 5000

### Module Not Found
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📚 Learn More

- [Express.js Documentation](https://expressjs.com/)
- [Sequelize Documentation](https://sequelize.org/)
- [JWT Documentation](https://jwt.io/)

---

**Part of LabKom Unila Website Project**
