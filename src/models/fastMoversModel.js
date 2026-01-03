const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("fastmovers", {
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
    aggregate: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    tableName: "fastmovers",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  });
};
