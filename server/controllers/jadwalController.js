import Jadwal from '../models/Jadwal.js';
import { Op } from 'sequelize';

// Get all jadwal
export const getAllJadwal = async (req, res) => {
  try {
    const { type } = req.query;
    const where = type ? { type } : {};

    const jadwal = await Jadwal.findAll({
      where,
      order: [['date', 'ASC'], ['time', 'ASC']]
    });
    res.json(jadwal);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get upcoming seminars
export const getUpcomingSeminars = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    const seminars = await Jadwal.findAll({
      where: {
        type: 'seminar',
        date: {
          [Op.gte]: today
        }
      },
      order: [['date', 'ASC']],
      limit: 5
    });
    
    res.json(seminars);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single jadwal
export const getJadwalById = async (req, res) => {
  try {
    const jadwal = await Jadwal.findByPk(req.params.id);
    if (!jadwal) {
      return res.status(404).json({ message: 'Jadwal not found' });
    }
    res.json(jadwal);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create jadwal
export const createJadwal = async (req, res) => {
  try {
    const { type, title, description, presenter, date, time, location, day } = req.body;

    const jadwal = await Jadwal.create({
      type,
      title,
      description,
      presenter,
      date,
      time,
      location,
      day
    });

    res.status(201).json({
      message: 'Jadwal created successfully',
      data: jadwal
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update jadwal
export const updateJadwal = async (req, res) => {
  try {
    const { type, title, description, presenter, date, time, location, day } = req.body;
    const jadwal = await Jadwal.findByPk(req.params.id);

    if (!jadwal) {
      return res.status(404).json({ message: 'Jadwal not found' });
    }

    await jadwal.update({
      type: type || jadwal.type,
      title: title || jadwal.title,
      description: description || jadwal.description,
      presenter: presenter || jadwal.presenter,
      date: date || jadwal.date,
      time: time || jadwal.time,
      location: location || jadwal.location,
      day: day || jadwal.day
    });

    res.json({
      message: 'Jadwal updated successfully',
      data: jadwal
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete jadwal
export const deleteJadwal = async (req, res) => {
  try {
    const jadwal = await Jadwal.findByPk(req.params.id);

    if (!jadwal) {
      return res.status(404).json({ message: 'Jadwal not found' });
    }

    await jadwal.destroy();

    res.json({ message: 'Jadwal deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
