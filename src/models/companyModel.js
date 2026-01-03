const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "companies",
    {
      company_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      company_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      company_name: DataTypes.STRING,
      status: DataTypes.TINYINT,
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
};
