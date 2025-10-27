import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Jadwal = sequelize.define('Jadwal', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  type: {
    type: DataTypes.ENUM('piket', 'praktikum', 'seminar'),
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  presenter: {
    type: DataTypes.STRING,
    allowNull: true
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  time: {
    type: DataTypes.STRING,
    allowNull: true
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true
  },
  day: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'jadwal',
  timestamps: true
});

export default Jadwal;
