const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("user_roles", {
    user_role_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER
  }, {
    timestamps: false
  });
};
