import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { UserCog, Phone } from 'lucide-react';
import Card from '../../components/Card';
import { pengurusAPI } from '../../utils/api';

const Pengurus = () => {
  const [pengurusList, setPengurusList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPengurus();
  }, []);

  const fetchPengurus = async () => {
    try {
      const response = await pengurusAPI.getAll();
      setPengurusList(response.data);
    } catch (error) {
      console.error('Error fetching pengurus:', error);
    } finally {
      setLoading(false);
    }
  };

  const API_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-4">
            <UserCog className="text-dark-accent" size={32} />
            <h1 className="text-4xl font-bold text-white">Pengurus</h1>
          </div>
          <p className="text-gray-400 text-lg">
            Pengurus laboratorium komputer
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-dark-accent border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-400 mt-4">Memuat data...</p>
          </div>
        ) : pengurusList.length === 0 ? (
          <Card>
            <p className="text-center text-gray-400 py-8">
              Belum ada data pengurus
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pengurusList.map((pengurus, index) => (
              <motion.div
                key={pengurus.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center h-full">
                  <div className="mb-4">
                    <img
                      src={`${API_URL}${pengurus.photo}`}
                      alt={pengurus.name}
                      className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-dark-accent/30"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/150/1E1E1E/00C4FF?text=Pengurus';
                      }}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {pengurus.name}
                  </h3>
                  <p className="text-dark-accent text-sm font-medium mb-3">
                    {pengurus.position}
                  </p>
                  {pengurus.contact && (
                    <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm">
                      <Phone size={14} />
                      <span>{pengurus.contact}</span>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Pengurus;
