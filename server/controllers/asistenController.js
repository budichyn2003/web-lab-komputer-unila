import Asisten from '../models/Asisten.js';

// Get all asisten
export const getAllAsisten = async (req, res) => {
  try {
    const asisten = await Asisten.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(asisten);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single asisten
export const getAsistenById = async (req, res) => {
  try {
    const asisten = await Asisten.findByPk(req.params.id);
    if (!asisten) {
      return res.status(404).json({ message: 'Asisten not found' });
    }
    res.json(asisten);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create asisten
export const createAsisten = async (req, res) => {
  try {
    const { name, division } = req.body;
    const photo = req.file ? `/uploads/${req.file.filename}` : '/uploads/default-avatar.png';

    const asisten = await Asisten.create({
      name,
      division,
      photo
    });

    res.status(201).json({
      message: 'Asisten created successfully',
      data: asisten
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update asisten
export const updateAsisten = async (req, res) => {
  try {
    const { name, division } = req.body;
    const asisten = await Asisten.findByPk(req.params.id);

    if (!asisten) {
      return res.status(404).json({ message: 'Asisten not found' });
    }

    const photo = req.file ? `/uploads/${req.file.filename}` : asisten.photo;

    await asisten.update({
      name: name || asisten.name,
      division: division || asisten.division,
      photo
    });

    res.json({
      message: 'Asisten updated successfully',
      data: asisten
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete asisten
export const deleteAsisten = async (req, res) => {
  try {
    const asisten = await Asisten.findByPk(req.params.id);

    if (!asisten) {
      return res.status(404).json({ message: 'Asisten not found' });
    }

    await asisten.destroy();

    res.json({ message: 'Asisten deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
