import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import Card from '../../components/Card';
import { asistenAPI } from '../../utils/api';

const Asisten = () => {
  const [asistenList, setAsistenList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAsisten();
  }, []);

  const fetchAsisten = async () => {
    try {
      const response = await asistenAPI.getAll();
      setAsistenList(response.data);
    } catch (error) {
      console.error('Error fetching asisten:', error);
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
            <Users className="text-dark-accent" size={32} />
            <h1 className="text-4xl font-bold text-white">Asisten</h1>
          </div>
          <p className="text-gray-400 text-lg">
            Asisten laboratorium komputer
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-dark-accent border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-400 mt-4">Memuat data...</p>
          </div>
        ) : asistenList.length === 0 ? (
          <Card>
            <p className="text-center text-gray-400 py-8">
              Belum ada data asisten
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {asistenList.map((asisten, index) => (
              <motion.div
                key={asisten.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center h-full">
                  <div className="mb-4">
                    <img
                      src={`${API_URL}${asisten.photo}`}
                      alt={asisten.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-dark-accent/30"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/150/1E1E1E/00C4FF?text=Asisten';
                      }}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {asisten.name}
                  </h3>
                  <p className="text-dark-accent text-sm">
                    {asisten.division}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Asisten;
