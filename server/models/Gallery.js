import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Gallery = sequelize.define('Gallery', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'praktikum'
  }
}, {
  tableName: 'gallery',
  timestamps: true
});

export default Gallery;
