import React from 'react';

const BookCard = ({ book, onBorrow, showBorrowButton = true }) => {
  const getRandomColor = () => {
    const colors = ['from-purple-500 to-indigo-500', 'from-pink-500 to-rose-500', 'from-blue-500 to-cyan-500', 'from-green-500 to-emerald-500', 'from-orange-500 to-red-500'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="book-card glass-card overflow-hidden group">
      <div className={`bg-gradient-to-r ${getRandomColor()} h-3`}></div>
      <div className="p-6">
        {/* Book Icon and Status */}
        <div className="flex items-start justify-between mb-4">
          <div className="text-5xl transform group-hover:scale-110 transition-transform duration-300">
            {book.availableCopies > 0 ? '📖' : '📕'}
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-bold ${
            book.availableCopies > 0 
              ? 'bg-green-100 text-green-700 border border-green-200' 
              : 'bg-red-100 text-red-700 border border-red-200'
          }`}>
            {book.availableCopies > 0 ? '✓ Available' : '✗ Borrowed'}
          </div>
        </div>

        {/* Book Details */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 min-h-[56px]">
            {book.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3 flex items-center">
            <span className="text-gray-400 mr-2">✍️</span>
            {book.author}
          </p>
        </div>

        {/* Copies Info */}
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
          <div className="flex items-center space-x-1">
            <span className="text-sm text-gray-500">📊 Copies:</span>
            <span className="font-bold text-gray-800">{book.availableCopies}</span>
            <span className="text-gray-400">/{book.totalCopies}</span>
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <span>📍</span>
            <span>A-{Math.floor(Math.random() * 10) + 1}</span>
          </div>
        </div>

        {/* Borrow Button */}
        {showBorrowButton && (
          <button
            onClick={() => onBorrow(book._id)}
            disabled={book.availableCopies === 0}
            className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 transform ${
              book.availableCopies > 0
                ? 'btn-primary text-white hover:shadow-xl hover:scale-105 active:scale-95'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {book.availableCopies > 0 ? (
              <span className="flex items-center justify-center space-x-2">
                <span>📥</span>
                <span>Borrow Now</span>
              </span>
            ) : (
              <span className="flex items-center justify-center space-x-2">
                <span>🔒</span>
                <span>Not Available</span>
              </span>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default BookCard;