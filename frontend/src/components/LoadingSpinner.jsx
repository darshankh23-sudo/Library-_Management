import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="loader mx-auto mb-4"></div>
        <p className="text-white text-lg font-medium animate-pulse">Loading your library...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;