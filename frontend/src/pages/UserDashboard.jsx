import React, { useState, useEffect } from 'react';
import api from '../services/api';
import BookCard from '../components/BookCard';
import LoadingSpinner from '../components/LoadingSpinner';

const UserDashboard = () => {
  const [books, setBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchBooks();
    fetchBorrowedBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await api.get('/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBorrowedBooks = async () => {
    try {
      const response = await api.get('/borrow/my-books');
      setBorrowedBooks(response.data);
    } catch (error) {
      console.error('Error fetching borrowed books:', error);
    }
  };

  const handleBorrow = async (bookId) => {
    try {
      const response = await api.post('/borrow/borrow', { bookId });
      setMessage({ type: 'success', text: response.data.message });
      fetchBooks();
      fetchBorrowedBooks();
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to borrow book' });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleReturn = async (transactionId) => {
    try {
      const response = await api.post('/borrow/return', { transactionId });
      setMessage({ type: 'success', text: response.data.message });
      fetchBooks();
      fetchBorrowedBooks();
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to return book' });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const filteredBooks = books.filter(book =>
    (book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     book.author.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const stats = {
    total: books.length,
    borrowed: borrowedBooks.length,
    available: books.filter(b => b.availableCopies > 0).length,
    overdue: borrowedBooks.filter(b => new Date(b.dueDate) < new Date()).length
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Toast Message */}
        {message && (
          <div className={`fixed top-24 right-6 z-50 px-6 py-4 rounded-2xl shadow-2xl transform transition-all duration-500 animate-slideInRight ${
            message.type === 'success' 
              ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
              : 'bg-gradient-to-r from-red-500 to-pink-600'
          } text-white font-medium`}>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{message.type === 'success' ? '✅' : '❌'}</span>
              <span>{message.text}</span>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 rounded-3xl p-8 mb-10 text-white shadow-2xl animate-fadeInUp">
          <div className="absolute top-0 right-0 opacity-10">
            <div className="text-9xl">📚</div>
          </div>
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome to Your Library
            </h1>
            <p className="text-purple-100 text-lg mb-6">
              Discover, borrow, and enjoy thousands of books from our collection
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-3">
                <div className="text-2xl font-bold">{stats.total}+</div>
                <div className="text-sm opacity-90">Total Books</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-3">
                <div className="text-2xl font-bold">{stats.available}+</div>
                <div className="text-sm opacity-90">Available Now</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-3">
                <div className="text-2xl font-bold">{stats.borrowed}</div>
                <div className="text-sm opacity-90">Currently Borrowed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="glass-card p-6 transform hover:scale-105 transition-all duration-300 animate-slideInLeft">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Collection</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stats.total}</p>
              </div>
              <div className="text-5xl opacity-50">📚</div>
            </div>
          </div>
          
          <div className="glass-card p-6 transform hover:scale-105 transition-all duration-300 animate-slideInLeft" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Available Books</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{stats.available}</p>
              </div>
              <div className="text-5xl opacity-50">✅</div>
            </div>
          </div>
          
          <div className="glass-card p-6 transform hover:scale-105 transition-all duration-300 animate-slideInRight" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Borrowed Books</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">{stats.borrowed}</p>
              </div>
              <div className="text-5xl opacity-50">📖</div>
            </div>
          </div>
          
          <div className="glass-card p-6 transform hover:scale-105 transition-all duration-300 animate-slideInRight" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Overdue Books</p>
                <p className="text-3xl font-bold text-red-600 mt-2">{stats.overdue}</p>
              </div>
              <div className="text-5xl opacity-50">⚠️</div>
            </div>
          </div>
        </div>

        {/* Borrowed Books Section */}
        {borrowedBooks.length > 0 && (
          <div className="mb-12 animate-fadeInUp">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-white flex items-center">
                <span className="mr-3">📘</span>
                Currently Reading
                <span className="ml-3 text-sm bg-white/20 px-3 py-1 rounded-full">
                  {borrowedBooks.length} books
                </span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {borrowedBooks.map((transaction, index) => {
                const isOverdue = new Date(transaction.dueDate) < new Date();
                return (
                  <div key={transaction._id} className="glass-card overflow-hidden transform hover:scale-105 transition-all duration-300 animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2"></div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="text-4xl">📕</div>
                        {isOverdue && (
                          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                            ⚠️ Overdue
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{transaction.book.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">by {transaction.book.author}</p>
                      
                      <div className="space-y-2 mb-5">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Borrowed on:</span>
                          <span className="font-medium">{new Date(transaction.borrowDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Due date:</span>
                          <span className={`font-bold ${isOverdue ? 'text-red-600' : 'text-orange-600'}`}>
                            {new Date(transaction.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => handleReturn(transaction._id)}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                      >
                        🔄 Return Book
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Search Section */}
        <div className="mb-8 animate-fadeInUp">
          <div className="relative">
            <input
              type="text"
              placeholder="🔍 Search for books by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-5 pl-14 glass-card text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-lg"
            />
            <div className="absolute left-6 top-1/2 transform -translate-y-1/2 text-2xl">
              🔍
            </div>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* All Books Section */}
        <div className="animate-fadeInUp">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white flex items-center">
              <span className="mr-3">📚</span>
              Library Collection
              <span className="ml-3 text-sm bg-white/20 px-3 py-1 rounded-full">
                {filteredBooks.length} books found
              </span>
            </h2>
          </div>

          {filteredBooks.length === 0 ? (
            <div className="glass-card p-16 text-center animate-fadeIn">
              <div className="text-7xl mb-4">😢</div>
              <p className="text-gray-600 text-xl mb-2">No books found</p>
              <p className="text-gray-400">Try searching with different keywords</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBooks.map((book, index) => (
                <div key={book._id} className="animate-fadeIn" style={{ animationDelay: `${index * 0.05}s` }}>
                  <BookCard book={book} onBorrow={handleBorrow} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;