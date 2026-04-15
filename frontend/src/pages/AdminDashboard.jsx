import React, { useState, useEffect } from 'react';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBook, setNewBook] = useState({ title: '', author: '', totalCopies: 1 });
  const [activeTab, setActiveTab] = useState('books');

  useEffect(() => {
    fetchBooks();
    fetchTransactions();
    fetchUsers();
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

  const fetchTransactions = async () => {
    try {
      const response = await api.get('/borrow/all-transactions');
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      await api.post('/books', newBook);
      setMessage({ type: 'success', text: 'Book added successfully!' });
      setShowAddForm(false);
      setNewBook({ title: '', author: '', totalCopies: 1 });
      fetchBooks();
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to add book' });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleDeleteBook = async (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await api.delete(`/books/${bookId}`);
        setMessage({ type: 'success', text: 'Book deleted successfully!' });
        fetchBooks();
        setTimeout(() => setMessage(null), 3000);
      } catch (error) {
        setMessage({ type: 'error', text: 'Failed to delete book' });
        setTimeout(() => setMessage(null), 3000);
      }
    }
  };

  const stats = {
    totalBooks: books.length,
    totalUsers: users.length,
    activeBorrows: transactions.filter(t => t.status === 'borrowed').length,
    totalReturns: transactions.filter(t => t.status === 'returned').length
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

        {/* Admin Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 rounded-3xl p-8 mb-10 text-white shadow-2xl animate-fadeInUp">
          <div className="absolute top-0 right-0 opacity-10">
            <div className="text-9xl">👑</div>
          </div>
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Admin Dashboard
            </h1>
            <p className="text-purple-100 text-lg mb-6">
              Manage books, users, and monitor library activity
            </p>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              {showAddForm ? '❌ Cancel' : '➕ Add New Book'}
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="glass-card p-6 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Books</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalBooks}</p>
              </div>
              <div className="text-5xl opacity-50">📚</div>
            </div>
          </div>
          
          <div className="glass-card p-6 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Users</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{stats.totalUsers}</p>
              </div>
              <div className="text-5xl opacity-50">👥</div>
            </div>
          </div>
          
          <div className="glass-card p-6 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Active Borrows</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">{stats.activeBorrows}</p>
              </div>
              <div className="text-5xl opacity-50">📖</div>
            </div>
          </div>
          
          <div className="glass-card p-6 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Returns</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{stats.totalReturns}</p>
              </div>
              <div className="text-5xl opacity-50">✅</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-white/20">
          <button
            onClick={() => setActiveTab('books')}
            className={`px-6 py-3 text-lg font-semibold transition-all duration-300 ${
              activeTab === 'books'
                ? 'text-purple-600 border-b-2 border-purple-600 bg-white rounded-t-xl'
                : 'text-white hover:text-purple-200'
            }`}
          >
            📚 Books Collection
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`px-6 py-3 text-lg font-semibold transition-all duration-300 ${
              activeTab === 'transactions'
                ? 'text-purple-600 border-b-2 border-purple-600 bg-white rounded-t-xl'
                : 'text-white hover:text-purple-200'
            }`}
          >
            📋 Borrowing Activity
          </button>
        </div>

        {/* Add Book Form */}
        {showAddForm && activeTab === 'books' && (
          <div className="glass-card p-8 mb-8 animate-fadeInUp">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Book</h2>
            <form onSubmit={handleAddBook}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <input
                  type="text"
                  placeholder="Book Title"
                  value={newBook.title}
                  onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
                <input
                  type="text"
                  placeholder="Author Name"
                  value={newBook.author}
                  onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
                <input
                  type="number"
                  placeholder="Total Copies"
                  value={newBook.totalCopies}
                  onChange={(e) => setNewBook({ ...newBook, totalCopies: parseInt(e.target.value) })}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  min="1"
                  required
                />
              </div>
              <button
                type="submit"
                className="mt-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                ➕ Add Book to Library
              </button>
            </form>
          </div>
        )}

        {/* Books Tab */}
        {activeTab === 'books' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map((book, index) => (
              <div key={book._id} className="glass-card overflow-hidden relative group animate-fadeIn" style={{ animationDelay: `${index * 0.05}s` }}>
                <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2"></div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">📖</div>
                    <button
                      onClick={() => handleDeleteBook(book._id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                    >
                      🗑️
                    </button>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{book.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">by {book.author}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div>
                      <span className="text-xs text-gray-500">Available</span>
                      <p className="text-2xl font-bold text-green-600">{book.availableCopies}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-500">Total</span>
                      <p className="text-2xl font-bold text-gray-800">{book.totalCopies}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === 'transactions' && (
          <div className="glass-card overflow-hidden animate-fadeInUp">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">User</th>
                    <th className="px-6 py-4 text-left">Book</th>
                    <th className="px-6 py-4 text-left">Borrow Date</th>
                    <th className="px-6 py-4 text-left">Due Date</th>
                    <th className="px-6 py-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {transactions.map((transaction, index) => (
                    <tr key={transaction._id} className="hover:bg-gray-50 transition-colors duration-300">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-800">{transaction.user?.name}</p>
                          <p className="text-sm text-gray-500">{transaction.user?.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-800">{transaction.book?.title}</p>
                          <p className="text-sm text-gray-500">by {transaction.book?.author}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{new Date(transaction.borrowDate).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <span className={new Date(transaction.dueDate) < new Date() && transaction.status === 'borrowed' ? 'text-red-600 font-bold' : 'text-gray-600'}>
                          {new Date(transaction.dueDate).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          transaction.status === 'borrowed' 
                            ? 'bg-yellow-100 text-yellow-700' 
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {transaction.status === 'borrowed' ? '📖 Borrowed' : '✅ Returned'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;