import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Allow choosing dialect via env (mysql or postgres) and support DATABASE_URL for cloud providers
const DIALECT = process.env.DB_DIALECT || 'mysql';

let sequelize;
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: DIALECT,
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || (DIALECT === 'mysql' ? 3306 : 5432),
      dialect: DIALECT,
      logging: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    }
  );
}

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(`✅ Database connected successfully (dialect=${DIALECT})`);
    await sequelize.sync({ alter: false });
    console.log('✅ Database models synchronized');
  } catch (error) {
    console.error('❌ Unable to connect to database:', error.message);
    process.exit(1);
  }
};

export default sequelize;
