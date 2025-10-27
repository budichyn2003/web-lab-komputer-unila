import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Asisten = sequelize.define('Asisten', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  division: {
    type: DataTypes.STRING,
    allowNull: false
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '/uploads/default-avatar.png'
  }
}, {
  tableName: 'asisten',
  timestamps: true
});

export default Asisten;
