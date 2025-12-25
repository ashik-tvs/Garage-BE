const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("customer_groups", {
    customer_group_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    company_id: DataTypes.INTEGER,
    business_unit_id: DataTypes.INTEGER,
    segment_id: DataTypes.INTEGER,
    group_code: DataTypes.STRING,
    group_name: DataTypes.STRING,
    status: DataTypes.TINYINT
  }, {
    timestamps: false
  });
};
