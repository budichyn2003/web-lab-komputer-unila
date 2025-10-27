import express from 'express';
import {
  getAllJadwal,
  getJadwalById,
  getUpcomingSeminars,
  createJadwal,
  updateJadwal,
  deleteJadwal
} from '../controllers/jadwalController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllJadwal);
router.get('/upcoming/seminars', getUpcomingSeminars);
router.get('/:id', getJadwalById);

// Protected routes (admin only)
router.post('/', authenticateToken, createJadwal);
router.put('/:id', authenticateToken, updateJadwal);
router.delete('/:id', authenticateToken, deleteJadwal);

export default router;
