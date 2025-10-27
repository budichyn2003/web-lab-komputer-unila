import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';

// Import routes
import authRoutes from './routes/authRoutes.js';
import dosenRoutes from './routes/dosenRoutes.js';
import asistenRoutes from './routes/asistenRoutes.js';
import pengurusRoutes from './routes/pengurusRoutes.js';
import jadwalRoutes from './routes/jadwalRoutes.js';
import pengajuanRoutes from './routes/pengajuanRoutes.js';
import praktikumDetailRoutes from './routes/praktikumDetailRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';

// Import seeders
import { seedDatabase } from './seeders/seed.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files (uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dosen', dosenRoutes);
app.use('/api/asisten', asistenRoutes);
app.use('/api/pengurus', pengurusRoutes);
app.use('/api/jadwal', jadwalRoutes);
app.use('/api/pengajuan', pengajuanRoutes);
app.use('/api/praktikum-detail', praktikumDetailRoutes);
app.use('/api/gallery', galleryRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'LabKom Unila API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Start server
const startServer = async () => {
  try {
    await connectDB();
    
    // Seed database with initial data (comment out after first run)
    await seedDatabase();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📡 API available at http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
