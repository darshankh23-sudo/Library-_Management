import express from 'express';
import { getBooks, addBook, deleteBook } from '../controllers/bookController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.get('/', protect, getBooks);
router.post('/', protect, admin, addBook);
router.delete('/:id', protect, admin, deleteBook);

export default router;