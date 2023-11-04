import dotenv from "dotenv";
dotenv.config();
const dbConfig = {
  HOST: process.env.DATABASE_HOST,
  USER: process.env.DATABASE_USER,
  PASSWORD: process.env.DATABASE_PASSWORD,
  NAME: process.env.DATABASE_NAME,
  DIALECT: process.env.DATABASE_DIALECT,
  POOL: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
Object.freeze(dbConfig);

export default dbConfig;
