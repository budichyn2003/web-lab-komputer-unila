import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Search, ChevronDown, ChevronUp, X, Download, FileText, Users } from 'lucide-react';
import Card from '../../components/Card';
import Table from '../../components/Table';
import Modal from '../../components/Modal';
import { jadwalAPI, praktikumDetailAPI, galleryAPI } from '../../utils/api';

const PraktikumNew = () => {
  const [jadwal, setJadwal] = useState([]);
  const [praktikumDetails, setPraktikumDetails] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Search & Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  
  // History
  const [years, setYears] = useState([]);
  const [expandedYear, setExpandedYear] = useState(null);
  const [expandedSemester, setExpandedSemester] = useState(null);
  
  // Detail Modal
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  
  // Gallery Modal
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [jadwalRes, detailsRes, galleryRes] = await Promise.all([
        jadwalAPI.getAll('praktikum'),
        praktikumDetailAPI.getAll(),
        galleryAPI.getAll('praktikum')
      ]);
      
      setJadwal(jadwalRes.data);
      setPraktikumDetails(detailsRes.data);
      setGallery(galleryRes.data);
      
      // Extract unique years
      const uniqueYears = [...new Set(detailsRes.data.map(d => d.tahun))].sort((a, b) => b - a);
      setYears(uniqueYears);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredJadwal = jadwal.filter(item => {
    const matchSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchSearch;
  });

  const groupedByYear = years.reduce((acc, year) => {
    acc[year] = {
      Ganjil: praktikumDetails.filter(d => d.tahun === year && d.semester === 'Ganjil'),
      Genap: praktikumDetails.filter(d => d.tahun === year && d.semester === 'Genap')
    };
    return acc;
  }, {});

  const handleDetailClick = async (id) => {
    try {
      const response = await praktikumDetailAPI.getById(id);
      setSelectedDetail(response.data);
      setShowDetailModal(true);
    } catch (error) {
      console.error('Error fetching detail:', error);
    }
  };

  const API_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

  const columns = [
    {
      header: 'Mata Kuliah',
      accessor: 'title',
    },
    {
      header: 'Keterangan',
      accessor: 'description',
    },
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
            <BookOpen className="text-dark-accent" size={32} />
            <h1 className="text-4xl font-bold text-white">Jadwal Praktikum</h1>
          </div>
          <p className="text-gray-400 text-lg">
            Jadwal praktikum laboratorium komputer
          </p>
        </motion.div>

        {/* Search Bar */}
        <Card className="mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Cari praktikum..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-dark-accent transition-colors"
              />
            </div>
          </div>
        </Card>

        {/* Main Table */}
        <Card className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-6">Jadwal Praktikum Aktif</h2>
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-4 border-dark-accent border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-400 mt-4">Memuat data...</p>
            </div>
          ) : (
            <Table columns={columns} data={filteredJadwal} />
          )}
        </Card>

        {/* History by Year */}
        <Card className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">
            🔸 Riwayat Praktikum per Tahun
          </h2>
          
          <div className="space-y-4">
            {years.map(year => (
              <div key={year} className="border border-white/10 rounded-lg overflow-hidden">
                {/* Year Header */}
                <button
                  onClick={() => setExpandedYear(expandedYear === year ? null : year)}
                  className="w-full px-6 py-4 bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-between"
                >
                  <span className="text-lg font-semibold text-white">Tahun {year}</span>
                  {expandedYear === year ? (
                    <ChevronUp className="text-dark-accent" size={24} />
                  ) : (
                    <ChevronDown className="text-gray-400" size={24} />
                  )}
                </button>

                {/* Semester Content */}
                <AnimatePresence>
                  {expandedYear === year && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 space-y-6">
                        {/* Semester Ganjil */}
                        {groupedByYear[year].Ganjil.length > 0 && (
                          <div>
                            <button
                              onClick={() => setExpandedSemester(
                                expandedSemester === `${year}-Ganjil` ? null : `${year}-Ganjil`
                              )}
                              className="flex items-center space-x-2 text-white hover:text-dark-accent transition-colors mb-3"
                            >
                              {expandedSemester === `${year}-Ganjil` ? (
                                <ChevronDown size={20} />
                              ) : (
                                <ChevronUp size={20} />
                              )}
                              <span className="font-medium">- Semester Ganjil</span>
                            </button>
                            
                            <AnimatePresence>
                              {expandedSemester === `${year}-Ganjil` && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="ml-6 space-y-2"
                                >
                                  {groupedByYear[year].Ganjil.map(praktikum => (
                                    <button
                                      key={praktikum.id}
                                      onClick={() => handleDetailClick(praktikum.id)}
                                      className="block w-full text-left px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-dark-accent transition-colors"
                                    >
                                      • {praktikum.nama}
                                    </button>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )}

                        {/* Semester Genap */}
                        {groupedByYear[year].Genap.length > 0 && (
                          <div>
                            <button
                              onClick={() => setExpandedSemester(
                                expandedSemester === `${year}-Genap` ? null : `${year}-Genap`
                              )}
                              className="flex items-center space-x-2 text-white hover:text-dark-accent transition-colors mb-3"
                            >
                              {expandedSemester === `${year}-Genap` ? (
                                <ChevronDown size={20} />
                              ) : (
                                <ChevronUp size={20} />
                              )}
                              <span className="font-medium">- Semester Genap</span>
                            </button>
                            
                            <AnimatePresence>
                              {expandedSemester === `${year}-Genap` && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="ml-6 space-y-2"
                                >
                                  {groupedByYear[year].Genap.map(praktikum => (
                                    <button
                                      key={praktikum.id}
                                      onClick={() => handleDetailClick(praktikum.id)}
                                      className="block w-full text-left px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-dark-accent transition-colors"
                                    >
                                      • {praktikum.nama}
                                    </button>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </Card>

        {/* Gallery */}
        <Card>
          <h2 className="text-2xl font-semibold text-white mb-6">
            🖼️ Galeri Praktikum
          </h2>
          
          {gallery.length === 0 ? (
            <p className="text-center text-gray-400 py-8">Belum ada foto galeri</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gallery.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => {
                    setSelectedImage(item);
                    setShowImageModal(true);
                  }}
                >
                  <div className="relative overflow-hidden rounded-lg aspect-video">
                    <img
                      src={`${API_URL}${item.image}`}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300/1E1E1E/00C4FF?text=Gallery';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <p className="text-white font-medium p-4">{item.title}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </Card>

        {/* Detail Modal */}
        <Modal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          title="Detail Praktikum"
          size="lg"
        >
          {selectedDetail && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">{selectedDetail.nama}</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Tahun:</span>
                    <span className="text-white ml-2 font-medium">{selectedDetail.tahun}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Semester:</span>
                    <span className="text-white ml-2 font-medium">{selectedDetail.semester}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-sm">Dosen Penanggung Jawab</label>
                    <p className="text-white font-medium">{selectedDetail.dosenPJ}</p>
                  </div>
                  
                  <div>
                    <label className="text-gray-400 text-sm">Penanggung Jawab Praktikum</label>
                    <p className="text-white font-medium">{selectedDetail.penanggungJawab}</p>
                  </div>
                  
                  <div>
                    <label className="text-gray-400 text-sm flex items-center space-x-2">
                      <Users size={16} />
                      <span>Daftar Asisten Pengajar</span>
                    </label>
                    <ul className="mt-2 space-y-1">
                      {selectedDetail.asisten && selectedDetail.asisten.length > 0 ? (
                        selectedDetail.asisten.map((asisten, idx) => (
                          <li key={idx} className="text-white">• {asisten}</li>
                        ))
                      ) : (
                        <li className="text-gray-400">Belum ada asisten</li>
                      )}
                    </ul>
                  </div>

                  {selectedDetail.modulPDF && (
                    <div>
                      <label className="text-gray-400 text-sm flex items-center space-x-2 mb-2">
                        <FileText size={16} />
                        <span>Modul Praktikum</span>
                      </label>
                      <a
                        href={`${API_URL}${selectedDetail.modulPDF}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-dark-accent text-white rounded-lg hover:bg-dark-accent/80 transition-colors"
                      >
                        <Download size={18} />
                        <span>Unduh Modul PDF</span>
                      </a>
                    </div>
                  )}

                  {selectedDetail.rekapNilai && (
                    <div>
                      <label className="text-gray-400 text-sm flex items-center space-x-2 mb-2">
                        <FileText size={16} />
                        <span>Rekap Nilai</span>
                      </label>
                      <a
                        href={`${API_URL}${selectedDetail.rekapNilai}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Download size={18} />
                        <span>Unduh Rekap Nilai</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </Modal>

        {/* Image Modal */}
        <Modal
          isOpen={showImageModal}
          onClose={() => setShowImageModal(false)}
          title={selectedImage?.title || 'Galeri'}
          size="xl"
        >
          {selectedImage && (
            <div>
              <img
                src={`${API_URL}${selectedImage.image}`}
                alt={selectedImage.title}
                className="w-full rounded-lg"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x600/1E1E1E/00C4FF?text=Gallery';
                }}
              />
              {selectedImage.description && (
                <p className="text-gray-300 mt-4">{selectedImage.description}</p>
              )}
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default PraktikumNew;
