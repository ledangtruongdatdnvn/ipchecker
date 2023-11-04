const UserProfile = (sequelize, DataTypes) => {
  const UserProfile = sequelize.define("UserProfile", {
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    companyName: { type: DataTypes.STRING, allowNull: true },
  });
  return UserProfile;
};

export default UserProfile;
