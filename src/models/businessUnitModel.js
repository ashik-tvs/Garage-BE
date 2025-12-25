const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("business_units", {
    business_unit_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    company_id: DataTypes.INTEGER,
    business_unit_code: DataTypes.STRING,
    business_unit_name: DataTypes.STRING,
    status: DataTypes.TINYINT
  }, {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false
  });
};
