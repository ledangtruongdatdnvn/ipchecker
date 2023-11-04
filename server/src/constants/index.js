import dotenv from "dotenv";
dotenv.config();
const constants = {
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_USER: process.env.DATABASE_USER,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_NAME: process.env.DATABASE_NAME,
  DATABASE_DIALECT: process.env.DATABASE_DIALECT,
  JWT_SECRET: process.env.JWT_SECRET,
  BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND,
  API_VERSION: process.env.API_VERSION,
  APP_URL: process.env.APP_URL,
  PORT: process.env.PORT,
  ERR: {
    DEFAULT: "----------",
  },
};
Object.freeze(constants);

export default constants;
