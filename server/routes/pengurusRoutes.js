import express from 'express';
import {
  getAllPengurus,
  getPengurusById,
  createPengurus,
  updatePengurus,
  deletePengurus
} from '../controllers/pengurusController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Public routes
router.get('/', getAllPengurus);
router.get('/:id', getPengurusById);

// Protected routes (admin only)
router.post('/', authenticateToken, upload.single('photo'), createPengurus);
router.put('/:id', authenticateToken, upload.single('photo'), updatePengurus);
router.delete('/:id', authenticateToken, deletePengurus);

export default router;
