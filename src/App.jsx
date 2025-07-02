import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import Dashboard from './pages/Dashboard';
import Bookmarks from './pages/Bookmarks';
import Analytics from './pages/Analytics';
import EmployeeDetails from './pages/EmployeeDetails';
import './App.css';

function Header() {
  const { state, toggleTheme } = useAppContext();
  return (
    <header style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '18px 32px', background: state.theme === 'dark' ? '#222' : '#f5f6fa',
      borderBottom: '1.5px solid #e3eafc', marginBottom: 24
    }}>
      <nav style={{ display: 'flex', gap: 24 }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 700, fontSize: 18 }}>Dashboard</Link>
        <Link to="/bookmarks" style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 700, fontSize: 18 }}>Bookmarks</Link>
        <Link to="/analytics" style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 700, fontSize: 18 }}>Analytics</Link>
      </nav>
      <button
        onClick={toggleTheme}
        style={{
          padding: '8px 20px', borderRadius: 8, border: 'none',
          background: state.theme === 'dark' ? '#1976d2' : '#222', color: '#fff',
          fontWeight: 600, fontSize: 15, cursor: 'pointer',
          transition: 'background 0.2s',
        }}
      >
        {state.theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </button>
    </header>
  );
}

function App() {
  return (
    <AppProvider>
      <Router>
        <Header />
        <div style={{ minHeight: '100vh' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/employee/:id" element={<EmployeeDetails />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
