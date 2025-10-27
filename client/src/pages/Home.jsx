import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, BookOpen, Award } from 'lucide-react';
import Card from '../components/Card';
import Clock from '../components/Clock';
import { jadwalAPI } from '../utils/api';

const Home = () => {
  const [upcomingSeminars, setUpcomingSeminars] = useState([]);

  useEffect(() => {
    fetchUpcomingSeminars();
  }, []);

  const fetchUpcomingSeminars = async () => {
    try {
      const response = await jadwalAPI.getUpcomingSeminars();
      setUpcomingSeminars(response.data);
    } catch (error) {
      console.error('Error fetching seminars:', error);
    }
  };

  const features = [
    {
      icon: <Calendar className="w-8 h-8" />,
      title: 'Jadwal Terorganisir',
      description: 'Sistem penjadwalan piket, praktikum, dan seminar yang terstruktur'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Tim Profesional',
      description: 'Dosen dan asisten berpengalaman di bidang teknologi informasi'
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Fasilitas Lengkap',
      description: 'Laboratorium dengan peralatan modern dan software terkini'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Prestasi Gemilang',
      description: 'Berbagai pencapaian dalam kompetisi dan penelitian'
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-accent/20 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Laboratorium Komputer
                <span className="block text-dark-accent mt-2">
                  Universitas Lampung
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Pusat pembelajaran dan pengembangan teknologi informasi yang modern 
                dan inovatif untuk masa depan digital Indonesia.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="/jadwal/seminar"
                  className="px-6 py-3 bg-dark-accent text-white rounded-lg hover:bg-dark-accent/80 transition-colors"
                >
                  Lihat Jadwal Seminar
                </a>
                <a
                  href="/info/dosen"
                  className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                >
                  Tentang Kami
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Clock />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Mengapa Memilih LabKom Unila?
            </h2>
            <p className="text-gray-400 text-lg">
              Fasilitas dan layanan terbaik untuk mendukung pembelajaran Anda
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center h-full">
                  <div className="text-dark-accent mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Seminars */}
      {upcomingSeminars.length > 0 && (
        <section className="py-20 bg-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                Seminar Mendatang
              </h2>
              <p className="text-gray-400 text-lg">
                Jangan lewatkan seminar dan workshop menarik kami
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingSeminars.slice(0, 3).map((seminar, index) => (
                <motion.div
                  key={seminar.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-2">
                          {seminar.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-2">
                          {seminar.presenter}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-gray-400">
                      <div className="flex items-center space-x-2">
                        <Calendar size={16} className="text-dark-accent" />
                        <span>{new Date(seminar.date).toLocaleDateString('id-ID', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-dark-accent">📍</span>
                        <span>{seminar.location}</span>
                      </div>
                      {seminar.time && (
                        <div className="flex items-center space-x-2">
                          <span className="text-dark-accent">🕐</span>
                          <span>{seminar.time}</span>
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <a
                href="/jadwal/seminar"
                className="inline-block px-6 py-3 bg-dark-accent text-white rounded-lg hover:bg-dark-accent/80 transition-colors"
              >
                Lihat Semua Seminar
              </a>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
