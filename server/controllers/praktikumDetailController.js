import PraktikumDetail from '../models/PraktikumDetail.js';

// Get all praktikum details
export const getAllPraktikumDetails = async (req, res) => {
  try {
    const { tahun, semester } = req.query;
    const where = {};
    if (tahun) where.tahun = tahun;
    if (semester) where.semester = semester;

    const details = await PraktikumDetail.findAll({
      where,
      order: [['tahun', 'DESC'], ['semester', 'ASC'], ['nama', 'ASC']]
    });
    res.json(details);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get praktikum detail by ID
export const getPraktikumDetailById = async (req, res) => {
  try {
    const detail = await PraktikumDetail.findByPk(req.params.id);
    if (!detail) {
      return res.status(404).json({ message: 'Praktikum detail not found' });
    }
    
    // Parse asisten JSON
    const detailData = detail.toJSON();
    if (detailData.asisten) {
      try {
        detailData.asisten = JSON.parse(detailData.asisten);
      } catch (e) {
        detailData.asisten = [];
      }
    }
    
    res.json(detailData);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get years with praktikum
export const getPraktikumYears = async (req, res) => {
  try {
    const years = await PraktikumDetail.findAll({
      attributes: [[sequelize.fn('DISTINCT', sequelize.col('tahun')), 'tahun']],
      order: [['tahun', 'DESC']]
    });
    res.json(years.map(y => y.tahun));
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create praktikum detail
export const createPraktikumDetail = async (req, res) => {
  try {
    const { nama, tahun, semester, dosenPJ, penanggungJawab, asisten } = req.body;
    
    const modulPDF = req.files?.modulPDF ? `/uploads/${req.files.modulPDF[0].filename}` : null;
    const rekapNilai = req.files?.rekapNilai ? `/uploads/${req.files.rekapNilai[0].filename}` : null;

    const detail = await PraktikumDetail.create({
      nama,
      tahun,
      semester,
      dosenPJ,
      penanggungJawab,
      asisten: JSON.stringify(asisten || []),
      modulPDF,
      rekapNilai
    });

    res.status(201).json({
      message: 'Praktikum detail created successfully',
      data: detail
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update praktikum detail
export const updatePraktikumDetail = async (req, res) => {
  try {
    const { nama, tahun, semester, dosenPJ, penanggungJawab, asisten } = req.body;
    const detail = await PraktikumDetail.findByPk(req.params.id);

    if (!detail) {
      return res.status(404).json({ message: 'Praktikum detail not found' });
    }

    const modulPDF = req.files?.modulPDF ? `/uploads/${req.files.modulPDF[0].filename}` : detail.modulPDF;
    const rekapNilai = req.files?.rekapNilai ? `/uploads/${req.files.rekapNilai[0].filename}` : detail.rekapNilai;

    await detail.update({
      nama: nama || detail.nama,
      tahun: tahun || detail.tahun,
      semester: semester || detail.semester,
      dosenPJ: dosenPJ || detail.dosenPJ,
      penanggungJawab: penanggungJawab || detail.penanggungJawab,
      asisten: asisten ? JSON.stringify(asisten) : detail.asisten,
      modulPDF,
      rekapNilai
    });

    res.json({
      message: 'Praktikum detail updated successfully',
      data: detail
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete praktikum detail
export const deletePraktikumDetail = async (req, res) => {
  try {
    const detail = await PraktikumDetail.findByPk(req.params.id);

    if (!detail) {
      return res.status(404).json({ message: 'Praktikum detail not found' });
    }

    await detail.destroy();

    res.json({ message: 'Praktikum detail deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
