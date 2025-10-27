import Pengajuan from '../models/Pengajuan.js';

// Get all pengajuan
export const getAllPengajuan = async (req, res) => {
  try {
    const { jenis } = req.query;
    const where = jenis ? { jenis } : {};

    const pengajuan = await Pengajuan.findAll({
      where,
      order: [['createdAt', 'DESC']]
    });
    res.json(pengajuan);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single pengajuan
export const getPengajuanById = async (req, res) => {
  try {
    const pengajuan = await Pengajuan.findByPk(req.params.id);
    if (!pengajuan) {
      return res.status(404).json({ message: 'Pengajuan not found' });
    }
    res.json(pengajuan);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create pengajuan
export const createPengajuan = async (req, res) => {
  try {
    const { jenis, nama, npm, prodi, tanggal, keperluan, keterangan } = req.body;

    const pengajuan = await Pengajuan.create({
      jenis,
      nama,
      npm,
      prodi,
      tanggal,
      keperluan,
      keterangan
    });

    res.status(201).json({
      message: 'Pengajuan created successfully',
      data: pengajuan
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update pengajuan status
export const updatePengajuan = async (req, res) => {
  try {
    const { status } = req.body;
    const pengajuan = await Pengajuan.findByPk(req.params.id);

    if (!pengajuan) {
      return res.status(404).json({ message: 'Pengajuan not found' });
    }

    await pengajuan.update({ status });

    res.json({
      message: 'Pengajuan updated successfully',
      data: pengajuan
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete pengajuan
export const deletePengajuan = async (req, res) => {
  try {
    const pengajuan = await Pengajuan.findByPk(req.params.id);

    if (!pengajuan) {
      return res.status(404).json({ message: 'Pengajuan not found' });
    }

    await pengajuan.destroy();

    res.json({ message: 'Pengajuan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
