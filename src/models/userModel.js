const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("users", {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    company_id: DataTypes.INTEGER,
    business_unit_id: DataTypes.INTEGER,
    segment_id: DataTypes.INTEGER,
    customer_group_id: DataTypes.INTEGER,

    username: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password_hash: DataTypes.STRING,
    status: DataTypes.TINYINT
  }, {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false
  });
};
