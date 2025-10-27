import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import Card from '../../components/Card';
import Table from '../../components/Table';
import { jadwalAPI } from '../../utils/api';

const Piket = () => {
  const [jadwal, setJadwal] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJadwal();
  }, []);

  const fetchJadwal = async () => {
    try {
      const response = await jadwalAPI.getAll('piket');
      setJadwal(response.data);
    } catch (error) {
      console.error('Error fetching jadwal:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      header: 'Hari',
      accessor: 'day',
    },
    {
      header: 'Tanggal',
      accessor: 'date',
      render: (row) => new Date(row.date).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    {
      header: 'Waktu',
      accessor: 'time',
    },
    {
      header: 'Lokasi',
      accessor: 'location',
    },
    {
      header: 'Keterangan',
      accessor: 'description',
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Calendar className="text-dark-accent" size={32} />
            <h1 className="text-4xl font-bold text-white">Jadwal Piket Asisten</h1>
          </div>
          <p className="text-gray-400 text-lg">
            Jadwal piket asisten laboratorium komputer
          </p>
        </motion.div>

        <Card>
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-4 border-dark-accent border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-400 mt-4">Memuat data...</p>
            </div>
          ) : (
            <Table columns={columns} data={jadwal} />
          )}
        </Card>
      </div>
    </div>
  );
};

export default Piket;
