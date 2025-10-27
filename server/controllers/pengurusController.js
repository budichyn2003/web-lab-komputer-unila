import Pengurus from '../models/Pengurus.js';

// Get all pengurus
export const getAllPengurus = async (req, res) => {
  try {
    const pengurus = await Pengurus.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(pengurus);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single pengurus
export const getPengurusById = async (req, res) => {
  try {
    const pengurus = await Pengurus.findByPk(req.params.id);
    if (!pengurus) {
      return res.status(404).json({ message: 'Pengurus not found' });
    }
    res.json(pengurus);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create pengurus
export const createPengurus = async (req, res) => {
  try {
    const { name, position, contact } = req.body;
    const photo = req.file ? `/uploads/${req.file.filename}` : '/uploads/default-avatar.png';

    const pengurus = await Pengurus.create({
      name,
      position,
      contact,
      photo
    });

    res.status(201).json({
      message: 'Pengurus created successfully',
      data: pengurus
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update pengurus
export const updatePengurus = async (req, res) => {
  try {
    const { name, position, contact } = req.body;
    const pengurus = await Pengurus.findByPk(req.params.id);

    if (!pengurus) {
      return res.status(404).json({ message: 'Pengurus not found' });
    }

    const photo = req.file ? `/uploads/${req.file.filename}` : pengurus.photo;

    await pengurus.update({
      name: name || pengurus.name,
      position: position || pengurus.position,
      contact: contact || pengurus.contact,
      photo
    });

    res.json({
      message: 'Pengurus updated successfully',
      data: pengurus
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete pengurus
export const deletePengurus = async (req, res) => {
  try {
    const pengurus = await Pengurus.findByPk(req.params.id);

    if (!pengurus) {
      return res.status(404).json({ message: 'Pengurus not found' });
    }

    await pengurus.destroy();

    res.json({ message: 'Pengurus deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
