import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Pengurus = sequelize.define('Pengurus', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: true
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '/uploads/default-avatar.png'
  }
}, {
  tableName: 'pengurus',
  timestamps: true
});

export default Pengurus;
