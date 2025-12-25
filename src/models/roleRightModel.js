const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("role_rights", {
    role_right_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    role_id: DataTypes.INTEGER,
    right_id: DataTypes.INTEGER
  }, {
    timestamps: false
  });
};
