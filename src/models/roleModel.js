const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("roles", {
    role_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    company_id: DataTypes.INTEGER,
    segment_id: DataTypes.INTEGER,
    role_code: DataTypes.STRING,
    role_name: DataTypes.STRING
  }, {
    timestamps: false
  });
};
