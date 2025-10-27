import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Pengajuan = sequelize.define('Pengajuan', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  jenis: {
    type: DataTypes.ENUM('seminar', 'kelas', 'penelitian'),
    allowNull: false
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false
  },
  npm: {
    type: DataTypes.STRING,
    allowNull: false
  },
  prodi: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tanggal: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  keperluan: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  keterangan: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending'
  }
}, {
  tableName: 'pengajuan',
  timestamps: true
});

export default Pengajuan;
