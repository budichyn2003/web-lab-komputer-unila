import express from 'express';
import {
  getAllDosen,
  getDosenById,
  createDosen,
  updateDosen,
  deleteDosen
} from '../controllers/dosenController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Public routes
router.get('/', getAllDosen);
router.get('/:id', getDosenById);

// Protected routes (admin only)
router.post('/', authenticateToken, upload.single('photo'), createDosen);
router.put('/:id', authenticateToken, upload.single('photo'), updateDosen);
router.delete('/:id', authenticateToken, deleteDosen);

export default router;
