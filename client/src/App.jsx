import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Piket from './pages/Jadwal/Piket';
import PraktikumNew from './pages/Jadwal/PraktikumNew';
import Seminar from './pages/Jadwal/Seminar';
import Dosen from './pages/Info/Dosen';
import Asisten from './pages/Info/Asisten';
import Pengurus from './pages/Info/Pengurus';
import PengajuanSeminar from './pages/Pengajuan/Seminar';
import PengajuanKelas from './pages/Pengajuan/Kelas';
import PengajuanPenelitian from './pages/Pengajuan/Penelitian';
import Login from './pages/Admin/Login';
import Dashboard from './pages/Admin/Dashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-dark-bg">
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#1E1E1E',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              },
              success: {
                iconTheme: {
                  primary: '#00C4FF',
                  secondary: '#fff',
                },
              },
            }}
          />

          <Routes>
            {/* Public Routes with Navbar & Footer */}
            <Route
              path="/*"
              element={
                <>
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/jadwal/piket" element={<Piket />} />
                    <Route path="/jadwal/praktikum" element={<PraktikumNew />} />
                    <Route path="/jadwal/seminar" element={<Seminar />} />
                    <Route path="/info/dosen" element={<Dosen />} />
                    <Route path="/info/asisten" element={<Asisten />} />
                    <Route path="/info/pengurus" element={<Pengurus />} />
                    <Route path="/pengajuan/seminar" element={<PengajuanSeminar />} />
                    <Route path="/pengajuan/kelas" element={<PengajuanKelas />} />
                    <Route path="/pengajuan/penelitian" element={<PengajuanPenelitian />} />
                  </Routes>
                  <Footer />
                </>
              }
            />

            {/* Admin Routes without Navbar & Footer */}
            <Route path="/admin/login" element={<Login />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
