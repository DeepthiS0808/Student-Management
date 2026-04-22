import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, LayoutDashboard, Home, UserPlus } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Profile', path: '/profile', icon: UserPlus }, // Reusing UserPlus for now or User
  ];

  return (
    <nav className="sticky top-0 z-50 glass shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-b border-white/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-primary-600 p-2 rounded-lg group-hover:rotate-12 transition-transform duration-300">
                <GraduationCap className="text-white h-6 w-6" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent hidden sm:block">
                EduManager
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-4">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-primary-600'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden md:block">{link.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
