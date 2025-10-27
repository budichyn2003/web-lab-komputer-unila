import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Home, Calendar, Users, FileText } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { 
      name: 'Jadwal', 
      path: '/jadwal',
      submenu: [
        { name: 'Piket', path: '/jadwal/piket' },
        { name: 'Praktikum', path: '/jadwal/praktikum' },
        { name: 'Seminar', path: '/jadwal/seminar' },
      ]
    },
    { 
      name: 'Informasi', 
      path: '/info',
      submenu: [
        { name: 'Dosen', path: '/info/dosen' },
        { name: 'Asisten', path: '/info/asisten' },
        { name: 'Pengurus', path: '/info/pengurus' },
      ]
    },
    { 
      name: 'Pengajuan', 
      path: '/pengajuan',
      submenu: [
        { name: 'Seminar', path: '/pengajuan/seminar' },
        { name: 'Kelas', path: '/pengajuan/kelas' },
        { name: 'Penelitian', path: '/pengajuan/penelitian' },
      ]
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-dark-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">LK</span>
            </div>
            <span className="text-white font-semibold text-lg hidden sm:block">
              LabKom Unila
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  to={item.path}
                  className={`text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-dark-accent'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
                
                {/* Submenu */}
                {item.submenu && (
                  <div className="absolute top-full left-0 mt-2 w-48 glass rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.path}
                        to={subitem.path}
                        className={`block px-4 py-2 text-sm transition-colors ${
                          isActive(subitem.path)
                            ? 'text-dark-accent bg-white/5'
                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                        } first:rounded-t-lg last:rounded-b-lg`}
                      >
                        {subitem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden glass border-t border-white/10"
        >
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <div key={item.name}>
                <Link
                  to={item.path}
                  onClick={() => !item.submenu && setIsOpen(false)}
                  className={`block py-2 text-sm font-medium ${
                    isActive(item.path) ? 'text-dark-accent' : 'text-gray-300'
                  }`}
                >
                  {item.name}
                </Link>
                {item.submenu && (
                  <div className="ml-4 mt-2 space-y-2">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.path}
                        to={subitem.path}
                        onClick={() => setIsOpen(false)}
                        className={`block py-1 text-sm ${
                          isActive(subitem.path)
                            ? 'text-dark-accent'
                            : 'text-gray-400'
                        }`}
                      >
                        {subitem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
