import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Dosen = sequelize.define('Dosen', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nip: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '/uploads/default-avatar.png'
  }
}, {
  tableName: 'dosen',
  timestamps: true
});

export default Dosen;
