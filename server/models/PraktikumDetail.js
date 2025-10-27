import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const PraktikumDetail = sequelize.define('PraktikumDetail', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tahun: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  semester: {
    type: DataTypes.ENUM('Ganjil', 'Genap'),
    allowNull: false
  },
  dosenPJ: {
    type: DataTypes.STRING,
    allowNull: false
  },
  penanggungJawab: {
    type: DataTypes.STRING,
    allowNull: false
  },
  asisten: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'JSON array of assistants'
  },
  modulPDF: {
    type: DataTypes.STRING,
    allowNull: true
  },
  rekapNilai: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'praktikum_detail',
  timestamps: true
});

export default PraktikumDetail;
