const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("only_with_us", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    segment_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    partnumber: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    brand: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    tableName: "only_with_us",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  });
};
