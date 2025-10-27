import express from 'express';
import {
  getAllAsisten,
  getAsistenById,
  createAsisten,
  updateAsisten,
  deleteAsisten
} from '../controllers/asistenController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Public routes
router.get('/', getAllAsisten);
router.get('/:id', getAsistenById);

// Protected routes (admin only)
router.post('/', authenticateToken, upload.single('photo'), createAsisten);
router.put('/:id', authenticateToken, upload.single('photo'), updateAsisten);
router.delete('/:id', authenticateToken, deleteAsisten);

export default router;
