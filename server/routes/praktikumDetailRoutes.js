import express from 'express';
import {
  getAllPraktikumDetails,
  getPraktikumDetailById,
  getPraktikumYears,
  createPraktikumDetail,
  updatePraktikumDetail,
  deletePraktikumDetail
} from '../controllers/praktikumDetailController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Public routes
router.get('/', getAllPraktikumDetails);
router.get('/years', getPraktikumYears);
router.get('/:id', getPraktikumDetailById);

// Protected routes (admin only)
router.post('/', authenticateToken, upload.fields([
  { name: 'modulPDF', maxCount: 1 },
  { name: 'rekapNilai', maxCount: 1 }
]), createPraktikumDetail);

router.put('/:id', authenticateToken, upload.fields([
  { name: 'modulPDF', maxCount: 1 },
  { name: 'rekapNilai', maxCount: 1 }
]), updatePraktikumDetail);

router.delete('/:id', authenticateToken, deletePraktikumDetail);

export default router;
