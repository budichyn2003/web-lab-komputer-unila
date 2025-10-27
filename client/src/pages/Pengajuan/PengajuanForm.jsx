import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, CheckCircle } from 'lucide-react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import { pengajuanAPI } from '../../utils/api';
import { generatePengajuanPDF } from '../../utils/pdfGenerator';
import toast from 'react-hot-toast';

const PengajuanForm = ({ jenis, title }) => {
  const [formData, setFormData] = useState({
    nama: '',
    npm: '',
    prodi: '',
    tanggal: new Date().toISOString().split('T')[0],
    keperluan: '',
    keterangan: ''
  });
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate
      if (!formData.nama || !formData.npm || !formData.prodi || !formData.keperluan) {
        toast.error('Mohon lengkapi semua field yang wajib diisi');
        setLoading(false);
        return;
      }

      // Save to database
      const dataToSave = {
        ...formData,
        jenis
      };

      await pengajuanAPI.create(dataToSave);

      // Generate PDF
      generatePengajuanPDF(dataToSave);

      // Show success modal
      setShowSuccessModal(true);

      // Reset form
      setFormData({
        nama: '',
        npm: '',
        prodi: '',
        tanggal: new Date().toISOString().split('T')[0],
        keperluan: '',
        keterangan: ''
      });

      toast.success('Pengajuan berhasil dibuat!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Gagal membuat pengajuan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-4">
            <FileText className="text-dark-accent" size={32} />
            <h1 className="text-4xl font-bold text-white">{title}</h1>
          </div>
          <p className="text-gray-400 text-lg">
            Isi formulir di bawah ini untuk mengajukan {jenis}
          </p>
        </motion.div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nama Lengkap */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-dark-accent transition-colors"
                placeholder="Masukkan nama lengkap"
                required
              />
            </div>

            {/* NPM */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                NPM <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="npm"
                value={formData.npm}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-dark-accent transition-colors"
                placeholder="Contoh: 2015021001"
                required
              />
            </div>

            {/* Program Studi */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Program Studi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="prodi"
                value={formData.prodi}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-dark-accent transition-colors"
                placeholder="Contoh: Teknik Informatika"
                required
              />
            </div>

            {/* Tanggal */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tanggal Pengajuan <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="tanggal"
                value={formData.tanggal}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-dark-accent transition-colors"
                required
              />
            </div>

            {/* Keperluan */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Keperluan / Judul Kegiatan <span className="text-red-500">*</span>
              </label>
              <textarea
                name="keperluan"
                value={formData.keperluan}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-dark-accent transition-colors resize-none"
                placeholder="Jelaskan keperluan atau judul kegiatan Anda"
                required
              />
            </div>

            {/* Keterangan */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Keterangan Tambahan (Opsional)
              </label>
              <textarea
                name="keterangan"
                value={formData.keterangan}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-dark-accent transition-colors resize-none"
                placeholder="Informasi tambahan jika ada"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                icon={<Download size={20} />}
                loading={loading}
              >
                Simpan & Unduh PDF
              </Button>
            </div>
          </form>
        </Card>

        {/* Success Modal */}
        <Modal
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          title="Pengajuan Berhasil"
        >
          <div className="text-center py-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">
              Pengajuan Berhasil Dibuat!
            </h3>
            <p className="text-gray-400 mb-6">
              PDF pengajuan telah diunduh. Silakan cetak dan minta tanda tangan ke:
            </p>
            <div className="bg-white/5 rounded-lg p-4 mb-6 text-left">
              <p className="text-gray-300 mb-2">
                1. <span className="font-semibold text-white">Koordinator Lab</span> - Budi Cahyono
              </p>
              <p className="text-gray-300">
                2. <span className="font-semibold text-white">Kepala Lab</span> - Ir. Titin Yulianti, S.T., M.Eng.
              </p>
            </div>
            <Button
              variant="primary"
              onClick={() => setShowSuccessModal(false)}
            >
              Tutup
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default PengajuanForm;
