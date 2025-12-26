const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "UserProfile",
    {
      profile_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      full_name: DataTypes.STRING,
      mobile: DataTypes.STRING,
      employee_code: DataTypes.STRING,
      reporting_to: DataTypes.STRING,
      designation: DataTypes.STRING,
      sales_manager_name: DataTypes.STRING,
      sales_manager_number: DataTypes.STRING
    },
    {
      tableName: "user_profiles",
      timestamps: false
    }
  );
};
