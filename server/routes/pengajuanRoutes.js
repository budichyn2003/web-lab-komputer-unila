import express from 'express';
import {
  getAllPengajuan,
  getPengajuanById,
  createPengajuan,
  updatePengajuan,
  deletePengajuan
} from '../controllers/pengajuanController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route - create pengajuan
router.post('/', createPengajuan);

// Admin routes
router.get('/', authenticateToken, getAllPengajuan);
router.get('/:id', authenticateToken, getPengajuanById);
router.put('/:id', authenticateToken, updatePengajuan);
router.delete('/:id', authenticateToken, deletePengajuan);

export default router;
