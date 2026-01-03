const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("cng", {
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
    make: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    tableName: "cng",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  });
};
