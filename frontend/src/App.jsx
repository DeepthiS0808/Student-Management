import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import FormPage from './pages/FormPage';
import Profile from './pages/Profile';

/**
 * App Component
 * 
 * Demonstrates:
 * 1. React Router for navigation
 * 2. Shared layout with Navbar
 * 3. Modular page architecture
 */
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        
        {/* Main Content Area */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add" element={<FormPage />} />
            <Route path="/edit/:id" element={<FormPage />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200 py-6">
          <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
            Designed with Modern UI Principles • Built with React & Tailwind CSS
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
