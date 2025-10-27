import express from 'express';
import {
  getAllGallery,
  getGalleryById,
  createGallery,
  updateGallery,
  deleteGallery
} from '../controllers/galleryController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Public routes
router.get('/', getAllGallery);
router.get('/:id', getGalleryById);

// Protected routes (admin only)
router.post('/', authenticateToken, upload.single('image'), createGallery);
router.put('/:id', authenticateToken, upload.single('image'), updateGallery);
router.delete('/:id', authenticateToken, deleteGallery);

export default router;
