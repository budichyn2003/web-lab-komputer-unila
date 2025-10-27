import React from 'react';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="glass border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Laboratorium Komputer
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Laboratorium Komputer Universitas Lampung merupakan fasilitas pendukung 
              pembelajaran dan penelitian di bidang teknologi informasi dan komputer.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Kontak</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-dark-accent mt-1 flex-shrink-0" />
                <p className="text-gray-400 text-sm">
                  Gedung H Fakultas Teknik<br />
                  Universitas Lampung<br />
                  Bandar Lampung, 35145
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-dark-accent flex-shrink-0" />
                <p className="text-gray-400 text-sm">(0721) 701609</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-dark-accent flex-shrink-0" />
                <p className="text-gray-400 text-sm">labkom@eng.unila.ac.id</p>
              </div>
              <div className="flex items-center space-x-3">
                <Globe size={18} className="text-dark-accent flex-shrink-0" />
                <a 
                  href="https://unila.ac.id" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 text-sm hover:text-dark-accent transition-colors"
                >
                  www.unila.ac.id
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 text-sm hover:text-dark-accent transition-colors">
                  Beranda
                </a>
              </li>
              <li>
                <a href="/jadwal/seminar" className="text-gray-400 text-sm hover:text-dark-accent transition-colors">
                  Jadwal Seminar
                </a>
              </li>
              <li>
                <a href="/info/dosen" className="text-gray-400 text-sm hover:text-dark-accent transition-colors">
                  Daftar Dosen
                </a>
              </li>
              <li>
                <a href="/admin/login" className="text-gray-400 text-sm hover:text-dark-accent transition-colors">
                  Admin Login
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Laboratorium Komputer Universitas Lampung. 
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
