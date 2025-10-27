import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import Card from '../../components/Card';
import { dosenAPI } from '../../utils/api';

const Dosen = () => {
  const [dosenList, setDosenList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDosen();
  }, []);

  const fetchDosen = async () => {
    try {
      const response = await dosenAPI.getAll();
      setDosenList(response.data);
    } catch (error) {
      console.error('Error fetching dosen:', error);
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
            <GraduationCap className="text-dark-accent" size={32} />
            <h1 className="text-4xl font-bold text-white">Dosen</h1>
          </div>
          <p className="text-gray-400 text-lg">
            Dosen pengampu laboratorium komputer
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-dark-accent border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-400 mt-4">Memuat data...</p>
          </div>
        ) : dosenList.length === 0 ? (
          <Card>
            <p className="text-center text-gray-400 py-8">
              Belum ada data dosen
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dosenList.map((dosen, index) => (
              <motion.div
                key={dosen.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center h-full">
                  <div className="mb-4">
                    <img
                      src={`${API_URL}${dosen.photo}`}
                      alt={dosen.name}
                      className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-dark-accent/30"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/150/1E1E1E/00C4FF?text=Dosen';
                      }}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {dosen.name}
                  </h3>
                  <p className="text-dark-accent text-sm font-medium mb-2">
                    NIP: {dosen.nip}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {dosen.subject}
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

export default Dosen;
