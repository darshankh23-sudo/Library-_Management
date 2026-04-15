import Book from '../models/Book.js';

// Get all books
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add new book (Admin only)
export const addBook = async (req, res) => {
  try {
    const { title, author, totalCopies } = req.body;
    
    const book = await Book.create({
      title,
      author,
      totalCopies,
      availableCopies: totalCopies
    });
    
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete book (Admin only)
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    await book.deleteOne();
    res.json({ message: 'Book removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};