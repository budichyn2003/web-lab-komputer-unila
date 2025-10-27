import Dosen from '../models/Dosen.js';

// Get all dosen
export const getAllDosen = async (req, res) => {
  try {
    const dosen = await Dosen.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(dosen);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single dosen
export const getDosenById = async (req, res) => {
  try {
    const dosen = await Dosen.findByPk(req.params.id);
    if (!dosen) {
      return res.status(404).json({ message: 'Dosen not found' });
    }
    res.json(dosen);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create dosen
export const createDosen = async (req, res) => {
  try {
    const { name, nip, subject } = req.body;
    const photo = req.file ? `/uploads/${req.file.filename}` : '/uploads/default-avatar.png';

    const dosen = await Dosen.create({
      name,
      nip,
      subject,
      photo
    });

    res.status(201).json({
      message: 'Dosen created successfully',
      data: dosen
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update dosen
export const updateDosen = async (req, res) => {
  try {
    const { name, nip, subject } = req.body;
    const dosen = await Dosen.findByPk(req.params.id);

    if (!dosen) {
      return res.status(404).json({ message: 'Dosen not found' });
    }

    const photo = req.file ? `/uploads/${req.file.filename}` : dosen.photo;

    await dosen.update({
      name: name || dosen.name,
      nip: nip || dosen.nip,
      subject: subject || dosen.subject,
      photo
    });

    res.json({
      message: 'Dosen updated successfully',
      data: dosen
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete dosen
export const deleteDosen = async (req, res) => {
  try {
    const dosen = await Dosen.findByPk(req.params.id);

    if (!dosen) {
      return res.status(404).json({ message: 'Dosen not found' });
    }

    await dosen.destroy();

    res.json({ message: 'Dosen deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
