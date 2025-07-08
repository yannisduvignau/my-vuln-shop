import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import ViewUser from './pages/admin/ViewUser';

function App() {
  return (
    <div>
      <nav style={{ background: '#eee', padding: '1rem', marginBottom: '1rem' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Accueil</Link>
        <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link>
        <Link to="/admin">Admin</Link>
      </nav>
      <div style={{ padding: '0 1rem' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          {/* VULNÉRABILITÉ IDOR ci-dessous */}
          <Route path="/admin/user/:userId" element={<ViewUser />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;