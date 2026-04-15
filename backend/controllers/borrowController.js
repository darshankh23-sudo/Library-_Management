import Transaction from '../models/Transaction.js';
import Book from '../models/Book.js';

// Borrow a book
export const borrowBook = async (req, res) => {
  try {
    const { bookId } = req.body;
    const userId = req.user._id;
    
    const book = await Book.findById(bookId);
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    if (book.availableCopies < 1) {
      return res.status(400).json({ message: 'Book not available' });
    }
    
    // Check if user already borrowed this book and not returned
    const existingTransaction = await Transaction.findOne({
      user: userId,
      book: bookId,
      status: 'borrowed'
    });
    
    if (existingTransaction) {
      return res.status(400).json({ message: 'You already borrowed this book' });
    }
    
    // Calculate due date (14 days from now)
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);
    
    const transaction = await Transaction.create({
      user: userId,
      book: bookId,
      dueDate
    });
    
    // Decrease available copies
    book.availableCopies -= 1;
    await book.save();
    
    res.status(201).json({
      message: 'Book borrowed successfully',
      transaction,
      dueDate
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Return a book
export const returnBook = async (req, res) => {
  try {
    const { transactionId } = req.body;
    
    const transaction = await Transaction.findById(transactionId);
    
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    
    if (transaction.status === 'returned') {
      return res.status(400).json({ message: 'Book already returned' });
    }
    
    transaction.returnDate = new Date();
    transaction.status = 'returned';
    await transaction.save();
    
    // Increase available copies
    const book = await Book.findById(transaction.book);
    book.availableCopies += 1;
    await book.save();
    
    res.json({ message: 'Book returned successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user's borrowed books
export const getUserBorrowedBooks = async (req, res) => {
  try {
    const transactions = await Transaction.find({ 
      user: req.user._id,
      status: 'borrowed'
    }).populate('book');
    
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all transactions (Admin only)
export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({})
      .populate('user', 'name email')
      .populate('book', 'title author');
    
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};