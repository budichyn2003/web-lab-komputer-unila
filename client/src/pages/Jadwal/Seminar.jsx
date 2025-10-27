import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Presentation, Calendar, MapPin, Clock } from 'lucide-react';
import Card from '../../components/Card';
import { jadwalAPI } from '../../utils/api';

const Seminar = () => {
  const [seminars, setSeminars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSeminars();
  }, []);

  const fetchSeminars = async () => {
    try {
      const response = await jadwalAPI.getAll('seminar');
      setSeminars(response.data);
    } catch (error) {
      console.error('Error fetching seminars:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Presentation className="text-dark-accent" size={32} />
            <h1 className="text-4xl font-bold text-white">Jadwal Seminar</h1>
          </div>
          <p className="text-gray-400 text-lg">
            Seminar dan workshop yang akan datang
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-dark-accent border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-400 mt-4">Memuat data...</p>
          </div>
        ) : seminars.length === 0 ? (
          <Card>
            <p className="text-center text-gray-400 py-8">
              Belum ada jadwal seminar
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {seminars.map((seminar, index) => (
              <motion.div
                key={seminar.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {seminar.title}
                    </h3>
                    {seminar.presenter && (
                      <p className="text-dark-accent text-sm font-medium">
                        {seminar.presenter}
                      </p>
                    )}
                  </div>

                  {seminar.description && (
                    <p className="text-gray-400 text-sm mb-4">
                      {seminar.description}
                    </p>
                  )}

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Calendar size={16} className="text-dark-accent flex-shrink-0" />
                      <span>
                        {new Date(seminar.date).toLocaleDateString('id-ID', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>

                    {seminar.time && (
                      <div className="flex items-center space-x-2 text-gray-400">
                        <Clock size={16} className="text-dark-accent flex-shrink-0" />
                        <span>{seminar.time}</span>
                      </div>
                    )}

                    {seminar.location && (
                      <div className="flex items-center space-x-2 text-gray-400">
                        <MapPin size={16} className="text-dark-accent flex-shrink-0" />
                        <span>{seminar.location}</span>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Seminar;
