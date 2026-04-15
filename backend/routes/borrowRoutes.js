import express from 'express';
import { 
  borrowBook, 
  returnBook, 
  getUserBorrowedBooks,
  getAllTransactions 
} from '../controllers/borrowController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.post('/borrow', protect, borrowBook);
router.post('/return', protect, returnBook);
router.get('/my-books', protect, getUserBorrowedBooks);
router.get('/all-transactions', protect, admin, getAllTransactions);

export default router;