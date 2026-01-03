const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("electric", {
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
    model: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    tableName: "electric",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  });
};
