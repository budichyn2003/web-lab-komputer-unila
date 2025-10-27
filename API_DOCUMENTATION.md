# 📡 API Documentation - LabKom Unila

Complete REST API documentation for the LabKom Unila backend.

## Base URL

```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

## Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

---

## 🔐 Authentication Endpoints

### Login

**POST** `/auth/login`

Login to get JWT token.

**Request Body:**
```json
{
  "email": "admin@labkom.unila.ac.id",
  "password": "admin123"
}
```

**Response (200 OK):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "id": 1,
    "email": "admin@labkom.unila.ac.id",
    "name": "Admin LabKom"
  }
}
```

**Error Responses:**
- `400` - Missing email or password
- `401` - Invalid credentials

---

### Register Admin

**POST** `/auth/register`

Register a new admin account.

**Request Body:**
```json
{
  "email": "newadmin@labkom.unila.ac.id",
  "password": "securepassword",
  "name": "New Admin"
}
```

**Response (201 Created):**
```json
{
  "message": "Admin created successfully",
  "admin": {
    "id": 2,
    "email": "newadmin@labkom.unila.ac.id",
    "name": "New Admin"
  }
}
```

**Error Responses:**
- `400` - Missing fields or admin already exists

---

### Verify Token

**GET** `/auth/verify`

Verify if JWT token is valid.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "message": "Token is valid",
  "admin": {
    "id": 1,
    "email": "admin@labkom.unila.ac.id",
    "name": "Admin LabKom"
  }
}
```

**Error Responses:**
- `401` - No token provided
- `403` - Invalid or expired token

---

## 👨‍🏫 Dosen Endpoints

### Get All Dosen

**GET** `/dosen`

Get list of all dosen (lecturers).

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Dr. Ahmad Fauzi, S.Kom., M.Kom",
    "nip": "197801012005011001",
    "subject": "Pemrograman Web",
    "photo": "/uploads/default-avatar.png",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

---

### Get Single Dosen

**GET** `/dosen/:id`

Get details of a specific dosen.

**Response (200 OK):**
```json
{
  "id": 1,
  "name": "Dr. Ahmad Fauzi, S.Kom., M.Kom",
  "nip": "197801012005011001",
  "subject": "Pemrograman Web",
  "photo": "/uploads/default-avatar.png",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Error Responses:**
- `404` - Dosen not found

---

### Create Dosen

**POST** `/dosen` 🔒 *Requires Authentication*

Create a new dosen.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:**
- `name` (required): Dosen name
- `nip` (required): NIP number
- `subject` (required): Subject/course
- `photo` (optional): Image file

**Response (201 Created):**
```json
{
  "message": "Dosen created successfully",
  "data": {
    "id": 4,
    "name": "Dr. New Dosen",
    "nip": "198901012015011001",
    "subject": "Artificial Intelligence",
    "photo": "/uploads/1234567890-photo.jpg"
  }
}
```

---

### Update Dosen

**PUT** `/dosen/:id` 🔒 *Requires Authentication*

Update existing dosen.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:**
- `name` (optional): Updated name
- `nip` (optional): Updated NIP
- `subject` (optional): Updated subject
- `photo` (optional): New image file

**Response (200 OK):**
```json
{
  "message": "Dosen updated successfully",
  "data": {
    "id": 1,
    "name": "Dr. Ahmad Fauzi Updated",
    "nip": "197801012005011001",
    "subject": "Advanced Web Programming",
    "photo": "/uploads/new-photo.jpg"
  }
}
```

---

### Delete Dosen

**DELETE** `/dosen/:id` 🔒 *Requires Authentication*

Delete a dosen.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "message": "Dosen deleted successfully"
}
```

**Error Responses:**
- `404` - Dosen not found

---

## 👥 Asisten Endpoints

### Get All Asisten

**GET** `/asisten`

Get list of all asisten (assistants).

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Andi Pratama",
    "division": "Web Development",
    "photo": "/uploads/default-avatar.png",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

---

### Create Asisten

**POST** `/asisten` 🔒 *Requires Authentication*

**Form Data:**
- `name` (required): Asisten name
- `division` (required): Division/specialization
- `photo` (optional): Image file

---

### Update Asisten

**PUT** `/asisten/:id` 🔒 *Requires Authentication*

---

### Delete Asisten

**DELETE** `/asisten/:id` 🔒 *Requires Authentication*

---

## 🏢 Pengurus Endpoints

### Get All Pengurus

**GET** `/pengurus`

Get list of all pengurus (management).

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Muhammad Rizki",
    "position": "Ketua Laboratorium",
    "contact": "081234567890",
    "photo": "/uploads/default-avatar.png",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

---

### Create Pengurus

**POST** `/pengurus` 🔒 *Requires Authentication*

**Form Data:**
- `name` (required): Pengurus name
- `position` (required): Position/role
- `contact` (optional): Contact number
- `photo` (optional): Image file

---

### Update Pengurus

**PUT** `/pengurus/:id` 🔒 *Requires Authentication*

---

### Delete Pengurus

**DELETE** `/pengurus/:id` 🔒 *Requires Authentication*

---

## 📅 Jadwal Endpoints

### Get All Jadwal

**GET** `/jadwal?type=<type>`

Get schedules filtered by type.

**Query Parameters:**
- `type` (optional): `piket`, `praktikum`, or `seminar`

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "type": "seminar",
    "title": "Seminar Teknologi AI dan Machine Learning",
    "description": "Membahas perkembangan terkini AI",
    "presenter": "Dr. Ahmad Fauzi, S.Kom., M.Kom",
    "date": "2024-01-15",
    "time": "09:00 - 12:00",
    "location": "Auditorium Gedung H",
    "day": "Senin",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

---

### Get Upcoming Seminars

**GET** `/jadwal/upcoming/seminars`

Get upcoming seminars (future dates only).

**Response (200 OK):**
```json
[
  {
    "id": 5,
    "type": "seminar",
    "title": "Workshop Cybersecurity",
    "presenter": "Budi Santoso, S.Kom., M.Kom",
    "date": "2024-02-01",
    "time": "13:00 - 16:00",
    "location": "Lab Komputer 1"
  }
]
```

---

### Get Single Jadwal

**GET** `/jadwal/:id`

Get details of a specific schedule.

---

### Create Jadwal

**POST** `/jadwal` 🔒 *Requires Authentication*

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "type": "seminar",
  "title": "Workshop React.js",
  "description": "Belajar React dari dasar",
  "presenter": "Dr. Ahmad Fauzi",
  "date": "2024-02-15",
  "time": "10:00 - 14:00",
  "location": "Lab Komputer 1",
  "day": "Kamis"
}
```

**Response (201 Created):**
```json
{
  "message": "Jadwal created successfully",
  "data": {
    "id": 7,
    "type": "seminar",
    "title": "Workshop React.js",
    "date": "2024-02-15"
  }
}
```

---

### Update Jadwal

**PUT** `/jadwal/:id` 🔒 *Requires Authentication*

**Request Body:** Same as Create (all fields optional)

---

### Delete Jadwal

**DELETE** `/jadwal/:id` 🔒 *Requires Authentication*

---

## 🏥 Health Check

### API Health

**GET** `/health`

Check if API is running.

**Response (200 OK):**
```json
{
  "status": "OK",
  "message": "LabKom Unila API is running"
}
```

---

## 📝 Error Responses

All endpoints may return these error responses:

### 400 Bad Request
```json
{
  "message": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "message": "Access denied. No token provided."
}
```

### 403 Forbidden
```json
{
  "message": "Invalid or expired token."
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Server error",
  "error": "Error details (in development mode)"
}
```

---

## 🧪 Testing with cURL

### Login Example
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@labkom.unila.ac.id","password":"admin123"}'
```

### Get Dosen (Authenticated)
```bash
curl http://localhost:5000/api/dosen \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Create Jadwal
```bash
curl -X POST http://localhost:5000/api/jadwal \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "seminar",
    "title": "Test Seminar",
    "date": "2024-02-01",
    "time": "10:00",
    "location": "Lab 1"
  }'
```

---

## 📚 Rate Limiting

Currently no rate limiting is implemented. Consider adding in production.

## 🔒 Security Notes

- All passwords are hashed with bcrypt
- JWT tokens expire after 24 hours
- File uploads limited to 5MB
- Only image files allowed for uploads
- CORS configured for specified frontend URL

---

**For more information, see the main [README.md](README.md)**
