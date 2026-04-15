import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import LoadingSpinner from './components/LoadingSpinner';

const PrivateRoute = ({ children, allowedRole }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <LoadingSpinner />;
  
  if (!user) return <Navigate to="/login" />;
  
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/user'} />;
  }
  
  return children;
};

function AppRoutes() {
  const { user, loading } = useAuth();
  
  if (loading) return <LoadingSpinner />;
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to={user?.role === 'admin' ? '/admin' : '/user'} />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to={user?.role === 'admin' ? '/admin' : '/user'} />} />
        <Route path="/user" element={<PrivateRoute allowedRole="user"><UserDashboard /></PrivateRoute>} />
        <Route path="/admin" element={<PrivateRoute allowedRole="admin"><AdminDashboard /></PrivateRoute>} />
        <Route path="/" element={<Navigate to={user ? (user.role === 'admin' ? '/admin' : '/user') : '/login'} />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;