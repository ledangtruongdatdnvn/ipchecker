import dbConfig from "../config/db.config.js";
import { Sequelize, DataTypes } from "sequelize";
import userModel from "./user.model.js";
import userProfileModel from "./userProfile.model.js";

const Op = Sequelize.Op;
const sequelize = new Sequelize(
  dbConfig.NAME,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT,
    operatorsAliases: false,
    pool: {
      max: dbConfig.POOL.max,
      min: dbConfig.POOL.min,
      acquire: dbConfig.POOL.acquire,
      idle: dbConfig.POOL.idle,
    },
  }
);

const db = {};
db.Op = Op;
db.sequelize = sequelize;
db.DataTypes = DataTypes;
db.User = userModel(sequelize, DataTypes);
db.UserProfile = userProfileModel(sequelize, DataTypes);

// user and userProfile relationship
db.User.hasOne(db.UserProfile, {
  foreignKey: "userId",
});
db.UserProfile.belongsTo(db.User, { foreignKey: "userId" });

db.sequelize.sync();
(async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

export default db;
