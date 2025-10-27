import Gallery from '../models/Gallery.js';

// Get all gallery items
export const getAllGallery = async (req, res) => {
  try {
    const { category } = req.query;
    const where = category ? { category } : {};

    const gallery = await Gallery.findAll({
      where,
      order: [['createdAt', 'DESC']]
    });
    res.json(gallery);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single gallery item
export const getGalleryById = async (req, res) => {
  try {
    const item = await Gallery.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create gallery item
export const createGallery = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!image) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const item = await Gallery.create({
      title,
      description,
      image,
      category: category || 'praktikum'
    });

    res.status(201).json({
      message: 'Gallery item created successfully',
      data: item
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update gallery item
export const updateGallery = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const item = await Gallery.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    const image = req.file ? `/uploads/${req.file.filename}` : item.image;

    await item.update({
      title: title || item.title,
      description: description || item.description,
      category: category || item.category,
      image
    });

    res.json({
      message: 'Gallery item updated successfully',
      data: item
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete gallery item
export const deleteGallery = async (req, res) => {
  try {
    const item = await Gallery.findByPk(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    await item.destroy();

    res.json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
